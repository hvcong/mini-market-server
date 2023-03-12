const { MoneyPromotion, PromotionHeader } = require("../config/persist");

const Services = {
  add: async (data) => {
    try {
      const { id,minCost, startDate, endDate, state,discountMoney,discountRate, maxDiscountMoney, promotionHeaderId } = data;
      var promotion = await MoneyPromotion.findOne({ where: { id: id } });
      const promotionHeader = await PromotionHeader.findOne({where: {id: promotionHeaderId}})
      if (promotion ) {
        return {
          message: "this Money promotion already exists",
          isSuccess: false,
          status: 400,
        };
      }
        promotion = await MoneyPromotion.create({id,startDate ,endDate,minCost,state,discountMoney,discountRate,maxDiscountMoney});
        await promotion.setPromotionHeader(promotionHeader)
        return { promotion, isSuccess: true, status: 200 };
      
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (id, data) => {
    try {
      const check = await MoneyPromotion.findOne({ where: { id: id } });
      if (check) {
        await check.update(data);
        await check.save();
        return { message: "updated successful", isSuccess: true, status: 200 };
      } else {
        return {
          message: "Money promotion not found",
          isSuccess: false,
          status: 404,
        };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  delete: async (id) => {
    try {
      const check = await MoneyPromotion.findOne({ where: { id: id } });
      if (check) {
        await check.destroy();
        return { message: "deleted successful", isSuccess: true, status: 200 };
      } else {
        return {
          message: "Money promotion not found",
          isSuccess: false,
          status: 404,
        };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  get: async (data) => {
    try {
      const promotions = await MoneyPromotion.findAll({ limit: 20 });
      if (promotions.length) {
        return { isSuccess: true, promotions, status: 200 };
      } else {
        return { message: "no promotions", isSuccess: false, status: 200 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = Services;
