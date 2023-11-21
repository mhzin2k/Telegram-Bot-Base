const { Telegraf } = require("telegraf");

const config = require("./configs/config.json");
const { handler } = require("./handlers/index");

const bot = new Telegraf(config.token);

handler(bot);

bot.launch();
