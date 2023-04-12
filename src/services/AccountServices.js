const { Account } = require("../config/persist");
const bcrypt = require("bcrypt");

const services = {
  create: async (data) => {
    try {
      const { phonenumber, password } = data;
      var account = await Account.findOne({
        where: { phonenumber: phonenumber },
      });
      if (account) {
        return {
          message: "account already exists",
          isSuccess: false,
          status: 403,
        };
      } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        account = await Account.create({ phonenumber, password: hash });
        return { account, isSuccess: true, status: 200 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (data) => {
    try {
      const { phonenumber, password, ...newData } = data;
      const account = await Account.findOne({
        where: { phonenumber: phonenumber },
      });
      if (account) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        await account.update({ ...newData, password });
        return { message: "updated succesful", isSuccess: true, status: 200 };
      }
      return { message: "account not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = services;
