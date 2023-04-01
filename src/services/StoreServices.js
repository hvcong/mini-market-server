const { StoreTransaction, Product } = require("../config/persist");
const { onlyUpdateProduct } = require("../services/ProductServices");

const services = {
  add: async (data) => {
    try {
      const { quantity, createAt, type, productId, employeeId } = data;
      const transaction = await StoreTransaction.create({
        quantity,
        createAt,
        type,
        ProductId: productId,
        EmployeeId: employeeId,
      });
      const product = await Product.findByPk(productId);
      const qty = product.quantity;
      let newQty = qty + quantity;
      await onlyUpdateProduct(productId, { quantity: newQty });
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
        const { quantity, createAt, type, productId, employeeId } = e;
        const transaction = await StoreTransaction.create({
          quantity,
          createAt,
          type,
          ProductId: productId,
          EmployeeId: employeeId,
        });
        const product = await Product.findByPk(productId);
        const qty = product.quantity;
        let newQty = qty + quantity;
        await updateProduct(productId, { quantity: newQty });
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
        order: [["updatedAt", "DESC"]],
      });
      return { transactions, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};
module.exports = services;
