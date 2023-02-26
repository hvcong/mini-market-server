const db = require("../config/persist");
const Product = db.Product;

const ProductServices = {
  getProductById: async (id) => {
    console.log(id)
    const product = await Product.findOne({ where: { id: id } });
    if (product) {
      return product;
    } else {
      return false;
    }
  },
  getProductByName: async (proName) => {
    const pro = await Product.findOne({ where: { name: proName } });
    if (!pro) {
      return false;
    } else {
      return pro;
    }
  },
};

module.exports = ProductServices;
