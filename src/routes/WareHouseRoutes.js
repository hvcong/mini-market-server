const routes = require("express").Router();

const controller = require("../controllers/WareHouseController");
routes.post("/add", controller.add);
routes.post("/addMany", controller.addMany);
routes.get("/get", controller.get);
routes.get('/one',controller.getOne)

module.exports = routes;
