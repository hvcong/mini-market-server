const AuthControllers = require("../controllers/AuthController");
const routes = require("express").Router();

routes.post("/register", AuthControllers.register);
routes.post("/login", AuthControllers.logIn);
routes.post("/logout", AuthControllers.verifyToken, AuthControllers.logOut);

module.exports = routes;
