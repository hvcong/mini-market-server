const { getCategoryByName } = require("../services/CategoryServices");
const services = require("../services/ProductServices");

const ProductController = {
  addNewProduct: async (req, res) => {
    const data = req.body;
    const result = await services.addProduct(data);
    const {isSuccess,message,status,product} = result
    if (isSuccess) {
      return res.status(status).json(product);
    } else {
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
    const productId = req.query.id;
    const result = await services.deleteProduct(productId);
    const { message, isSuccess, status } = result;
    return res.status(status).json({ message, isSuccess });
  },
  getAllProducts: async (req, res) => {
    const query = req.query
    const result = await services.getAllProducts(query);
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
    const productName = req.query.name;
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
    const productId = req.query.id;
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
    const cate = req.query.subId
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
