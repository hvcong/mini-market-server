const routes = require("express").Router();
const controller = require("../controllers/PromotionController");

routes.post("/add", controller.add);
routes.put("/update", controller.update);
routes.delete("/delete", controller.delete);
routes.get("/get", controller.getAll);
routes.get('/getId',controller.getOne)

module.exports = routes;
