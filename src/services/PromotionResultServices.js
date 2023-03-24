const {
  PromotionResult,
  Bill,
  MoneyPromotion,
  Voucher,
  DiscountRateProduct,
  ProductPromotion,
} = require("../config/persist");

const services = {
  create: async (data) => {
    try {
      const result = await PromotionResult.create(data);
      return { result, status: 200, isSuccess: true };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getAll: async (query) => {
    const page = (query._page && Number(query._page)) || 1;
    const limit = (query._limit && Number(query._limit)) || 20;
    var offset = (page - 1) * limit;
    try {
      const results = await PromotionResult.findAndCountAll({
        limit: limit,
        offset: offset,
        distinct: true,
        include: [
          {
            model: Bill,
          },
          {
            model: MoneyPromotion,
          },
          {
            model: Voucher,
          },
          {
            model: DiscountRateProduct,
          },
          {
            model: ProductPromotion,
          },
        ],
      });
      return { results, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getById: async (query) => {
    try {
      const { id } = query;
      const result = await PromotionResult.findByPk(id);
      if (result) {
        return { result, isSuccess: true, status: 200 };
      }
      return { message: "not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = services;
