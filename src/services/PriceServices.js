const {
  Price,
  UnitType,
  ProductUnitType,
  ListPricesHeader,
  Product,
} = require("../config/persist");
const { Op, QueryTypes } = require("sequelize");
const sequelize = require("../config/database");
const PriceServices = {
  addPrice: async (data) => {
    try {
      const {
        id,
        startDate,
        endDate,
        price,
        state,
        headerId,
        productUnitTypeId,
      } = data;
      const productUnitType = await ProductUnitType.findByPk(productUnitTypeId);
      if (productUnitType) {
        const productPrice = await Price.create({
          id,
          startDate,
          endDate,
          price,
          state,
          ListPricesHeaderId: headerId,
        });
        await productPrice.setProductUnitType(productUnitType);
        return { productPrice, isSuccess: true, status: 200 };
      } else {
        return {
          message: "product and unitType could not be create",
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
        include: {
          model: ProductUnitType,
        },
      });
      return { productLines, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getPriceByProductId: async (id) => {
    try {
      const price = await Price.findAll({
        where: {
          state: true,
        },
        include: [
          {
            model: ProductUnitType,
            where: { ProductId: id },
            include: [
              {
                model: UnitType,
              },
            ],
          },
        ],
      });

      return { price, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getByPriceHeaderId: async (query) => {
    const priceHeaderId = query.priceHeaderId;
    try {
      const listPrices = await Price.findAll({
        include: [
          {
            model: ListPricesHeader,
            where: { id: priceHeaderId },
          },
          {
            model: ProductUnitType,
            include: [
              {
                model: Product,
              },
            ],
          },
        ],
      });
      return { listPrices, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  rawQuery: async () => {
    try {
      const result = await sequelize.query(
        "SELECT * FROM `prices` JOIN `productunittypes` ON `prices`. `ProductUnitTypeId` = `productunittypes`. `id` JOIN `products` on `productunittypes`.productid = `products`.id join `unittypes` on `productunittypes`.unittypeid = `unittypes`.id",
        { type: QueryTypes.SELECT }
      );
      return { result, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getByProductUnitTypeId: async (query) => {
    const proUnitId = query.productUnitTypeId;
    try {
      const price = await Price.findOne({
        include: [
          {
            model: ProductUnitType,
            where: { id: proUnitId },
          },
        ],
      });
      if (price) {
        return { price, isSuccess: true, status: 200 };
      }
      return { message: "not found price", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = PriceServices;
