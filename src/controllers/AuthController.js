const bcrypt = require("bcrypt");
const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const db = require("../config/persist");
const User = db.User;
const Account = db.Account;
var refreshTokens = [];

const AuthControllers = {
  //generate accesstoken
  generateAccessToken: (account) => {
    return jwt.sign(
      {
        id: account.id,
        phonenumber: account.phonenumber,
        email: account.email,
        pointAchive: account.pointAchive,
      },
      process.env.ACCESSTOKEN,
      { expiresIn: "30d" }
    );
  },
  // generate refreshtoken
  generateRefreshToken: (account) => {
    return jwt.sign(
      {
        id: account.id,
        phonenumber: account.phonenumber,
        email: account.email,
        pointAchive: account.pointAchive,
      },
      process.env.REFRESHTOKEN,
      { expiresIn: "365d" }
    );
  },
  // register
  register: async (req, res) => {
    try {
      const phonenumber = req.body.phonenumber;
      console.log(phonenumber);
      const account = await Account.findOne({
        where: { phonenumber: phonenumber },
      });
      if (account) {
        return res
          .status(403)
          .json({ message: "account already exists", isSuccess: false });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });
        await user.createAccount({
          phonenumber: req.body.phonenumber,
          password: hash,
        });
        return res.status(200).json({
          isSuccess: true,
          user,
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "Internal server error" });
    }
  },
  logIn: async (req, res) => {
    try {
      const account = await db.Account.findOne({
        where: { phonenumber: req.body.phonenumber },
        include: [
          {
            model: User,
            // as: 'user',
            //where : { a: 'b'}
          },
        ],
      });
      if (!account) {
        return res.status(404).json({
          isSuccess: false,
          message: "user not found",
        });
      }
      const validatePassword = bcrypt.compare(
        req.body.password,
        account.password
      );
      if (!validatePassword) {
        return res.status(404).json({
          isSuccess: false,
          message: "password is not correct, please try it again",
        });
      }
      if (account && validatePassword) {
        const accestoken = AuthControllers.generateAccessToken(account);
        const refreshToken = AuthControllers.generateRefreshToken(account);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, UserId, ...others } = account.dataValues;
        return res.status(200).json({
          isSuccess: true,
          account: {
            ...others,
            accestoken,
            refreshToken,
          },
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ isSuccess: false, message: "Internal server error" });
    }
  },
  logOut: async (req, res) => {
    res.clearCookie("refreshtoken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    return res.status(200).json({
      isSuccess: true,
      message: "logOut completely done",
    });
  },
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accesstoken = token.split(" ")[1];
      jwt.verify(
        accesstoken,
        process.env.ACCESSTOKEN,
        async (error, account) => {
          if (error) {
            return res.status(404).json({
              isSuccess: false,
              message: "token is not valid",
            });
          }
          req.account = account;
          next();
        }
      );
    } else {
      return res.status(404).json({
        isSuccess: false,
        message: "you have not authenticated yet",
      });
    }
  },
};

module.exports = AuthControllers;
