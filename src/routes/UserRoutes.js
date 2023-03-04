const UserRoutes = require("express").Router();
const UserController = require("../controllers/UserController");

UserRoutes.post("/add", UserController.addNewUser);
UserRoutes.put("/update/:id", UserController.updateUser);
UserRoutes.delete("/delete/:id", UserController.deleteUser);
UserRoutes.get("/get", UserController.getAllUsers);
UserRoutes.get("/get", UserController.getUserByPhonenumber);
UserRoutes.get("/get", UserController.getUserByName);

module.exports = UserRoutes;
