const services = require("../services/GiftProductServices");
const Controller = {
  add: async (req, res) => {
    const data = req.body;
    const result = await services.add(data);
    const { isSuccess, status, gift, message } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, gift });
    } else {
      return res.status(status).json({ message, isSuccess });
    }
  },
  update: async (req, res) => {
    const id = req.query.id;
    const data = req.body;
    const result = await services.update(id, data);
    const { isSuccess, status, message } = result;
    return res.status(status).json({ message, isSuccess });
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const result = await services.delete(id);
    const { isSuccess, status, message } = result;
    return res.status(status).json({ message, isSuccess });
  },
  get: async (req, res) => {
    const result = await services.get();
    const { isSuccess, status, gifts, message } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, gifts });
    } else {
      return res.status(status).json({ message, isSuccess });
    }
  },
};
module.exports = Controller;
