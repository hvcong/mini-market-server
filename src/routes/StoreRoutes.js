const routes = require("express").Router();

const controller = require("../controllers/StoreController");
routes.post("/add", controller.add);
routes.post("/addMany", controller.addMany);
routes.get("/get", controller.get);
routes.post('/stastics',controller.stastics)

module.exports = routes;
