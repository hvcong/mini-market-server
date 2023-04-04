const { StoreTransaction } = require("../config/persist");
const { onlyUpdateProduct } = require("./ProductServices");
const { getProduct, getUnitType } = require("./ProductUnitTypeServices");

const services = {
  add: async (data) => {
    try {
      const { quantity, type, ProductUnitTypeId, employeeId } = data;
      const transaction = await StoreTransaction.create({
        quantity,        
        type,
        ProductUnitTypeId,
        EmployeeId: employeeId,
      });
      const unitType = await getUnitType(ProductUnitTypeId);
      const product = await getProduct(ProductUnitTypeId);
      const qty = product.quantity;
      let newQty = qty + quantity * unitType.convertionQuantity;
      await onlyUpdateProduct(product.id, { quantity: newQty });
      return { transaction, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  addMany: async (data) => {
    try {
      const transactions = [];
      for (const e of data) {
        const { quantity, createAt, type, ProductUnitTypeId, employeeId } = e;
        const transaction = await StoreTransaction.create({
          quantity,
          createAt,
          type,
          ProductUnitTypeId,
          EmployeeId: employeeId,
        });
        const unitType = await getUnitType(ProductUnitTypeId);
        const product = await getProduct(ProductUnitTypeId);
        const qty = product.quantity;
        let newQty = qty + quantity * unitType.convertionQuantity;
        await onlyUpdateProduct(product.id, { quantity: newQty });
        transactions.push(transaction);
      }
      return { transactions, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  get: async (query) => {
    try {
      const page = (query._page && Number(query._page)) || 1;
      const limit = (query._limit && Number(query._limit)) || 20;
      var offset = (page - 1) * limit;
      const transactions = await StoreTransaction.findAndCountAll({
        limit: limit,
        offset: offset,
        distinct: true,
        order: [["createAt", "DESC"]],
      });
      return { transactions, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};
module.exports = services;
