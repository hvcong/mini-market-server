const ProductController = require("../controllers/ProductController");
const routes = require("express").Router();

routes.post("/addNewProduct", ProductController.addNewProduct);
routes.put("/updateProduct", ProductController.updateProduct);
routes.delete("/deleteProduct/:id", ProductController.deleteProduct);
routes.get("/getAllProducts", ProductController.getAllProducts);
routes.get("/getProductById/:id", ProductController.getProductById);
routes.get("/getProductByName", ProductController.getProductByname);

module.exports = routes;
