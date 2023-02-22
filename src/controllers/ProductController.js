const db = require("../config/persist");
const Product = db.Product;

const ProductController = {
  addNewProduct: async (req, res) => {
    try {
      const body = req.body;
      const check = await Product.findOne({ where: { id: req.body.id } });
      if (check) {
        return res
          .status(403)
          .json({ message: "this product already exists", result: false });
      } else {
        const product = await Product.create({
          id: body.id,
          name: body.name,
          quantity: body.quantity,
        });
        await product.createCategory({ name: body.category });
        return res.status(200).json(product);
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "something goes wrong", result: false });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const productID = req.params.id;
      const newData = req.body;
      const product = Product.findOne({ where: { id: productID } });
      if (!product) {
        return res
          .status(404)
          .json({ message: "product not found", result: fasle });
      } else {
        await product.update(newData);
        await product.save();
        return res.status(200).json({ resutl: "updated successfully" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "somthing goes wrong", result: false });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = Product.findOne({ where: { id: productId } });
      if (product) {
        await product.destroy();
        return res.status(200).json({ result: "deleted product" });
      } else {
        return res.status(404).json({ result: "product not found" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "something goes wrong", result: false });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const products = Product.findAll({ limit: 20 });
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "something goes wrong", result: false });
    }
  },
  getProductByname: async (req, res) => {
    try {
      const productName = req.body.name;
      const products = Product.findAll({
        where: { name: productName },
        limit: 20,
      });
      if (products) {
        return res.status(200).json(products);
      } else {
        return res.status(200).json({ result: "khong co san pham nao" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "something goes wrong", result: false });
    }
  },
  getProductById: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = Product.findOne({ where: { id: productId } });
      if (product) {
        return res.status(200).json(product);
      } else {
        return res.status(200).json({ result: "khong co san pham nao" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "something goes wrong", result: fasle });
    }
  },
  getProductByCategory: async (req, res) => {},
};

module.exports = ProductController;
