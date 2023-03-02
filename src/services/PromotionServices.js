const { PromotionHeader } = require("../config/persist");

const PromotionHeaderServices = {
  add: async (data) => {
    try {
      const { id, title, endDate, budget, state } = data;
      var promotion = await PromotionHeader.findOne({ where: { id: id } });
      if (promotion) {
        return {
          message: "this promotion already exists",
          isSuccess: false,
          status: 404,
        };
      }
      promotion = await PromotionHeader.create({
        id,
        title,
        endDate,
        budget,
        state,
      });
      return { promotion, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (id, data) => {
    try {
      const promotion = await PromotionHeader.findOne({ where: { id: id } });
      if (promotion) {
        await promotion.update(data);
        return { message: "updated successful", isSuccess: true, status: 200 };
      }
      return { message: "promotion not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  delete: async (id) => {
    try {
      const promotion = await PromotionHeader.findOne({ where: { id: id } });
      if (promotion) {
        await promotion.destroy();
        return { message: "deleted successful", isSuccess: true, status: 200 };
      }
      return { message: "promotion not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getAll : async() =>{
    try {
        const promotions = await PromotionHeader.findAll({ limit: 20});
        if (promotions) {
          return { promotions, isSuccess: true, status: 200 };
        }
        return { message: "promotion not found", isSuccess: false, status: 404 };
      } catch (error) {
        console.log(error);
        return { message: "something went wrong", isSuccess: false, status: 500 };
      }
  }
};

module.exports = PromotionHeaderServices
