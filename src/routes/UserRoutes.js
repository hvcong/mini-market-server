const routes = require("express").Router();
const UserController = require("../controllers/UserController");

routes.post("/addUser", UserController.addNewUser);
routes.put("/updateUser/:id", UserController.updateUser);
routes.delete("/deleteUser/:id", UserController.deleteUser);
routes.get("/getAllUsers", UserController.getAllUsers);
routes.get("/getUserByPhonenumber", UserController.getUserByPhonenumber);
routes.get("/getUserByName", UserController.getUserByName);

module.exports = routes;
