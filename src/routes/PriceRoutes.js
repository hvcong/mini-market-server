const routes = require("express").Router();
const controller = require("../controllers/PriceController");

routes.post("/add", controller.addPrice);
routes.put("/update", controller.updatePrice);
routes.delete("/delete", controller.deletePrice);
routes.get('/get',controller.getProductLine)
module.exports = routes;
