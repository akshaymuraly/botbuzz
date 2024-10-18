const Router = require("express").Router();
const {
  botCreation,
  botUpdates,
} = require("../controllers/botController.controller");
const {
  cookieValidation,
} = require("../controllers/userController.controller");

Router.post("/newbot", cookieValidation, botCreation);
Router.post("/getupdates/:botId", botUpdates);

module.exports = Router;
