const TelegramBot = require('node-telegram-bot-api');
const mysql = require("mysql2");

const token = '7412518611:AAE_dnjqxx_EwljH6Inch6xRBBrs090u8ZM';

const bot = new TelegramBot(token, {polling: true});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ChatBotTests'
});

connection.connect(err=>{
  if(err){
      console.error('Error connection to the DB'. err.stack);
      return;
  }

  console.log('Connected to the DB')
});



const keyboard = [
  [{ text: '/help' }],
  [{ text: '/site' }],
  [{ text: '/creator' }]
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
  /randomItem - возвращает случайный предмет
  /deleteItem (id объекта, скобки не писать) - удаляет предмет по ID
  /getItemByID (id объекта, скобки не писать)- возвращает предмет по ID
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

bot.onText(/\/randomItem/, (msg) => {
  const chatId = msg.chat.id;
  connection.query('SELECT * FROM items ORDER BY RAND() LIMIT 1', (err, results) => {
    if (err) {
      bot.sendMessage(chatId, 'Ошибка! Не удалось загрузить предмет!');
      console.error(err);
    } else if (results.length > 0) {
      const item = results[0];
      bot.sendMessage(chatId, `(${item.id}) - ${item.name}: ${item.description}`);
    } else {
      bot.sendMessage(chatId, 'Предметов нет! Пусто!.');
    }
  });
});

bot.onText(/\/deleteItem (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const itemId = match[1];

  connection.query('DELETE FROM items WHERE id = ?', [itemId], (err, results) => {
    if (err) {
      bot.sendMessage(chatId, 'Невозможно удалить предмет!');
      console.error(err);
    } else if (results.affectedRows > 0) {
      bot.sendMessage(chatId, 'Предмет успешно удален!');
    } else {
      bot.sendMessage(chatId, 'Ошибка! Предмет не найден!');
    }
  });
});

bot.onText(/\/getItemByID (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const itemId = match[1];

  connection.query('SELECT * FROM items WHERE id = ?', [itemId], (err, results) => {
    if (err) {
      bot.sendMessage(chatId, 'Ошибка! Не удалось загрузить предмет!');
      console.error(err);
    } else if (results.length > 0) {
      const item = results[0];
      bot.sendMessage(chatId, `(${item.id}) - ${item.name}: ${item.description}`);
    } else {
      bot.sendMessage(chatId, 'Ошибка! Предмет не найден!');
    }
  });
});