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
} = require("../config/persist");
const { getByIds } = require("../services/TypeCustomerServices");

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
        order: [["updatedAt", "DESC"]],
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
                  { model: ProductUnitType, include: [{ model: Product }] },
                ],
              },
              { model: ProductUnitType, include: [{ model: Product }] },
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
        return { promotions, isSuccess: true, status: 200 };
      }
      return { message: "promotion not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = PromotionHeaderServices;
