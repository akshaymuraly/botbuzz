const { TelegramBot } = require("../../../utils/TelegramBot");
const { v4 } = require("uuid");

const BOTS = [];

const botCreation = async (req, res, next) => {
  const { token, url, commands } = req.body;
  const unique_id = v4();
  const updated_url = url + `/api/getupdates/${unique_id}`;
  if (await TelegramBot.validateToken(token)) {
    const bot1 = new TelegramBot(token, unique_id, commands);
    await bot1.setCallBackUrl(updated_url);
    BOTS.push(bot1);
    console.log(BOTS);
    return res.json({ message: "Bot registered!" });
  }
  return res.json({ message: "Invalid token, check and try again!" });
};

const botUpdates = async (req, res, next) => {
  const newChat = req.body;
  if (BOTS.length === 0) {
    return res.status(400).send("No bots available");
  }
  const { botId } = req.params;
  for (let i = 0; i < BOTS.length; i++) {
    if (BOTS[i]._id === botId) {
      if (newChat.message.text in BOTS[i].commands) {
        await BOTS[i].sendMessage(
          BOTS[i].commands[newChat.message.text],
          newChat.message.message_id,
          newChat.message.chat.id
        );
      }
      break;
    }
  }
  console.log(newChat);
  return res.status(200).send("ok");
};

module.exports = {
  botCreation,
  botUpdates,
};
