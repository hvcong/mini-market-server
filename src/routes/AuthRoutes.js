const AuthControllers = require("../controllers/AuthController");
const AuthRoutes = require("express").Router();

AuthRoutes.post("/register", AuthControllers.register);
AuthRoutes.post("/login", AuthControllers.logIn);
AuthRoutes.post("/logout", AuthControllers.verifyToken, AuthControllers.logOut);

module.exports = AuthRoutes;
