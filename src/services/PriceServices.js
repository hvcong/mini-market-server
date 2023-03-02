const { Price, Product, UnitType } = require("../config/persist");

const PriceServices = {
  addPrice: async (data) => {
    try {
      const { productId, unitTypeId, endDate, price, state } = data;
      const product = await Product.findOne({ where: { id: productId } });
      const unit = await UnitType.findOne({ where: { id: unitTypeId } });
      if (product && unit) {
        const prodPrice = await Price.create({
          endDate,
          price,
          state,
          ProductId: productId,
          UnitTypeId: unitTypeId,
        });
        await prodPrice.setProduct(product);
        await prodPrice.setUnitType(unit);
        return { prodPrice, isSuccess: true, status: 200 };
      } else {
        return {
          message: "no product or no unitType, price could not be created",
          isSuccess: false,
          status: 400,
        };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  updatePrice: async (data) => {
    try {
      const { productId, unitTypeId, ...newData } = data;
      const price = await Price.findOne({
        where: { ProductId: productId, UnitTypeId: unitTypeId },
      });
      if (price) {
        const result = await price.update(newData);
        return { message: "updated succesful", isSuccess: true, status: 200 };
      } else {
        return { message: "price not found", isSuccess: false, status: 404 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  deletePrice: async (pid, uid) => {
    try {
      const price = await Price.findOne({
        where: { ProductId: pid, UnitTypeId: uid },
      });
      if (price) {
        await price.destroy();
        return { message: " deleted succesful", isSuccess: true, status: 200 };
      } else {
        return { message: "not found", isSuccess: false, status: 404 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getProductLine: async () => {
    try {
      const productLines = await Price.findAll({
        limit: 20,
        include: [
          {
            model: Product,
          },
          {
            model: UnitType,
          },
        ],
      });
      return {productLines,isSuccess: true, status: 200 }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = PriceServices;
