const { City } = require("../config/persist");
const services = {
  addCity: async (data) => {
    try {
      const { id, name } = data;
      var city = await City.findByPk(id);
      if (city) {
        return {
          message: "this city already exists",
          isSuccess: false,
          status: 403,
        };
      }
      city = await City.create(data);
      return { city, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  updateCity: async (id, data) => {
    try {
      const city = await City.findByPk(id);
      if (city) {
        await city.update(data);
        await city.save();
        return { message: "updated succesful", isSuccess: true, status: 200 };
      }
      return { message: "city not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getAll: async () => {
    try {
      const cities = await City.findAll();
      return { cities, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = services;
