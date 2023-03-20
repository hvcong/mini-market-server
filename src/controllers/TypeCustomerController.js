const services = require("../services/TypeCustomerServices");

const controller = {
  create: async (req, res) => {
    const data = req.body;
    const { isSuccess, status, message, typeCustomer } = await services.create(
      data
    );
    if (isSuccess) {
      return res.status(status).json({ isSuccess, typeCustomer });
    }
    return res.status(status).json({ isSuccess, message });
  },
  update: async (req, res) => {
    const data = req.body;
    const { isSuccess, status, message } = await services.update(data);
    return res.status(status).json({ isSuccess, message });
  },
  get: async (req, res) => {
    const { isSuccess, status, message, typeCustomers } = await services.get();
    if (isSuccess) {
      return res.status(status).json({ isSuccess, typeCustomers });
    }
    return res.status(status).json({ isSuccess, message });
  },
};

module.exports = controller