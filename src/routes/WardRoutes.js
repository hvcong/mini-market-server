const routes = require("express").Router();
const controller = require("../controllers/WardController");

routes.post("/add", controller.add);
routes.put("/update", controller.update);
routes.get("/get", controller.get);
routes.get('/byDistrict',controller.getByDistrict)

module.exports = routes;
