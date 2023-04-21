const {
  Customer,
  HomeAddress,
  Ward,
  District,
  City,
  TypeCustomer,
  Bill,
} = require("../config/persist");
const { Op } = require("sequelize");
const { uidNumber } = require("../utils/funcCommon");

const services = {
  add: async (data) => {
    try {
      const {
        id,
        firstName,
        lastName,
        phonenumber,
        homeAddressId,
        typeCustomerId = "BT",
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
        id,
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
      const { phonenumber } = data;
      var customer = await Customer.findOne({
        where: { phonenumber: phonenumber },
      });
      if (customer) {
        await customer.update(data);
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
        distinct: true,
      });
      return { customers, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getCustomerByPhonenumber: async (phonenumber) => {
    try {
      let customer = await Customer.findOne({
        where: { phonenumber },
        include: {
          model: Bill,
        },
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
  getCustomerById: async (id) => {
    try {
      const customer = await Customer.findByPk(id, {
        include: [
          {
            model: HomeAddress,
            include: [
              {
                model: Ward,
                include: [{ model: District, include: [{ model: City }] }],
              },
            ],
          },
        ],
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

  getOrCreateByPhone: async (phonenumber) => {
    try {
      let customer = await Customer.findOne({
        where: { phonenumber },
        include: [
          { model: Bill },
          {
            model: TypeCustomer,
          },
          {
            model: HomeAddress,
            include: [
              {
                model: Ward,
                include: [{ model: District, include: [{ model: City }] }],
              },
            ],
          },
        ],
      });
      if (customer) {
        return { customer, isSuccess: true, status: 200 };
      } else {
        let id = "KH" + uidNumber();
        let isExistId = true;
        while (isExistId) {
          customer = await Customer.findByPk(id);
          if (!customer) {
            isExistId = false;
          }
        }

        let newCustomer = await Customer.create({
          id,
          phonenumber,
          TypeCustomerId: "BT",
        });
        return { customer: newCustomer, isSuccess: true, status: 200 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  filter: async (query) => {
    const page = (query._page && Number(query._page)) || 1;
    const limit = (query._limit && Number(query._limit)) || 20;
    const offset = (page - 1) * limit;
    const { id, firstName, lastName, phonenumber } = query;    
    try {
      let customers = await Customer.findAndCountAll({
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
        distinct: true,
      });
      if (id && !firstName && !lastName && !phonenumber) {
        customers.rows = customers.rows.filter((e) => {
          if (e.id) {
            return e.id.startsWith(id);
          }
        });
        customers.count = customers.rows.length
      }
      if (!id && firstName && !lastName && !phonenumber) {
        customers.rows = customers.rows.filter((e) => {
          if (e.firstName) {
            return e.id.startsWith(firstName);
          }
        });
        customers.count = customers.rows.length
      }
      if (!id && firstName && lastName && !phonenumber) {
        customers.rows = customers.rows.filter((e) => {
          if (e.firstName&& e.lastName) {
            return e.firstName.startsWith(firstName)&& e.lastName.startsWith(lastName);
          }
        });
        customers.count = customers.rows.length
      }
      if (!id && firstName && !lastName && phonenumber) {
        customers.rows = customers.rows.filter((e) => {
          if (e.firstName&& e.phonenumber) {
            return e.firstName.startsWith(firstName)&& e.phonenumber.startsWith(phonenumber);
          }
        });
        customers.count = customers.rows.length
      }
      if (!id && !firstName && lastName && !phonenumber) {
        customers.rows = customers.rows.filter((e) => {
          if (e.lastName) {
            return e.id.startsWith(lastName);
          }
        });
        customers.count = customers.rows.length
      }
      if (!id && !firstName && lastName && phonenumber) {
        customers.rows = customers.rows.filter((e) => {
          if (e.lastName && e.phonenumber) {
            return e.id.startsWith(lastName) && e.phonenumber.startsWith(phonenumber);
          }
        });
        customers.count = customers.rows.length
      }
      if (!id && !firstName && !lastName && phonenumber) {
        customers.rows = customers.rows.filter((e) => {
          if (e.phonenumber) {
            return e.id.startsWith(phonenumber);
          }
        });
        customers.count = customers.rows.length
      }
      if (id && firstName && !lastName && !phonenumber) {
        customers.rows = customers.rows.filter((e) => {
          if (e.id && e.firstName)
            return e.id.startsWith(id) && e.firstName.startsWith(firstName);
        });
        customers.count = customers.rows.length
      }
      if (id && !firstName && lastName && !phonenumber) {
        customers.rows = customers.rows.filter((e) => {
          if (e.id && e.lastName)
            return e.id.startsWith(id) && e.lastName.startsWith(lastName);
        });
        customers.count = customers.rows.length
      }
      if (id && !firstName && !lastName && phonenumber) {
        customers.rows = customers.rows.filter((e) => {
          if (e.id && e.phonenumber)
            return e.id.startsWith(id) && e.phonenumber.startsWith(phonenumber);
        });
        customers.count = customers.rows.length
      }
      if (id && firstName && lastName && !phonenumber) {
        customers.rows = customers.rows.filter((e) => {
          if (e.id && e.firstName && e.lastName) {
            return (
              e.id.startsWith(id) &&
              e.firstName.startsWith(firstName) &&
              e.lastName.startsWith(lastName)
            );
          }
        });
        customers.count = customers.rows.length
      }
      if (id && firstName && lastName && phonenumber) {
        customers.rows = customers.rows.filter(
          (e) => {
            if(e.id && e.firstName && e.lastName && e.phonenumber) {
              return e.id.startsWith(id) &&
              e.firstName.startsWith(firstName) &&
              e.lastName.startsWith(lastName) &&
              e.phonenumber.startsWith(phonenumber)
            }
          }
        );
        customers.count = customers.rows.length
      }
      return { customers, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = services;
