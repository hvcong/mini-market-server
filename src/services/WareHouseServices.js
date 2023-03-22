const { WareHouseTiket } = require("../config/persist");
const services = {
  add: async (data) => {
    try {
      //   const { reportQty, realQty,ProductId, EmployeeId } = data;
      const ticket = await WareHouseTiket.create(data);
      return { ticket, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (id, data) => {
    try {
      const ticket = await WareHouseTiket.findByPk(id);
      if (ticket) {
        await ticket.update(data);
        await ticket.save();
        return { message: "updated succesful", isSuccess: true, status: 200 };
      }
      return { message: "ticket not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getOne: async (id) => {
    try {
      const ticket = await WareHouseTiket.findByPk(id);
      if (ticket) {
        return { ticket, isSuccess: true, status: 200 };
      }
      return { message: "ticket not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  get: async (query) => {
    const page = (query._page && Number(query._page)) || 1;
    const limit = (query._limit && Number(query._limit)) || 20;
    var offset = (page - 1) * limit;
    try {
      const tickets = await WareHouseTiket.findAndCountAll({limit: limit, offset: offset});
      return {tickets,isSuccess: true, status: 200}
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  addMany: async (data) => {
    try {
      const tickets = await WareHouseTiket.bulkCreate(data);
      return { tickets, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = services;
