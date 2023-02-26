const db = require("../config/persist");
const { compareDate, toString } = require("./TimeServices");
const { getProductById, getProductByName } = require("./ProductServices");
const ProductLine = db.ProductLine;
const Product = db.Product;

const ProductLineServices = {
  addProductLine: async (data) => {
    try {
      const expirationString = data.expirationDate;
      const { id, productId, quantity } = data;

      if (!id || !expirationString || !productId || !quantity) {
        return { message: "missed data value", isSuccess: false };
      }
      const expirationDate = new Date(expirationString);
      const check = await ProductLine.findOne({ where: { id: id } });
      if (!check) {
        const proLine = await ProductLine.create({
          id,
          expirationDate,
          quantity,
        });
        const prod = await getProductById(productId);
        await proLine.setProduct(prod);
        return proLine;
      } else {
        const now = toString(new Date());
        const pre = toString(check.dateOfManufature);
        if (now === pre) {
          const newQty = check.quantity + quantity;
          check.update({ quantity: newQty });
          check.save();
          return check;
        } else {
          const proLine = await ProductLine.create({
            id,
            expirationDate,
            quantity,
          });
          return proLine;
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  updateProductLine: async (id, data) => {
    try {
      const proLine = await this.getProductLineById(id);
      if (!proLine) {
        return false;
      }
      await proLine.update(data);
      await proLine.save();
      return proLine;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  deleteProductLine: async (id) => {
    try {
      const proLine = await this.getProductById(id);
      if (!proLine) {
        return false;
      }
      await proLine.destroy();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getProductLineByCategory: async (cateName) => {
    try {
      const prodLines = await ProductLine.findAll({
        limit: 20,
        include: {
          model: Product,
          include: { model: db.Category, where: { name: cateName } },
        },
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getProductLineByName: async (proName) => {
    try {
      const prodLines = await ProductLine.findAll({
        limit: 20,
        where: { name: proName },
        include: { model: Product },
      });
      return prodLines;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getProductLineById: async (id) => {
    try {
      const proLine = await ProductLine.findOne({
        where: { id: id },
        include: { model: Product },
      });
      if (!proLine) {
        return false;
      }
      return proLine;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

module.exports = ProductLineServices;
