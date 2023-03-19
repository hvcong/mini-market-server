const { Bill, Employee, Voucher, BillDetail } = require("../config/persist");
const { getCustomerByPhonenumber } = require("../services/CustomerServices");
const { create } = require("../services/AccountServices");
const { createBillDetais } = require("../services/BillDetailServices");

const services = {
  add: async (data) => {
    try {
      const { cost, customerPhonenumber, employeeId, voucherId, priceIds } =
        data;
      if (!customerPhonenumber && !employeeId) {
        return {
          message: "missing customerPhonenumber or employeeId",
          isSuccess: false,
          status: 400,
        };
      }
      var { customer } = await getCustomerByPhonenumber(customerPhonenumber);

      if (!customer) {
        customer = await create(customerPhonenumber);
      }
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
};
module.exports = services;
