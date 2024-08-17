const mongoose = require("mongoose");

function dbConnection() {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
      console.log("DB connected!");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  dbConnection,
};
