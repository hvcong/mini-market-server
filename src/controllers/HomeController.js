const services = require("../services/HomeAddressServices");

const controller = {
  add: async (req, res) => {
    const data = req.body;
    const result = await services.add(data);
    const { isSuccess, status, home, message } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, home });
    }
    return res.status(status).json({ isSuccess, message });
  },
  update: async (req, res) => {
    const id = req.query.id;
    const data = req.body;
    const result = await services.update(id, data);
    const { isSuccess, message, status } = result;
    return res.status(status).json({ isSuccess, message });
  },
  get: async (req, res) => {
    const {query} = req
    const id = query.id
    const result = await services.getOne(id);
    const { isSuccess, status, homeAddress, message } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, homeAddress });
    }
    return res.status(status).json({ isSuccess, message });
  },
};
module.exports = controller;
