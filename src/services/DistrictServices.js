const { District } = require("../config/persist");
const services = {
  addDitrict: async (data) => {
    try {
      const { id, name, cityId } = data;
      var district = await District.findByPk(id);
      if (district) {
        return {
          message: "this district already exists",
          isSuccess: false,
          status: 403,
        };
      }
      district = await District.create({id,name,CityId: cityId});
      return { district, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  updateDistrict: async (id, data) => {
    try {
      const district = await District.findByPk(id);
      if (district) {
        await district.update(data);
        await district.save();
        return { message: "updated succesful", isSuccess: true, status: 200 };
      }
      return { message: "district not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getAll: async () => {
    try {
      const districts = await District.findAll();
      return { districts, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = services;
