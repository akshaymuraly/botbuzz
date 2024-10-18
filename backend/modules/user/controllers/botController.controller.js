const { TelegramBot } = require("../../../utils/TelegramBot");
const { v4 } = require("uuid");
const Bot = require("../models/bot.model");
const AsyncHandler = require("../../../utils/AsyncHandler");
const { CustomError } = require("../../../utils/CustomError");

const BOTS = [];

const botCreation = AsyncHandler(async (req, res, next) => {
  const { token, url, commands, Bot_Name } = req.body;
  if (!token || !url || !commands || !Bot_Name) {
    throw new CustomError("No field can be empty!", 400);
  }
  const bot = await Bot.findOne({ Access_Token: token });
  if (bot) {
    throw new CustomError(
      "Bot already registered, with associated token!",
      400
    );
  } //should change for now
  const unique_id = v4();
  const updated_url = url + `/api/bot/getupdates/${unique_id}`;
  if (await TelegramBot.validateToken(token)) {
    const bot1 = new TelegramBot(token, unique_id, commands);
    await bot1.setCallBackUrl(updated_url);
    const newBot = new Bot({
      Bot_Name,
      Access_Token: token,
      Callback_URL: updated_url,
      Commands: commands,
      Created_By: req.id,
    });
    await newBot.save();
    BOTS.push(bot1);
    console.log(BOTS);
    return res.json({ message: "Bot registered!" });
  }
  return res.json({ message: "Invalid token, check and try again!" });
});

const botUpdates = AsyncHandler(async (req, res, next) => {
  const current_url = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log(current_url);
  const newChat = req.body;
  const { botId } = req.params;
  if (BOTS.length === 0) {
    const bot = await Bot.findOne({ Callback_URL: current_url });
    // creating new telegram bot object if the array got updated for some reason
    if (bot) {
      const registerBot = new TelegramBot(
        bot.Access_Token,
        bot.Callback_URL,
        bot.Commands
      );
      await registerBot.setCallBackUrl(bot.Callback_URL);
      if (newChat.message.text in registerBot.commands) {
        await registerBot.sendMessage(
          registerBot.commands[newChat.message.text],
          newChat.message.message_id,
          newChat.message.chat.id
        );
      }
      return res.status(200).send("ok");
    }
    return res.status(400).send("No bots available");
  }
  // Working with the existing telegram bot object
  for (const bot of BOTS) {
    if (bot._id === botId) {
      // Check if message text is a command
      if (newChat.message.text in bot.commands) {
        await bot.sendMessage(
          bot.commands[newChat.message.text],
          newChat.message.message_id,
          newChat.message.chat.id
        );
      }
      return res.status(200).send("ok");
    }
  }
  // console.log(newChat);
  return res.status(400).send("negative");
});

module.exports = {
  botCreation,
  botUpdates,
};
