const bcrypt = require("bcrypt");
const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const { Account } = require("../config/persist");
const { create } = require("../services/AccountServices");

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
  create: async (req, res) => {
    const data = req.body;
    const result = await create(data);
    const { isSuccess, status, message, account } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, account });
    }
    return res.status(status).json({ isSuccess, message });
  },
  logIn: async (req, res) => {
    try {
      const account = await Account.findOne({
        where: { phonenumber: req.body.phonenumber },
      });
      if (!account) {
        return res.status(404).json("account not found");
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
