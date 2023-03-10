const services = require("../services/WardServices");

const controller = {
  add: async (req, res) => {
    const data = req.body;
    const result = await services.addWard(data);
    const { isSuccess, status, ward, message } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, ward });
    }
    return res.status(status).json({ isSuccess, message });
  },
  update: async (req, res) => {
    const id = req.query.id;
    const data = req.body;
    const result = await services.updateWard(id, data);
    const { isSuccess, message, status } = result;
    return res.status(status).json({ isSuccess, message });
  },
  get: async (req, res) => {
    const result = await services.getAll();
    const { isSuccess, status, wards, message } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, wards });
    }
    return res.status(status).json({ isSuccess, message });
  },
};
module.exports = controller;
