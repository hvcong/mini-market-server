const db = require("../config/persist");
const Product = db.Product;
const { getCategoryByName } = require("../services/CategoryServices");
const services = require("../services/ProductServices");

const ProductController = {
  addNewProduct: async (req, res) => {
    const data = req.body;
    const result = await services.addProduct(data);
    if (result) {
      return res.status(200).json(result);
    } else {
      const { message, isSuccess, status } = result;
      return res.status(status).json({ message, isSuccess });
    }
  },
  updateProduct: async (req, res) => {
    const productID = req.params.id;
    const newData = req.body;
    const result = await services.updateProduct(productID, newData);
    const { message, isSuccess, status } = result;
    return res.status(status).json({ message, isSuccess });
  },
  deleteProduct: async (req, res) => {
    const productId = req.params.id;
    const result = await services.deleteProduct(productId);
    const { message, isSuccess, status } = result;
    return res.status(status).json({ message, isSuccess });
  },
  getAllProducts: async (req, res) => {
    const result = await services.getAllProducts();
    const { isSuccess } = result;
    if (isSuccess) {
      const { products, status } = result;
      return res.status(status).json(products);
    } else {
      const { message, status } = result;
      return res.status(status).json({ message, isSuccess });
    }
  },
  getProductByname: async (req, res) => {
    const productName = req.body.name;
    productName.trim();
    const result = await services.getProductByName(productName);
    const { isSuccess, status } = result;
    if (isSuccess) {
      const { products } = result;
      return res.status(status).json({isSuccess, products});
    } else {
      const { message } = result;
      return res.status(status).json({message, isSuccess});
    }
  },
  getProductById: async (req, res) => {
    const productId = req.params.id;
    const result = await services.getProductById(productId);
    const { isSuccess, status } = result;
    if (isSuccess) {
      const { product } = result;
      return res.status(status).json({isSuccess, product});
    } else {
      const { message } = result;
      return res.status(status).json({message, isSuccess});
    }
  },
  getProductByCate: async(req,res) =>{
    const cate = req.body
    const result = await services.getProductByCategory(cate)
    const {isSuccess,status}  = result
    if(isSuccess){
      const {products} = result
      return res.status(status).json({isSuccess,products})
    }
    const {message} = result
    return res.status(status).json({message,isSuccess}) 
  }
};

module.exports = ProductController;
