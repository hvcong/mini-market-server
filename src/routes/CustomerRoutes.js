const routes = require("express").Router();
const controller = require("../controllers/CustomerController");

routes.post("/add", controller.add);
routes.put("/update", controller.update);
routes.delete("/delete/:phonenumber", controller.delete);
routes.get("/get", controller.get);
routes.get("/getPhone", controller.getUserByPhonenumber);
routes.get("/getName", controller.getUserByName);

module.exports = routes;
