const TelegramBot = require('node-telegram-bot-api');

const token = '7412518611:AAE_dnjqxx_EwljH6Inch6xRBBrs090u8ZM';

const bot = new TelegramBot(token, {polling: true});

const keyboard = [
  [{ text: '/help' }],
  [{ text: '/site' }],
  [{ text: '/creator' }],
];

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Доброго времени суток! Выберите команду:', {
    reply_markup: {
      keyboard: keyboard,
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpMessage = `
  Список доступных команд:
  /site - ссылка на сайт октагона
  /creator - отправляет в чат ФИО
  `;
  bot.sendMessage(chatId, helpMessage);
});

bot.onText(/\/site/, (msg) => {
  const chatId = msg.chat.id;
  const siteUrl = 'https://students.forus.ru/';
  bot.sendMessage(chatId, `Сайт октагона: ${siteUrl}`);
});

bot.onText(/\/creator/, (msg) => {
  const chatId = msg.chat.id;
  const creatorInfo = 'Толмачев Денис Андреевич';
  bot.sendMessage(chatId, `Разработал: ${creatorInfo}`);
});