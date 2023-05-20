const services = require("../services/BillServices");
const controller = {
  add: async (req, res) => {
    const data = req.body;
    const result = await services.add(data);
    const { isSuccess, bill, message, status } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, bill });
    }
    return res.status(status).json({ isSuccess, message });
  },
  get: async (req, res) => {
    const { query } = req;
    const { isSuccess, status, bills, message } = await services.get(query);
    if (isSuccess) {
      return res.status(status).json({ isSuccess, bills });
    }
    return res.status(status).json({ isSuccess, message });
  },
  getById: async (req, res) => {
    const { query } = req;
    const { isSuccess, status, bill, message } = await services.getById(query);
    if (isSuccess) {
      return res.status(status).json({ isSuccess, bill });
    }
    return res.status(status).json({ isSuccess, message });
  },
  updateInfo: async (req, res) => {
    const billId = req.params.id;
    const result = await services.updateInfo(billId, req.body.employeeId);
    return res.status(result.status).json(result);
  },
  getWhere: async (req, res) => {
    const { query } = req;
    const { isSuccess, status, bills, message } = await services.getClause(
      query
    );
    if (isSuccess) {
      return res.status(status).json({ isSuccess, bills });
    }
    return res.status(status).json({ isSuccess, message });
  },
  getSucceedBill: async (req, res) => {
    const { query } = req;
    const { isSuccess, status, bills, message } = await services.getSucceedBill(
      query
    );
    if (isSuccess) {
      return res.status(status).json({ isSuccess, bills });
    }
    return res.status(status).json({ isSuccess, message });
  },
  getPendingCancelBill: async (req, res) => {
    const { query } = req;
    const { isSuccess, status, bills, message } =
      await services.getPendingCancelBill(query);
    if (isSuccess) {
      return res.status(status).json({ isSuccess, bills });
    }
    return res.status(status).json({ isSuccess, message });
  },
  updateType: async (req, res) => {
    const type = req.params.type;
    const billId = req.params.id;
    const employeeId = req.body.employeeId;
    const result = await services.updateType(billId, type, employeeId);
    return res.status(result.status).json(result);
  },
  getSoldByDate: async (req, res) => {
    const { fromDate, toDate, employeeId } = req.body;
    const { isSuccess, status, bills, message } = await services.getSoldByDate(
      fromDate,
      toDate,
      employeeId
    );
    if (isSuccess) {
      return res.status(status).json({ isSuccess, bills });
    }
    return res.status(status).json({ isSuccess, message });
  },
  getSoldByCustomer: async (req, res) => {
    const { fromDate, toDate, customerId } = req.body;
    const { isSuccess, status, bills, message } =
      await services.getSoldByCustomer(fromDate, toDate, customerId);
    if (isSuccess) {
      return res.status(status).json({ isSuccess, bills });
    }
    return res.status(status).json({ isSuccess, message });
  },
  getRetrieveBill: async (req, res) => {
    const { fromDate, toDate } = req.body;
    const { isSuccess, status, bills, message } =
      await services.getRetrieveBill(fromDate, toDate);
    if (isSuccess) {
      return res.status(status).json({ isSuccess, bills });
    }
    return res.status(status).json({ isSuccess, message });
  },
  getPendingBills: async (req, res) => {
    const { date } = req.body;
    const dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    const pendingBills = await services.getPendingBills(dateValue);
    return res.status(200).json(pendingBills);
  },
};
module.exports = controller;
