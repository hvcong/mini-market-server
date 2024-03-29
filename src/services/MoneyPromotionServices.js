const { MoneyPromotion, PromotionResult } = require("../config/persist");
const { Op } = require("sequelize");

const Services = {
  add: async (data) => {
    try {
      const { id } = data;
      let promotion = await MoneyPromotion.findOne({ where: { id: id } });
      if (promotion) {
        return {
          message: "this Money promotion already exists",
          isSuccess: false,
          status: 400,
        };
      }
      promotion = await MoneyPromotion.create(data);
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
  get: async (query) => {
    try {
      const page = (query._page && Number(query._page)) || 1;
      const limit = (query._limit && Number(query._limit)) || 20;
      var offset = (page - 1) * limit;
      const promotions = await MoneyPromotion.findAll({
        limit: limit,
        offset: offset,
        order: [["updatedAt", "DESC"]],
      });
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
  getByid: async (id) => {
    try {
      const moneyPromotion = await MoneyPromotion.findByPk(id);
      if (!moneyPromotion) {
        return { message: "not found", isSuccess: false, status: 404 };
      }
      return { moneyPromotion, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getMoneyPromotionByDate: async (from,to) => {
    try {
      if (from && to) {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        toDate.setDate(toDate.getDate() + 1);
        let moneyPromotions = await MoneyPromotion.findAll({
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
          include: {
            model: PromotionResult,
            where: { createdAt: { [Op.between]: [fromDate, toDate] } },        
          },
        });
        if (!moneyPromotions) {
          return null;
        }
        return moneyPromotions;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

module.exports = Services;
