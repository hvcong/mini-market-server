const services = require("../services/InputServices");

const controller = {
  add: async (req, res) => {
    const data = req.body;
    const { isSuccess, status, message, input } = await services.add(data);
    if (isSuccess) {
      return res.status(status).json({ isSuccess, input });
    }
    return res.status(status).json({ isSuccess, message });
  },
  get: async (req, res) => {
    const query = req.query;
    const { isSuccess, status, message, inputs } = await services.get(query);
    if (isSuccess) {
      return res.status(status).json({ isSuccess, inputs });
    }
    return res.status(status).json({ isSuccess, message });
  },
  getOne: async (req, res) => {
    const id = req.query.id;
    const { isSuccess, status, message, input } = await services.getOne(id);
    if (isSuccess) {
      return res.status(status).json({ isSuccess, input });
    }
    return res.status(status).json({ isSuccess, message });
  },
  update: async(req,res) =>{    
    const data = req.body
    const {isSuccess,message,status} = await services.update(data)
    return res.status(status).json({isSuccess,message})
  }
};

module.exports = controller;
