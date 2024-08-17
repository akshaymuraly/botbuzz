const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const ngrok = require("@ngrok/ngrok");
require("dotenv").config();
const { dbConnection } = require("./utils/MongooseConnection");

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// ----------DB CONNECTION-----------------

dbConnection();

// ----------Router------------------------

const botRoutes = require("./modules/user/routes/bot.route");

// ----------Routes------------------------

app.use("/api", botRoutes);

// ----------Server listening--------

app.listen(5000, () => {
  console.log("Listening...");
  (async function () {
    const listener = await ngrok.forward({
      addr: 5000,
      authtoken: "2keQPkfLHjwNt8yGxmQefDrkYyA_6icQ7XskDJ5PGK2akmA5t",
    });

    console.log(`Ingress established at: ${listener.url()}`);
  })();
});
