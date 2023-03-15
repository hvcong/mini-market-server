const e = require("express");
const { UnitType } = require("../config/persist");

const UnitTypeServices = {
  addUnit: async (data) => {
    const { name, convertionQuantity } = data;
    try {
      // const unitType = await UnitType.findOne({ where: { id: id } });
        const unitType = await UnitType.create({
          name,
          convertionQuantity,
        });
        return { unitType, isSuccess: true, status: 200 };
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
  getUnitByIds: async (ids) => {
    try {
      var units = [];
      for (ele of ids) {
        const unit = await UnitType.findOne({ where: { id: ele } });
        if (unit) {
          units.push(unit);
        }
      }
      return units;
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  createManyUnit: async( data) =>{
    try {
      const units = await UnitType.bulkCreate(data)
      return {units,isSuccess: true,status: 200}
    } catch (error) {
      console.log(error)
      return {message: 'something went wrong',isSuccess: false, status: 500}
    }
  },
  getUnitById: async (id) =>{
    try {
      const unitType = await UnitType.findByPk(id)
      if(unitType){
        return {unitType, isSuccess: true, status: 200}
      }
      return {message: 'unitType not found',isSuccess: false, status: 404}
    } catch (error) {
      console.log(error)
      return {message: 'something went wrong',isSuccess: false, status: 500}
    }
  }
};

module.exports = UnitTypeServices;
