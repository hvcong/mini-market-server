const { TicketDetail } = require("../config/persist");

const services = {
  addTickets: async (data) => {
    try {
      const details = await TicketDetail.bulkCreate(data);
      return { details, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};
module.exports = services;
