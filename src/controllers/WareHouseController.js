const services = require("../services/WareHouseServices");

const controller = {
  add: async (req, res) => {
    const data = req.body;
    const result = await services.add(data);
    const { isSuccess, status, message, ticket } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, ticket });
    }
    return res.status(status).json({ isSuccess, message });
  },
  get: async (req, res) => {
    const query = req.query;
    const { isSuccess, status, message, tickets } = await services.get(query);
    if (isSuccess) {
      return res.status(status).json({ isSuccess, tickets });
    }
    return res.status(status).json({ isSuccess, message });
  },
  addMany: async (req, res) => {
    const data = req.body.data;
    const { isSuccess, status, message, tickets } = await services.addMany(
      data
    );
    if (isSuccess) {
      return res.status(status).json({ isSuccess, tickets });
    }
    return res.status(status).json({ isSuccess, message });
  },
  getOne: async (req, res) => {
    const id = req.query.id
    const {isSuccess,status,message,ticket} = await services.getOne(id)
    if(isSuccess){
        return res.status(status).json({isSuccess,ticket})
    }
    return res.status(status).json({isSuccess,message})
  },
};

module.exports = controller;
