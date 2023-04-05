const { ProductUnitType } = require("../config/persist");

const services = {
  getProduct: async (id) => {
    try {
      const productUnitType = await ProductUnitType.findByPk(id);
      if (!productUnitType) {
        return null;
      }
      return productUnitType.getProduct();
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getUnitType: async (id) => {
    try {
      const productUnitType = await ProductUnitType.findByPk(id);
      if (!productUnitType) {
        return null;
      }
      return productUnitType.getUnitType();
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

module.exports = services;
