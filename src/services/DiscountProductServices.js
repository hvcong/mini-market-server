const { DiscountRateProduct } = require("../config/persist");
const { getById } = require("../services/PromotionServices");

const services = {
  add: async (data) => {
    try {
      const { id, startDate, endDate, discountRate, state, promotionHeaderId } =
        data;
      if (!promotionHeaderId) {
        return {
          message: "missed promotionHeaderId",
          isSuccess: false,
          status: 400,
        };
      }
      var discountProduct = await DiscountRateProduct.findOne({
        where: { id: id },
      });
      if (discountProduct) {
        return {
          message: "promtion already exists",
          isSuccess: false,
          status: 403,
        };
      } else {
        discountProduct = await DiscountRateProduct.create({
          id,
          startDate,
          endDate,
          discountRate,
          state,
        });
        const {promotion} = await getById(promotionHeaderId);
        discountProduct.setPromotionHeader(promotion)
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
        const discountProducts  = await DiscountRateProduct.findAndCountAll({limit: limit, offset: offset})
        return {discountProducts,isSuccess: true, status: 200}
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
 
};

module.exports = services;
