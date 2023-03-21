const routes = require("express").Router();
const controller = require("../controllers/DistrictController");

routes.post("/add", controller.add);
routes.put("/update", controller.update);
routes.get("/get", controller.get);
routes.get("/byCity",controller.getByCity)

module.exports = routes;
