const Router = require("express").Router();
const {
  userSignup,
  userLogin,
  getAllBots,
  cookieValidation,
} = require("../controllers/userController.controller");

Router.post("/signup", userSignup);
Router.post("/login", userLogin);
Router.get("/getbots", cookieValidation, getAllBots);

module.exports = Router;
