const routes = require("express").Router();
const controller = require("../controllers/PriceController");

routes.post("/addPrice", controller.addPrice);
routes.put("/updatePrice", controller.updatePrice);
routes.delete("/deletePrice/:pid/:uid", controller.deletePrice);
routes.get('/get',controller.getProductLine)
module.exports = routes;
