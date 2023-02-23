const ProductController = require("../controllers/ProductController");
const ProductRoutes = require("express").Router();

ProductRoutes.post("/addNewProduct", ProductController.addNewProduct);
ProductRoutes.put("/updateProduct", ProductController.updateProduct);
ProductRoutes.delete("/deleteProduct/:id", ProductController.deleteProduct);
ProductRoutes.get("/getAllProducts", ProductController.getAllProducts);
ProductRoutes.get("/getProductById/:id", ProductController.getProductById);
ProductRoutes.get("/getProductByName", ProductController.getProductByname);

module.exports = ProductRoutes;
