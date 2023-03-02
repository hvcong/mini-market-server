const routes = require("express").Router();
const controller = require("../controllers/PromotionController");

routes.post("/add", controller.add);
routes.put("/update/:id", controller.update);
routes.delete("/delete/:id", controller.delete);
routes.get("/get", controller.getAll);

module.exports = routes;
