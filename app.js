require('dotenv').config();
require('chalk');
require('moment');
const { Client } = require('discord.js');
const client = new Client({ messageCacheMaxSize: 3000, sync: true });
const env = process.env;
const DBL = require('dblapi.js');
client.env = env;
client.prefix = client.env.PREFIX;
client.token = client.env.TOKEN;
client.dblToken = client.env.DBL_TOKEN;
client.logger = require('./util/logger.js');
client.commandsRegistered = 0;
const dbl = new DBL(client.dblToken, client);

require('./util/eventLoader.js')(client);

client.possiblePresences = [{ name: `Prefix "${client.prefix}"`, type: 'PLAYING' }, { name: `User#Placeholder`, type: 'WATCHING' }, { name: `Guild#Placeholder`, type: 'WATCHING' }, { name: `Command#Placeholder`, type: 'LISTENING' }];
let currentPresence = -1;

client.on('ready', () => {
  console.log(`Client online; ${client.user.tag}`);
  setInterval(function() {
    client.possiblePresences[0].name = `Prefix "${client.prefix}"`
    client.possiblePresences[1].name = `${client.users.filter(u => !u.bot).size} Users`;
    client.possiblePresences[2].name = `${client.guilds.size} Servers`;
    client.possiblePresences[3].name = `${client.commandsRegistered} Commands`;
    ++currentPresence;
    if (currentPresence >= client.possiblePresences.length) currentPresence = 0;
    client.user.setPresence({ game: client.possiblePresences[currentPresence] }).catch(console.error);
  }, 25000);
  client.user.setPresence({ game: { name: 'Hello, World!', type: 'PLAYING' } });
});

client.login(client.token);
