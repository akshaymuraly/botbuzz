const mongoose = require("mongoose");

const botSchema = mongoose.Schema({
  Bot_Name: {
    type: String,
    require: true,
  },
  Access_Token: {
    type: String,
    require: true,
  },
  Callback_URL: {
    type: String,
    require: true,
  },
  Commands: {
    type: Object,
    require: true,
  },
  Created_By: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("bot", botSchema);
