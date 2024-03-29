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
const { getMoneyPromotionByDate } = require("./MoneyPromotionServices");
const { getProductPromotionByDate } = require("./ProductPromotionServices");
const { getVoucherPromotionByDate } = require("./voucherService");
const { getDcrPromotionByDate } = require("./DiscountProductServices");

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
          { model: MoneyPromotion, where: { state: 1 } },
        ],
      });
      if (!promotions) {
        return {
          message: "promotion not found",
          isSuccess: false,
          status: 404,
        };
      }
      let mp = [];
      for (const e of promotions) {
        mp.push(...e.MoneyPromotions);
      }
      const moneyPromotions = mp.filter((e) => {
        const x = new Date(e.startDate);
        const y = new Date();
        return x <= y;
      });
      return { moneyPromotions, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  promotionStatistics: async (from, to) => {
    try {
      let promotions = [];
      let productPromotions = await getProductPromotionByDate(from, to);
      let moneyPromotions = await getMoneyPromotionByDate(from, to);
      let vouchers = await getVoucherPromotionByDate(from, to);
      if (!vouchers[0].PromotionHeaderId) {
        vouchers = [];
      }
      let discountRates = await getDcrPromotionByDate(from, to);

      if (productPromotions.length) {
        productPromotions = productPromotions.map((e) => {
          let quantityApplied = e.PromotionResults.reduce(
            (accumulator, object) => {
              return accumulator + object.quantityApplied;
            },
            0
          );
          return {
            promotionId: e.id,
            name: e.title,
            startDate: e.startDate,
            endDate: e.endDate,
            giftProductId: e.GiftProduct.ProductUnitType.Product.id,
            giftProductName: e.GiftProduct.ProductUnitType.Product.name,
            giftUnitType: e.GiftProduct.ProductUnitType.UnitType.name,
            quantityApplied: quantityApplied || 0,
          };
        });
      }
      if (moneyPromotions.length) {
        moneyPromotions = moneyPromotions.map((e) => {
          if (e.type == "discountRate") {
            return {
              promotionId: e.id,
              name: e.title,
              startDate: e.startDate,
              endDate: e.endDate,
              type: e.type,
              minCost: e.minCost || 0,
              discount: e.maxMoneyDiscount || 0,
              budget: e.budget || 0,
              availableBudget: e.availableBudget || 0,
              used: e.budget - e.availableBudget || 0,
            };
          }
          if (e.type == "discountMoney") {
            let discounted = 0;
            if (e.PromotionResults.length) {
              discounted = e.PromotionResults.reduce((accumulator, object) => {
                return accumulator + object.discountMoneyByMoneyPromotion;
              }, 0);
            }

            return {
              promotionId: e.id,
              name: e.title,
              startDate: e.startDate,
              endDate: e.endDate,
              type: e.type,
              minCost: e.minCost || 0,
              discount: e.maxMoneyDiscount || 0,
              discounted: discounted || 0,
              budget: e.budget || 0,
              availableBudget: e.availableBudget || 0,
              used: e.budget - e.availableBudget || 0,
            };
          }
        });
      }
      if (discountRates.length) {
        discountRates = discountRates.map((e) => {
          let PromotionResults = e.PromotionResults.map((x) => {
            let result = x.Bill.BillDetails.find(
              (item) => item.Price.ProductUnitTypeId == e.ProductUnitTypeId
            );
            return {
              quantity: result.quantity,
              price: result.Price.price,
              listPricesHeaderId: result.Price.ListPricesHeaderId,
            };
          });
          PromotionResults = PromotionResults.reduce((accumulator, object) => {
            if (
              (objectFound = accumulator.find(
                (item) => item.listPricesHeaderId === object.listPricesHeaderId
              ))
            ) {
              objectFound.quantity += object.quantity;
            } else {
              accumulator.push(object);
            }
            return accumulator;
          }, []);
          PromotionResults = PromotionResults.map((y) => {
            return {
              discountedMoney: (e.discountRate / 100) * y.quantity * y.price,
            };
          });
          let sumAllMoneyDiscounted = PromotionResults.reduce(
            (accumulator, object) => accumulator + object.discountedMoney,
            0
          );
          return {
            promotionId: e.id,
            name: e.title,
            startDate: e.startDate,
            endDate: e.endDate,
            discountRate: e.discountRate,
            productId: e.ProductUnitType.ProductId,
            productName: e.ProductUnitType.Product.name,
            unitType: e.ProductUnitType.UnitType.name,
            discountedMoney: sumAllMoneyDiscounted,
          };
        });
      }
      if (vouchers.length) {
        vouchers = vouchers.map((e) => {
          return {
            promotionId: e.PromotionHeaderId,
            name: "Khuyến mãi Voucher",
            startDate: e.startDate,
            endDate: e.endDate,
            sumAllVoucher: e.dataValues.sumAllVoucher || 0,
            voucherUsed:
              e.dataValues.PromotionResult?.dataValues.voucherUsed || 0,
            remaining:
              e.dataValues.sumAllVoucher -
                e.dataValues.PromotionResult?.dataValues.voucherUsed || 0,
            totalDiscount:
              e.dataValues.PromotionResult?.dataValues.sumMoneyVoucher || 0,
          };
        });
      }

      promotions.push(...productPromotions);
      promotions.push(...moneyPromotions);
      promotions.push(...discountRates);
      promotions.push(...vouchers);

      return { promotions, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = PromotionHeaderServices;
