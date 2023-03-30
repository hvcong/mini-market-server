const { BillDetail } = require("../config/persist");

const services = {
  createBillDetais: async (data) => {
    try {
      const arr = data.map((e) => ({ quantity: e.quantity, PriceId: e.id }));
      const billdetails = await BillDetail.bulkCreate(arr);
      return billdetails;
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false };
    }
  },
};
module.exports = services;
