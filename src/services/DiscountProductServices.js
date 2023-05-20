const {
  DiscountRateProduct,
  ProductUnitType,
  PromotionResult,
  Product,
  UnitType,
  Price,
  Bill,
  BillDetail,
} = require("../config/persist");
const { Op } = require("sequelize");

const services = {
  add: async (data) => {
    try {
      const { id, PromotionHeaderId, ProductUnitTypeId } = data;
      if (!PromotionHeaderId || !ProductUnitTypeId) {
        return {
          message: "missed PromotionHeaderId or ProductUnitTypeId",
          isSuccess: false,
          status: 400,
        };
      }
      let discountProduct = await DiscountRateProduct.findOne({
        where: { id: id },
      });
      if (discountProduct) {
        return {
          message: "promtion already exists",
          isSuccess: false,
          status: 403,
        };
      } else {
        discountProduct = await DiscountRateProduct.create(data);
        return { discountProduct, isSuccess: true, status: 200 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  get: async (query) => {
    try {
      const page = (query._page && Number(query._page)) || 1;
      const limit = (query._limit && Number(query._limit)) || 20;
      var offset = (page - 1) * limit;
      const discountProducts = await DiscountRateProduct.findAndCountAll({
        limit: limit,
        offset: offset,
        distinct: true,
        order: [["updatedAt", "DESC"]],
      });
      return { discountProducts, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (id, data) => {
    try {
      const discount = await DiscountRateProduct.findOne({ where: { id: id } });
      if (discount) {
        await discount.update(data);
        await discount.save();
        return { message: "updated successful", isSuccess: true, status: 200 };
      }
      return { message: "promotion not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getByid: async (id) => {
    try {
      const discountRate = await DiscountRateProduct.findOne({
        where: { id: id },
        include: { model: ProductUnitType },
      });
      if (!discountRate) {
        return { message: "not found", isSuccess: false, status: 404 };
      }
      return { discountRate, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  delete: async (id) => {
    try {
      const check = await DiscountRateProduct.findOne({ where: { id: id } });
      if (check) {
        await check.destroy();
        return { message: "deleted successful", isSuccess: true, status: 200 };
      } else {
        return {
          message: "discount promotion not found",
          isSuccess: false,

          status: 404,
        };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getDcrPromotionByDate: async (from, to) => {
    try {
      if (from && to) {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        toDate.setDate(toDate.getDate() + 1);
        let discountRates = await DiscountRateProduct.findAll({
          where: {
            [Op.or]: [
              {
                startDate: { [Op.between]: [fromDate, toDate] },
              },
              {
                endDate: { [Op.between]: [fromDate, toDate] },
              },
            ],
          },
          include: [
            {
              model: ProductUnitType,
              include: [
                { model: Product, attributes: ["id", "name"] },
                { model: UnitType, attributes: ["id", "name"] },
              ],
            },
            {
              model: PromotionResult,
              attributes: ["id"],
              where: { createdAt: { [Op.between]: [fromDate, toDate] } },
              include: [
                {
                  model: Bill,
                  include: [
                    {
                      model: BillDetail,
                      include: [
                        {
                          model: Price,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        });
        if (!discountRates) {
          return null;
        }
        return discountRates;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

module.exports = services;
