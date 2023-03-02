const { UnitType } = require("../config/persist");

const UnitTypeServices = {
  addUnit: async (data) => {
    const { id, name, convertionQuantity } = data;
    try {
      const unitType = await UnitType.findOne({ where: { id: id } });
      if (unitType) {
        return {
          message: "this unitType already exists",
          isSuccess: false,
          status: 403,
        };
      } else {
        const unitType = await UnitType.create({
          id,
          name,
          convertionQuantity,
        });
        return { unitType, isSuccess: true, status: 200 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  updateUnit: async (id, data) => {
    try {
      const unit = await UnitType.findOne({ where: { id: id } });
      if (unit) {
        await unit.update(data);
        await unit.save();
        return { message: "updated successful", isSuccess: true, status: 200 };
      } else {
        return { message: "unit not found", isSuccess: false, status: 400 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  deleteUit: async (id) => {
    try {
      const unit = await UnitType.findOne({ where: { id: id } });
      if (unit) {
        await unit.destroy();
        return { message: "deleted successful", isSuccess: true, status: 200 };
      } else {
        return { message: "unitType not found", isSuccess: false, status: 400 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = UnitTypeServices;
