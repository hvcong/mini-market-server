const UserRoutes = require("express").Router();
const UserController = require("../controllers/UserController");

UserRoutes.post("/addUser", UserController.addNewUser);
UserRoutes.put("/updateUser/:id", UserController.updateUser);
UserRoutes.delete("/deleteUser/:id", UserController.deleteUser);
UserRoutes.get("/getAllUsers", UserController.getAllUsers);
UserRoutes.get("/getUserByPhonenumber", UserController.getUserByPhonenumber);
UserRoutes.get("/getUserByName", UserController.getUserByName);

module.exports = UserRoutes;
