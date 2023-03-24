const { RetrieveBill } = require("../config/persist");

const services = {
  add: async (data) => {
    try {
      const retrieve = await RetrieveBill.create(data);
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
      return {ids,isSuccess: true, status: 200}
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};
module.exports = services;
