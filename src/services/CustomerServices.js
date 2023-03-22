const {
  Customer,
  HomeAddress,
  Ward,
  District,
  City,
  TypeCustomer,
} = require("../config/persist");
const { Op } = require("sequelize");

const services = {
  add: async (data) => {
    try {
      const {
        firstName,
        lastName,
        phonenumber,
        homeAddressId,
        typeCustomerId,
        email,
      } = data;
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
      customer = await Customer.create({
        firstName,
        lastName,
        phonenumber,
        HomeAddressId: homeAddressId,
        TypeCustomerId: typeCustomerId,
        email,
      });
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
  get: async (query) => {
    const page = (query._page && Number(query._page)) || 1;
    const limit = (query._limit && Number(query._limit)) || 20;
    const offset = (page - 1) * limit;
    try {
      const customers = await Customer.findAndCountAll({
        limit: limit,
        offset: offset,
        include: [
          {
            model: HomeAddress,
            include: [
              {
                model: Ward,
                include: [
                  {
                    model: District,
                    include: [
                      {
                        model: City,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: TypeCustomer,
          },
        ],
      });
      return { customers, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getCustomerByPhonenumber: async (phonenumber) => {
    try {
      const customer = await Customer.findOne({
        where: { phonenumber },
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
  getLikePhone: async (phonenumber) => {
    try {
      const customers = await Customer.findAll({
        where: { phonenumber: { [Op.like]: `%${phonenumber}%` } },
      });
      if (customers.length) {
        return { customers, isSuccess: true, status: 200 };
      }
      return { message: "customer not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = services;
