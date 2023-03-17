const { ListPricesHeader } = require("../config/persist");
const {
  createBulkPrice,
  updateManyPrice,
} = require("../services/PriceServices");

const services = {
  add: async (data) => {
    try {
      const { id, title, startDate, endDate, state, priceLines } = data;
      var header = await ListPricesHeader.findOne({ where: { id: id } });
      if (header) {
        return {
          message: "price header already exists",
          isSuccess: false,
          status: 403,
        };
      }
      header = await ListPricesHeader.create({
        id,
        title,
        startDate,
        endDate,
        state,
      });
      const { listPrices } = await createBulkPrice(priceLines);
      await header.setPrices(listPrices);
      return { header, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (data) => {
    const { id, title, startDate, endDate, state, priceLines } = data;
    try {
      const header = await ListPricesHeader.findOne({
        where: { id: id },
      });
      if (header) {
        await header.update({ title, startDate, endDate, state });
        await header.save();
        const { isSuccess } = await updateManyPrice(priceLines, id);
        if (isSuccess) {
          return { message: "updated succesful", isSuccess: true, status: 200 };
        }
        return { message: "updated failed", isSuccess: false, status: 500 };
      } else {
        return { message: "price not found", isSuccess: false, status: 404 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  delete: async (id) => {
    try {
      const header = await ListPricesHeader.findOne({
        where: { id: id },
      });
      if (header) {
        await header.destroy();
        return { message: " deleted succesful", isSuccess: true, status: 200 };
      } else {
        return { message: "not found", isSuccess: false, status: 404 };
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
      const headers = await ListPricesHeader.findAndCountAll({
        limit: limit,
        offset: offset,
      });
      return { headers, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getById: async (id) => {
    try {
      const header = await ListPricesHeader.findByPk(id);
      if (header) {
        return { header, isSuccess: true, status: 200 };
      }
      return { message: "header not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = services;
