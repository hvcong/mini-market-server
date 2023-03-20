const { Employee } = require("../config/persist");
const { Op } = require("sequelize");
const services = {
  createEmployee: async (data) => {
    try {
      const { phonenumber } = data;
      var employee = await Employee.findOne({
        where: { phonenumber: phonenumber },
      });
      if (employee) {
        return {
          message: "employee already exists",
          isSuccess: false,
          status: 403,
        };
      }
      employee = await Employee.create(data);
      return { employee, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getByPhonenumber: async (phonenumber) => {
    try {
      const employees = await Employee.findAll({
        where: { phonenumber: { [Op.like]: `%${phonenumber}%` } },
      });
      if (employees.length) {
        return { employees, isSuccess: true, status: 200 };
      }
      return { message: "employee not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  get: async (query) => {
    const page = (query._page && Number(query._page)) || 1;
    const limit = (query._limit && Number(query._limit)) || 20;
    const offset = (page - 1) * limit;
    try {
      const employees = await Employee.findAndCountAll({
        limit: limit,
        offset: offset,
      });
      return { employees, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (data) => {
    try {
      const { name, phonenumber } = data;
      const employee = await Employee.findOne({
        where: { phonenumber: phonenumber },
      });
      if (employee) {
        await employee.update({ name });
        await employee.save();
        return { message: "updated succesful", isSuccess: true, status: 200 };
      }
      return {message: 'update failed',isSuccess: false, status: 400}
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};
module.exports = services;
