const routes = require("express").Router();
const controller = require("../controllers/PriceController");

routes.post("/add", controller.addPrice);
routes.put("/update", controller.updatePrice);
routes.delete("/delete", controller.deletePrice);
routes.get("/get", controller.getProductLine);
routes.get("/getProductId", controller.getPriceByProductId);
routes.get("/getPriceHeader", controller.getByPriceHeader);
routes.get("/query", controller.rawQuery);
routes.get("/proUnitId", controller.getByProducUnitTypeId);
routes.get("/getName", controller.getByName);
routes.get("/priceId", controller.getProductByPriceId);

module.exports = routes;
