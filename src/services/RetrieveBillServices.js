const { RetrieveBill, Bill } = require("../config/persist");
const { getProductByPriceId } = require("./PriceServices");
const StoreServices = require("./StoreServices");
const { getGiftByKmId } = require("./ProductPromotionServices");

const services = {
  add: async (data) => {
    try {
      const { note, BillId } = data;
      const bill = await Bill.findByPk(BillId);
      if (!bill) {
        return { message: "billId not found", isSuccess: false, status: 400 };
      }
      const retrieve = await RetrieveBill.create(data);
      const billDetails = await bill.getBillDetails();
      const result = await bill.getPromotionResults();      
      for (const e of result) {        
        const {gift} = await getGiftByKmId(e.ProductPromotionId)
        console.log(gift)
      }
      for (const e of billDetails) {
        const { price } = await getProductByPriceId(1);     
        console.log(price.dataValues)   
      }
      const psResult = await bill.getPromotionResults();
      // console.log(psResult);
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
