const { Bill, Employee, Voucher, BillDetail, Customer } = require("../config/persist");
const { getCustomerByPhonenumber,add } = require("../services/CustomerServices");
const { create } = require("../services/AccountServices");
const { createBillDetais } = require("../services/BillDetailServices");

const services = {
  add: async (data) => {
    try {
      const { cost, customerPhonenumber, employeeId, voucherId, priceIds } =
        data;
        console.log(data)
      if (!customerPhonenumber && !employeeId) {
        return {
          message: "missing customerPhonenumber or employeeId",
          isSuccess: false,
          status: 400,
        };
      }
      var { customer } = await getCustomerByPhonenumber(customerPhonenumber);
      if (!customer) {
        await create(customerPhonenumber);
        customer = await add({phonenumber: customerPhonenumber})
      }
      console.log(customer)
      const employee = await Employee.findByPk(employeeId);
      var billdetails = await createBillDetais(priceIds);
      var voucher = null;
      if (voucherId) {
        voucher = await Voucher.findOne({ where: { id: voucherId } });
      }
      const bill = await Bill.create({ cost });
      await bill.setCustomer(customer);
      await bill.setEmployee(employee);
      await bill.setBillDetails(billdetails);
      await bill.setVoucher(voucher);
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
                model: Customer
            },
            {
                model: Employee
            }
        ]
      });
      return {bills, isSuccess: true, status: 200}
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};
module.exports = services;
