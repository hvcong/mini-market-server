const { Ward } = require("../config/persist");
const services = {
  addWard: async (data) => {
    try {
      const { id, name, districtId } = data;
      var ward = await Ward.findByPk(id);
      if (ward) {
        return {
          message: "this ward already exists",
          isSuccess: false,
          status: 403,
        };
      }
      ward = await Ward.create({id,name,DistrictId: districtId});
      return { ward, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  updateWard: async (id, data) => {
    try {
      const ward = await Ward.findByPk(id);
      if (ward) {
        await ward.update(data);
        await ward.save();
        return { message: "updated succesful", isSuccess: true, status: 200 };
      }
      return { message: "ward not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getAll: async () => {
    try {
      const wards = await Ward.findAll();
      return { wards, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = services;
