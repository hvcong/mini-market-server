const { Customer } = require("../config/persist");
const services = require("../services/CustomerServices");

const Controller = {
  add: async (req, res) => {
    const data = req.body;
    const result = await services.add(data);
    const { isSuccess, status, customer, message } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, customer });
    }
    return res.status(status).json({ isSuccess, message });
  },
  update: async (req, res) => {
    const data = req.body;
    const result = await services.update(data);
    const { message, isSuccess, status } = result;
    return res.status(status).json({ isSuccess, message });
  },
  delete: async (req, res) => {
    const phonenumber = req.params.phonenumber;
    const result = await services.delete(phonenumber);
    const { isSuccess, status, message } = result;
    return res.status(status).json({ isSuccess, message });
  },
  get: async (req, res) => {
    const result = await services.get();
    const { isSuccess, message, status, customers } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, customers });
    }
    return res.status(status).json({ isSuccess, message });
  },
  getUserByPhonenumber: async (req, res) => {
    const phonenumber = req.params.phonenumber;
    const result = await services.getCustomerByPhonenumber(phonenumber);
    const { isSuccess, status, message, customer } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, customer });
    }
    return res.status(status).json({ isSuccess, message });
  },
  getUserByName: async (req, res) => {
    try {
      const username = req.body.username;
      const userByName = await Customer.findAll({ where: {} });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "somgthing goes wrong", result: false });
    }
  },
};
module.exports = Controller;
