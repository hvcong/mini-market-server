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
  getSoldByDate: async(req,res) =>{
    const {fromDate,toDate,employeeId} = req.body    
    const {isSuccess,status,bills,message} = await services.getSoldByDate(fromDate,toDate,employeeId)
    if(isSuccess){
      return res.status(status).json({isSuccess,bills})
    }
    return res.status(status).json({isSuccess,message})
  }
};
module.exports = controller;
