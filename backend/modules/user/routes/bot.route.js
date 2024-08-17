const Router = require("express").Router();
const {
  botCreation,
  botUpdates,
} = require("../controllers/botController.controller");

Router.post("/newbot", botCreation);
Router.post("/getupdates/:botId", botUpdates);

module.exports = Router;
