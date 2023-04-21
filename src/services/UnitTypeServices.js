const e = require("express");
const { UnitType, Product } = require("../config/persist");
const { Op } = require("sequelize");

const UnitTypeServices = {
  addUnit: async (data) => {
    const { id, name, convertionQuantity } = data;
    try {
      let unitType = await UnitType.findOne({ where: { id: id } });
      if (!unitType) {
        unitType = await UnitType.create({
          id,
          name,
          convertionQuantity,
        });
        return { unitType, isSuccess: true, status: 200 };
      } else {
        return {
          message: "unitType already exists",
          isSuccess: false,
          status: 403,
        };
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
  createManyUnit: async (data) => {
    try {
      const units = await UnitType.bulkCreate(data);
      return { units, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getUnitById: async (id) => {
    try {
      const unitType = await UnitType.findByPk(id);
      if (unitType) {
        return { unitType, isSuccess: true, status: 200 };
      }
      return { message: "unitType not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getUnitByProductId: async (id) => {
    try {
      const unitTypes = await UnitType.findAll({
        include: {
          model: Product,
          where: { id: id },
          through: { attributes: [] },
        },
      });
      if (unitTypes.length) {
        return { unitTypes, isSuccess: true, status: 200 };
      }
      return {
        message: "product have not unitTypes yet",
        isSuccess: false,
        status: 200,
      };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getAllUnits: async () => {
    try {
      const unitTypes = await UnitType.findAll({
        order: [["updatedAt", "DESC"]],
      });
      if (unitTypes.length) {
        return { unitTypes, isSuccess: true, status: 200 };
      }
      return { message: "no unitType", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getLimit: async (query) => {
    try {
      const page = (query._page && Number(query._page)) || 1;
      const limit = (query._limit && Number(query._limit)) || 20;
      var offset = (page - 1) * limit;
      const unitTypes = await UnitType.findAndCountAll({
        limit: limit,
        offset: offset,
        distinct: true,
        order: [["updatedAt", "DESC"]],
      });
      if (unitTypes.rows.length) {
        return { unitTypes, isSuccess: true, status: 200 };
      }
      return { message: "no unitTypes", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getUnitByIds: async (ids) => {
    try {
      const listUnit = [];
      for (const e of ids) {
        const unitType = await UnitType.findByPk(e.id);
        if (unitType) {
          listUnit.push(unitType);
        }
      }
      return { listUnit, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getBaseUnit: async () => {
    try {
      const baseUnits = await UnitType.findAll({
        where: { convertionQuantity: 1 },
      });
      return { baseUnits, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getOtherUnits: async () => {
    try {
      const otherUnits = await UnitType.findAll({
        where: { convertionQuantity: { [Op.ne]: 1 } },
        order: [["updatedAt", "DESC"]],
      });
      return { otherUnits, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  filter: async(query)=>{
    const page = (query._page && Number(query._page)) || 1;
    const limit = (query._limit && Number(query._limit)) || 20;
    const offset = (page - 1) * limit;
    const { id, name  } = query;
    try {
      let unitTypes = await UnitType.findAndCountAll({
        limit: limit,
        offset: offset,        
        distinct: true,
      });
      if (id && !name ) {
        unitTypes.rows = unitTypes.rows.filter((e) => {
          if (e.id) {
            return e.id.startsWith(id);
          }
        });
        unitTypes.count = unitTypes.rows.length
      }
      if (!id && name ) {
        unitTypes.rows = unitTypes.rows.filter((e) => {
          if (e.name) {
            return e.name.startsWith(name);
          }
        });
        unitTypes.count = unitTypes.rows.length
      }
      if (id && name ) {
        unitTypes.rows = unitTypes.rows.filter((e) => {
          if (e.id && e.name) {
            return e.id.startsWith(id) && (e.name.startsWith(name));
          }
        });
        unitTypes.count = unitTypes.rows.length
      }    
      return { unitTypes, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  }
};

module.exports = UnitTypeServices;
