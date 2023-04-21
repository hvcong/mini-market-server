const services = require("../services/StoreServices");

const controller = {
  add: async (req, res) => {
    const data = req.body;
    const result = await services.add(data);
    const { isSuccess, status, message, transaction } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, transaction });
    }
    return res.status(status).json({ isSuccess, message });
  },
  get: async (req, res) => {
    const query = req.query;
    const { isSuccess, status, message, transactions } = await services.get(
      query
    );
    if (isSuccess) {
      return res.status(status).json({ isSuccess, transactions });
    }
    return res.status(status).json({ isSuccess, message });
  },
  addMany: async (req, res) => {
    const data = req.body.data;
    const { isSuccess, status, message, transactions } = await services.addMany(
      data
    );
    if (isSuccess) {
      return res.status(status).json({ isSuccess, transactions });
    }
    return res.status(status).json({ isSuccess, message });
  },
  stastics: async (req,res) =>{
    const {date} = req.body
    const {issuccess,status,message,transactions} = await services.stastics(date);
    if(issuccess){
      return res.status(status).json({issuccess,transactions})
    }
    return res.status(status).json({issuccess,message})
  }
};

module.exports = controller;
