const axios = require("axios");

class TelegramBot {
  static BASE_TELEGRAM_API_URL =
    "https://api.telegram.org/bot<token>/METHOD_NAME";

  //--------CONSTRUCTOR FUNCTION------------------------------------

  constructor(token, id, commands) {
    this.token = token;
    this._id = id;
    this.commands = commands;
  }

  //--------HELPER FUNCTIONS-----------------------------------------

  #_urlAlter(method_name) {
    return TelegramBot.BASE_TELEGRAM_API_URL.replace(
      "<token>",
      this.token
    ).replace("METHOD_NAME", method_name);
  }

  //--------CLASS SPECIFIC METHODS------------------------------------

  static async validateToken(token) {
    try {
      const response = await axios.get(
        `https://api.telegram.org/bot${token}/getMe`
      );
      return response.data.ok;
    } catch (err) {
      return err.response.data.ok;
    }
  }

  //--------methods---------------------------------------------------

  async setCallBackUrl(callback_url) {
    const response = await axios.post(this.#_urlAlter("setWebhook"), {
      url: callback_url,
    });
  }

  async sendMessage(message, message_id, chat_id) {
    const response = await axios.post(this.#_urlAlter("sendMessage"), {
      chat_id,
      text: message,
      reply_to_message_id: message_id,
    });
  }

  //   async getMe() {
  //     try {
  //       const response = await axios.get(TelegramBot.#_urlAlter("getMe"));
  //       return response.data;
  //     } catch (err) {
  //       return err.response.data;
  //     }
  //   }
}

module.exports = { TelegramBot };
