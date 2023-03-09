const services = require('../services/DiscountProductServices')

const Controller = {
    add: async (req, res) => {
      const data = req.body;
      const result = await services.add(data);
      const { isSuccess, status, discountProduct, message } = result;
      if (isSuccess) {
        return res.status(status).json({ isSuccess, discountProduct });
      } else {
        return res.status(status).json({ message, isSuccess });
      }
    },
    update: async (req, res) => {
      const id = req.params.id;
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
        const query = req.query
      const result = await services.get(query);
      const { isSuccess, status, discountProducts, message } = result;
      if (isSuccess) {
        return res.status(status).json({ isSuccess, discountProducts });
      } else {
        return res.status(status).json({ message, isSuccess });
      }
    },
  };
  module.exports = Controller;