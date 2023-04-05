const { GiftProduct } = require("../config/persist");

const Services = {
  add: async (data) => {
    const { id, ProductUnitTypeId, ProductPromotionId } = data;
    try {
      var gift = await GiftProduct.findOne({ where: { id: id } });
      if (gift) {
        return {
          message: "this gift already exists",
          isSuccess: false,
          status: 400,
        };
      }
      if (!ProductUnitTypeId && !ProductPromotionId) {
        return {
          message: "required productPromotionId and ProductPromotionId",
          isSuccess: false,
          status: 403,
        };
      }
      gift = await GiftProduct.create(data);
      return { gift, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (id, data) => {
    try {
      const gift = await GiftProduct.findOne({ where: { id: id } });
      if (gift) {
        await gift.update(data);
        await gift.save();
        return { message: "updated successful", isSuccess: true, status: 200 };
      }
      return {
        message: "no gift product found",
        isSuccess: false,
        status: 404,
      };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  delete: async (id) => {
    try {
      const gift = await GiftProduct.findOne({ where: { id: id } });
      if (gift) {
        await gift.destroy();
        return { message: "deleted successful", isSuccess: true, status: 200 };
      }
      return {
        message: "no gift product found",
        isSuccess: false,
        status: 404,
      };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  get: async () => {
    try {
      const gifts = await GiftProduct.findAll();
      if (gifts.length) {
        return { gifts, isSuccess: true, status: 200 };
      }
      return {
        message: "no gift product found",
        isSuccess: false,
        status: 404,
      };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = Services;
