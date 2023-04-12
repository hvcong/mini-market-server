const services = require("../services/EmployeeServices");
const controller = {
  add: async (req, res) => {
    const data = req.body;
    const result = await services.createEmployee(data);
    const { isSuccess, employee, message, status } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, employee });
    }
    return res.status(status).json({ isSuccess, message });
  },
  getByPhone: async (req, res) => {
    const phonenumber = req.query.phonenumber;
    const result = await services.getByPhonenumber(phonenumber);
    const { isSuccess, status, employee, message } = result;
    if (isSuccess) {
      return res.status(status).json({ isSuccess, employee });
    }
    return res.status(status).json({ isSuccess, message });
  },
  get: async (req, res) => {
    const { query } = req;
    const { isSuccess, status, employees, message } = await services.get(query);
    if (isSuccess) {
      return res.status(status).json({ isSuccess, employees });
    }
    return res.status(status).json({ isSuccess, message });
  },
  update: async (req, res) => {
    const data = req.body;
    const { isSuccess, message, status } = await services.update(data);
    if (isSuccess) {
      return res.status(status).json({ isSuccess, message });
    }
    return res.status(status).json({ isSuccess, message });
  },
  updateFullInfoByPhone: async (req, res) => {
    console.log("here");
    const phonenumber = req.query.phonenumber;
    const data = req.body;
    const { isSuccess, message, status } = await services.updateFullInfoByPhone(
      phonenumber,
      data
    );
    if (isSuccess) {
      return res.status(status).json({ isSuccess, message });
    }
    return res.status(status).json({ isSuccess, message });
  },
  getOnebyPhone: async (req, res) => {
    const { query } = req;
    const phonenumber = query.phonenumber;
    const { isSuccess, status, employee, message } =
      await services.getOneByPhone(phonenumber);
    if (isSuccess) {
      return res.status(status).json({ isSuccess, employee });
    }
    return res.status(status).json({ isSuccess, message });
  },

  getOneById: async (req, res) => {
    const { query } = req;
    const id = query.id;
    const { isSuccess, status, employee, message } = await services.getOneById(
      id
    );
    if (isSuccess) {
      return res.status(status).json({ isSuccess, employee });
    }
    return res.status(status).json({ isSuccess, message });
  },
};
module.exports = controller;
