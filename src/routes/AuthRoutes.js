const AuthControllers = require("../controllers/AuthController");
const AuthRoutes = require("express").Router();

AuthRoutes.post("/create", AuthControllers.create);
AuthRoutes.post("/login", AuthControllers.logIn);
AuthRoutes.post("/logout", AuthControllers.verifyToken, AuthControllers.logOut);

module.exports = AuthRoutes;
