const routes = require("express").Router();
const controller = require("../controllers/ProductPromotionController");

routes.post("/add", controller.add);
routes.put("/update", controller.update);
routes.delete("/delete", controller.delete);
routes.get("/get", controller.get);

module.exports = routes;
