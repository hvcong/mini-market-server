const services = require("../services/DistrictServices");

const controller = {
  add: async (req, res) => {
    const data = req.body;
    const result = await services.addDitrict(data);
    const { isSuccess, status, district, message } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, district });
    }
    return res.status(status).json({ isSuccess, message });
  },
  update: async (req, res) => {
    const id = req.query.id;
    const data = req.body;
    const result = await services.updateDistrict(id, data);
    const { isSuccess, message, status } = result;
    return res.status(status).json({ isSuccess, message });
  },
  get: async (req, res) => {
    const result = await services.getAll();
    const { isSuccess, status, districts, message } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, districts });
    }
    return res.status(status).json({ isSuccess, message });
  },
};
module.exports = controller;
