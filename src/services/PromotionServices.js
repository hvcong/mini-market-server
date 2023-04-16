const {
  PromotionHeader,
  ProductPromotion,
  MoneyPromotion,
  DiscountRateProduct,
  Voucher,
  TypeCustomer,
  ProductUnitType,
  GiftProduct,
  Product,
  UnitType,
} = require("../config/persist");
const { getByIds } = require("../services/TypeCustomerServices");
const { compareDMY } = require("../utils/funcCommon");

const PromotionHeaderServices = {
  add: async (data) => {
    try {
      const {
        id,
        title,
        description,
        startDate,
        endDate,
        budget,
        availableBudget,
        state,
        customerIds,
      } = data;
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
        startDate,
        endDate,
        description,
        budget,
        availableBudget,
        state,
      });
      const { typeCustomers } = await getByIds(customerIds);
      await promotion.setTypeCustomers(typeCustomers);
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
        await promotion.save();
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
  getAll: async (query) => {
    const page = (query._page && Number(query._page)) || 1;
    const limit = (query._limit && Number(query._limit)) || 20;
    var offset = (page - 1) * limit;
    try {
      const promotions = await PromotionHeader.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: ProductPromotion,
          },
          {
            model: MoneyPromotion,
          },
          {
            model: DiscountRateProduct,
          },
          {
            model: TypeCustomer,
          },
        ],
        distinct: true,
      });
      if (promotions) {
        return { promotions, isSuccess: true, status: 200 };
      }
      return { message: "promotion not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getById: async (id) => {
    try {
      const promotion = await PromotionHeader.findOne({
        where: { id: id },
        include: [
          { model: ProductPromotion },
          { model: DiscountRateProduct },
          { model: MoneyPromotion },
          { model: Voucher },
          {
            model: TypeCustomer,
          },
        ],
      });
      if (promotion) {
        return { promotion, isSuccess: true, status: 200 };
      }
      return { message: "promotion not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getAllOnActive: async () => {
    try {
      const promotions = await PromotionHeader.findAll({
        where: { state: true },
        include: [
          {
            model: ProductPromotion,
            include: [
              {
                model: GiftProduct,
                include: [
                  {
                    model: ProductUnitType,
                    include: [{ model: Product }, { model: UnitType }],
                  },
                ],
              },
              {
                model: ProductUnitType,
                include: [{ model: Product }, { model: UnitType }],
              },
            ],
          },
          {
            model: DiscountRateProduct,
            include: [
              {
                model: ProductUnitType,
                include: [{ model: Product }],
              },
            ],
          },
          { model: MoneyPromotion },
          { model: Voucher },
          {
            model: TypeCustomer,
          },
        ],
      });
      if (promotions) {
        // lấy những đang áp dụng
        let newHeaders = promotions.filter((header) => {
          let start = new Date(header.dataValues.startDate);
          let end = new Date(header.dataValues.endDate);
          let now = new Date();

          return compareDMY(start, now) <= 0 && compareDMY(end, now) >= 0;
        });

        return { promotions: newHeaders, isSuccess: true, status: 200 };
      }
      return { message: "promotion not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getProductPromotion: async (query) => {
    const page = (query._page && Number(query._page)) || 1;
    const limit = (query._limit && Number(query._limit)) || 20;
    var offset = (page - 1) * limit;
    try {
      const promotions = await PromotionHeader.findAll({
        where: { state: true },
        limit: limit,
        include: [
          {
            model: ProductPromotion,
            include: [
              {
                model: GiftProduct,
                include: [
                  {
                    model: ProductUnitType,
                    include: [{ model: Product }, { model: UnitType }],
                  },
                ],
              },
              {
                model: ProductUnitType,
                include: [{ model: Product }, { model: UnitType }],
              },
            ],
          },
        ],
      });
      if (promotions) {
        return { promotions, isSuccess: true, status: 200 };
      }
      return { message: "promotion not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getRatePromotion: async (query) => {
    const page = (query._page && Number(query._page)) || 1;
    const limit = (query._limit && Number(query._limit)) || 20;
    var offset = (page - 1) * limit;
    try {
      const promotions = await PromotionHeader.findAll({
        where: { state: true },
        limit: limit,
        include: [
          {
            model: DiscountRateProduct,
            include: [
              {
                model: ProductUnitType,
                include: [{ model: Product }, { model: UnitType }],
              },
            ],
          },
        ],
      });
      if (promotions) {
        return { promotions, isSuccess: true, status: 200 };
      }
      return { message: "promotion not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getMoneyPromotionFor: async (query) => {
    try {
      const type = query.type;
      const limit = query._limt;
      const promotions = await PromotionHeader.findAll({
        where: { state: true },
        limit: limit,
        include: [
          { model: TypeCustomer, where: { id: type } },
          { model: MoneyPromotion },
        ],
      });
      if(!promotions){
        return {message: 'promotion not found',isSuccess: false, status: 404}
      }
      return {promotions,isSuccess: true,status: 200}
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = PromotionHeaderServices;
