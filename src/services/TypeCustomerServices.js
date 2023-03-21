const { TypeCustomer } = require("../config/persist");

const services = {
  create: async (data) => {
    try {
      const { id } = data;
      let typeCustomer = await TypeCustomer.findOne({ where: { id: id } });
      if (typeCustomer) {
        return {
          message: "TypeCustomer already exists",
          isSuccess: false,
          status: 403,
        };
      }
      typeCustomer = await TypeCustomer.create(data);
      return { typeCustomer, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (data) => {
    const { id, ...newData } = data;
    try {
      const typeCustomer = await TypeCustomer.findByPk(id);
      if (typeCustomer) {
        await typeCustomer.update(newData);
        await typeCustomer.save();
        return { message: "updated successful", isSuccess: true, status: 200 };
      }
      return {
        message: "typeCustomer not found, update failed",
        isSuccess: false,
        status: 400,
      };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  get: async () => {
    try {
      const typeCustomers = await TypeCustomer.findAll();
      if (typeCustomers.length) {
        return { typeCustomers, isSuccess: true, status: 200 };
      }
      return {
        message: "typeCustomer not found",
        isSuccess: false,
        status: 400,
      };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getOne: async(query) =>{
    try {
      const {id} = query
      const typeCustomer = await TypeCustomer.findByPk(id)
      if(typeCustomer){
        return {typeCustomer,isSuccess: true, status: 200}
      }
      return {message: 'type customer not found',isSuccess: false, status: 404}
    } catch (error) {
      console.log(error)
      return {message: 'something went wrong',isSuccess: false, status:500}
    }
  }
};

module.exports = services;
