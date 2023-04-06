const {
  WareHouseTicket,
  Employee,
  TicketDetail,
  ProductUnitType,
  Product,
} = require("../config/persist");
const { addTickets } = require("./TicketServices");
const services = {
  add: async (data) => {
    const { EmployeeId, id, note, ticketDetails } = data;
    try {
      const employee = await Employee.findByPk(EmployeeId);
      if (!employee) {
        return { message: "employee not found", isSuccess: false, status: 400 };
      }
      const ticket = await WareHouseTicket.create({ id, EmployeeId, note });
      const { details } = await addTickets(ticketDetails);
      ticket.setTicketDetails(details);
      return { ticket, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (id, data) => {
    try {
      const ticket = await WareHouseTicket.findByPk(id);
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
      const ticket = await WareHouseTicket.findOne({
        where: { id: id },
        include: [
          { model: Employee },
          {
            model: TicketDetail,
            include: [
              { model: ProductUnitType, include: [{ model: Product }] },
            ],
          },
        ],
      });

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
      const tickets = await WareHouseTicket.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [["createAt", "DESC"]],
        distinct: true,
        include: [
          { model: Employee },
          {
            model: TicketDetail,
            include: [
              {
                model: ProductUnitType,
              },
            ],
          },
        ],
      });
      return { tickets, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  addMany: async (data) => {
    try {
      const tickets = await WareHouseTicket.bulkCreate(data);
      return { tickets, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = services;
