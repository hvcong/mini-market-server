const { Price, Product, UnitType } = require("../config/persist");

const PriceServices = {
  addPrice: async (data) => {
    try {
      const { id, productId, unitTypeId, endDate, price, state,headerId } = data;
      const product = await Product.findOne({ where: { id: productId } });
      const unit = await UnitType.findOne({ where: { id: unitTypeId } });
      if (product && unit) {
        const productPrice = await Price.create({
          id,
          endDate,
          price,
          state,
          ProductId: productId,
          UnitTypeId: unitTypeId,
          ListPricesHeaderId: headerId
        });
        await productPrice.setProduct(product);
        await productPrice.setUnitType(unit);
        return { productPrice, isSuccess: true, status: 200 };
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
  updatePrice: async (id, data) => {
    try {
      const price = await Price.findOne({
        where: { id: id },
      });
      if (price) {
        await price.update(data);
        await price.save();
        return { message: "updated succesful", isSuccess: true, status: 200 };
      } else {
        return { message: "price not found", isSuccess: false, status: 404 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  deletePrice: async (id) => {
    try {
      const price = await Price.findOne({
        // where: { ProductId: pid, UnitTypeId: uid },
        where: { id: id },
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
  getProductLine: async (query) => {
    try {
      const page = (query._page && Number(query._page)) || 1;
      const limit = (query._limit && Number(query._limit)) || 20;
      var offset = (page - 1) * limit;
      const productLines = await Price.findAll({
        limit: limit,
        offset: offset,
        include: [
          {
            model: Product,
          },
          {
            model: UnitType,
          },
        ],
        attributes: { exclude: ["ProductId", "UnitTypeId"] },
      });
      return { productLines, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getPriceByProductId: async (id) => {
    try {
      const price = await Price.findOne({
        where: { 
          ProductId: id, 
          state: true,
        },
        include: {
          model: UnitType,
          where: {
            convertionQuantity: 1,
          },
          attributes: ['name']
        }
      });
      return { price, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = PriceServices;
