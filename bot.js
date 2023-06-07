const mineflayer = require('mineflayer');
const Vec3 = require('vec3');

const bot = mineflayer.createBot({
  host: 'server-ip',//server ip
  port: 25565,//server port 25565 is default
  username: 'Bruh_bot',//user name (non premium account)
});
//login function
bot.once('spawn', () => {
  bot.chat('/login password');
});
console.log('joined to server')
bot.on('chat', (username, message) => {
  if (username === bot.username) return;

  if (message === 'attack') {
    const target = bot.nearestEntity(entity => entity.type === 'mob' || entity.type === 'player');
    if (target) bot.attack(target);
  }
});

setInterval(() => {
  if (bot.target) return;

  const randomX = Math.floor(Math.random() * 20) - 10;
  const randomZ = Math.floor(Math.random() * 20) - 10;
  bot.setControlState('forward', true);
  bot.setControlState('jump', true);
  bot.lookAt(bot.entity.position.offset(randomX, 0, randomZ));
  setTimeout(() => {
    bot.setControlState('forward', false);
    bot.setControlState('jump', false);
  }, 1000);
}, 1000);

setInterval(() => {
  const target = bot.nearestEntity(entity => entity.type === 'mob' || entity.type === 'player');
  if (target) {
    bot.lookAt(target.position);
    bot.attack(target);
  }
}, 1000);
