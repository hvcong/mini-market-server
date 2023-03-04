const { Customer } = require("../config/persist");

const services = {
  add: async (data) => {
    try {
      const { firstName, lastName, phonenumber } = data;
      var customer = await Customer.findOne({
        where: { phonenumber: phonenumber },
      });
      if (customer) {
        return {
          message: "this customer already exists",
          isSuccess: false,
          status: 403,
        };
      }
      customer = await Customer.create(data);
      return { customer, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (data) => {
    try {
      const { phonenumber, ...newData } = data;
      var customer = await Customer.findOne({
        where: { phonenumber: phonenumber },
      });
      if (customer) {
        await customer.update(newData);
        await customer.save();
        return { message: "updated successful", isSuccess: true, status: 200 };
      }
      return { message: "customer not exists", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  delete: async (phonenumber) => {
    try {
      var customer = await Customer.findOne({
        where: { phonenumber: phonenumber },
      });
      if (customer) {
        await customer.destroy();
        return { message: "deleted succesful", isSuccess: true, status: 200 };
      }
      return { message: "customer not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  get: async () => {
    try {
      const customers = await Customer.findAll({ limit: 50 });
      return { customers, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getCustomerByPhonenumber: async (phonenumber) => {
    try {
      const customer = await Customer.findOne({
        where: { phonenumber: phonenumber },
      });
      if (customer) {
        return { customer, isSuccess: true, status: 200 };
      }
      return { message: "customer not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = services;
