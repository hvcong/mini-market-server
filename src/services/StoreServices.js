const { StoreTransaction, Product } = require("../config/persist");
const { updateProduct } = require("../services/ProductServices");

const services = {
  add: async (data) => {
    try {
      const { quantity, remainingQty, createAt, type, productId, employeeId } =
        data;
      const transaction = await StoreTransaction.create({
        quantity,
        remainingQty,
        createAt,
        type,
        ProductId: productId,
        EmployeeId: employeeId,
      });
      const product = await Product.findByPk(productId)
      const qty = product.quantity
      let newQty = qty+quantity
      const {isSuccess} = await updateProduct(productId,{quantity:newQty})
      return { transaction, isSuccess: true, status: 200 };
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
      });
      return { transactions, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};
module.exports = services;
