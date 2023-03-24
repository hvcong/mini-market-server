const {
  Bill,
  Employee,
  Customer,
} = require("../config/persist");
const {
  getCustomerByPhonenumber,
  add,
} = require("../services/CustomerServices");
const { createBillDetais } = require("../services/BillDetailServices");

const services = {
  add: async (data) => {
    try {
      const { cost, customerPhonenumber, EmployeeId, VoucherId, priceIds } =
        data;
      if (!customerPhonenumber && !EmployeeId) {
        return {
          message: "missing customerPhonenumber or employeeId",
          isSuccess: false,
          status: 400,
        };
      }
      let { customer } = await getCustomerByPhonenumber(customerPhonenumber);
      var billdetails = await createBillDetais(priceIds);
      const bill = await Bill.create({ cost, EmployeeId, VoucherId });
      if(customer){
        await bill.setCustomer(customer);
      }else{
        let {customer} = await add({phonenumber: customerPhonenumber})
        await bill.setCustomer(customer)
      }
      await bill.setBillDetails(billdetails);
      return { bill, isSuccess: true, status: 200 };
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
      const bills = await Bill.findAndCountAll({
        limit: limit,
        offset: offset,
        include: [
          {
            model: Customer,
          },
          {
            model: Employee,
          },
        ],
      });
      return { bills, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getById: async (query) =>{
    const id = query.id
    try {
      const bill = await Bill.findByPk(id)
      if(bill){
        return {bill,isSuccess: true, status: 200}
      }
      return {message: 'bill not found',isSuccess: false, status: 404}
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  }
};
module.exports = services;
