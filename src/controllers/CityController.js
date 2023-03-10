const services = require("../services/CityServices");

const controller = {
  add: async (req, res) => {
    const data = req.body;
    const result = await services.addCity(data);
    const { isSuccess, status, city, message } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, city });
    }
    return res.status(status).json({ isSuccess, message });
  },
  update: async (req, res) => {
    const id = req.query.id;
    const data = req.body;
    const result = await services.updateCity(id, data);
    const { isSuccess, message, status } = result;
    return res.status(status).json({ isSuccess, message });
  },
  get: async (req, res) => {
    const result = await services.getAll();
    const { isSuccess, status, cities, message } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, cities });
    }
    return res.status(status).json({ isSuccess, message });
  },
};
module.exports = controller;
