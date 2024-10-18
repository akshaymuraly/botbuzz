const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const ngrok = require("@ngrok/ngrok");
require("dotenv").config();
const { dbConnection } = require("./utils/MongooseConnection");
const ErrorHandler = require("./utils/ErrorHandler");

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// ----------DB CONNECTION-----------------

dbConnection();

// ----------Router------------------------

const botRouter = require("./modules/user/routes/bot.route");
const userRouter = require("./modules/user/routes/user.route");

// ----------Routes------------------------

app.use("/api/bot", botRouter);
app.use("/api/user", userRouter);

// ----------ERROR HANDLER MIDDLEWARE-----------

app.use(ErrorHandler);

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
