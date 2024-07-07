const TelegramBot = require('node-telegram-bot-api');

const token = '7412518611:AAE_dnjqxx_EwljH6Inch6xRBBrs090u8ZM';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Привет, октагон!');
});