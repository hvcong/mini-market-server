const {
  ProductPromotion,
  GiftProduct,
  ProductUnitType,
  Product,
  UnitType,
  PromotionResult,
} = require("../config/persist");
const { Op } = require("sequelize");

const Services = {
  add: async (data) => {
    try {
      const {
        id,
        title,
        description,
        startDate,
        endDate,
        minQuantity,
        state,
        ProductUnitTypeId,
        PromotionHeaderId,
      } = data;
      var promotion = await ProductPromotion.findOne({ where: { id: id } });
      // let promotionHeader = await PromotionHeader.findOne({
      //   where: { PromotionHeaderId: PromotionHeaderId },
      // });
      if (promotion) {
        return {
          message: "this Product promotion already exists",
          isSuccess: false,
          status: 400,
        };
      }
      promotion = await ProductPromotion.create({
        id,
        title,
        description,
        startDate,
        endDate,
        minQuantity,
        state,
        ProductUnitTypeId,
        PromotionHeaderId,
      });
      // await promotion.setPromotionHeader(promotionHeader);
      return { promotion, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (id, data) => {
    try {
      const check = await ProductPromotion.findOne({ where: { id: id } });
      if (check) {
        await check.update(data);
        await check.save();
        return { message: "updated successful", isSuccess: true, status: 200 };
      } else {
        return {
          message: "product promotion not found",
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
      const check = await ProductPromotion.findOne({ where: { id: id } });
      if (check) {
        await GiftProduct.destroy({
          where: {
            ProductPromotionId: id,
          },
        });
        await check.destroy();

        return { message: "deleted successful", isSuccess: true, status: 200 };
      } else {
        return {
          message: "product promotion not found",
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
      const promotions = await ProductPromotion.findAll({
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
  getGiftByKmId: async (id) => {
    try {
      const pm = await ProductPromotion.findByPk(id);
      const gift = await pm.getGiftProduct();
      if (!pm) {
        return { message: "not found", isSuccess: false, status: 404 };
      }
      return { gift, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getByid: async (id) => {
    try {
      const productPromotion = await ProductPromotion.findOne({
        where: { id: id },
        include: [
          { model: GiftProduct, include: [{ model: ProductUnitType }] },
          {
            model: ProductUnitType,
          },
        ],
      });
      if (!productPromotion) {
        return { message: "not found", isSuccess: false, status: 404 };
      }
      return { productPromotion, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getProductPromotionByDate: async (from, to) => {
    try {
      if (from && to) {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        toDate.setDate(toDate.getDate() + 1);
        let productPromotions = await ProductPromotion.findAll({
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
              model: GiftProduct,
              include: [
                {
                  model: ProductUnitType,
                  include: [{ model: Product }, { model: UnitType }],
                },
              ],
            },
            {
              model: PromotionResult,
              where: { createdAt: { [Op.between]: [fromDate, toDate] } },
            },
          ],
        });
        if (!productPromotions) {
          return null;
        }
        return productPromotions;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

module.exports = Services;
