const { HomeAddress } = require("../config/persist");
const services = {
  add: async (data) => {
    try {
      const { homeAddress, wardId } = data;
      const home = await HomeAddress.create({ homeAddress, WardId: wardId });
      return { home, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (id, data) => {
    try {
      const homeAddress = await HomeAddress.findByPk(id);
      if (homeAddress) {
        await homeAddress.update(data);
        await homeAddress.save();
        return { message: "updated succesful", isSuccess: true, status: 200 };
      }
      return { message: "ward not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getOne: async (id) => {
    try {
      const homeAddress = await HomeAddress.findByPk(id);
      return { homeAddress, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = services;
