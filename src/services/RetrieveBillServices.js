const { RetrieveBill, Bill } = require("../config/persist");
const { getByPriceId } = require("./PriceServices");
const StoreServices = require("./StoreServices");
const { getGiftByKmId } = require("./ProductPromotionServices");
// const { getByid, update } = require("./MoneyPromotionServices");

const services = {
  add: async (data) => {
    try {
      const { BillId, employeeId } = data;
      const check = await RetrieveBill.findOne({where: {BillId: BillId}});
      if(check){
        return {message: 'this bill already retrieved',isSuccess: false, status: 400}
      }
      const bill = await Bill.findByPk(BillId);
      if (!bill) {
        return { message: "billId not found", isSuccess: false, status: 400 };
      }
      await bill.update({ type: "retrieve" });
      const retrieve = await RetrieveBill.create(data);
      const billDetails = await bill.getBillDetails();
      const result = await bill.getPromotionResults();      
      for (const e of result) {
        if (e.ProductPromotionId !== null) {          
          const { gift } = await getGiftByKmId(e.ProductPromotionId);
          await StoreServices.add({
            quantity: e.quantityApplied,
            ProductUnitTypeId: gift.ProductUnitTypeId,
            type: "trả hàng khuyến mãi",
            employeeId,
          });
        }
        // if (e.MoneyPromotionId !== null) {
        //   const { moneyPromotion } = await getByid(e.MoneyPromotionId);
        //   if (moneyPromotion.type == "money") {
        //     await update(e.MoneyPromotionId, {
        //       availableBudget:
        //         moneyPromotion.availableBudget + moneyPromotion.discountMoney,
        //     });
        //   }
        //   if (moneyPromotion.type == "rate") {
        //     await update(e.MoneyPromotionId, {
        //       availableBudget:
        //         moneyPromotion.availableBudget +
        //         moneyPromotion.maxMoneyDiscount,
        //     });
        //   }
        // }
      }
      for (const e of billDetails) {
        const { price } = await getByPriceId(e.PriceId);        
        await StoreServices.add({
          quantity: e.quantity,
          ProductUnitTypeId: price.ProductUnitTypeId,
          type: "trả hàng",
          employeeId,
        });
      }
      return { retrieve, isSuccess: true, status: 200 };
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
      const retrieves = await RetrieveBill.findAndCountAll({
        limit: limit,
        offset: offset,
        distinct: true,
        order: [["updatedAt", "DESC"]],
      });
      return { retrieves, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getRetrieveIds: async () => {
    try {
      const ids = await RetrieveBill.findAll({
        attributes: ["BillId"],
      });
      return { ids, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};
module.exports = services;
