require('dotenv').config();
require('chalk');
require('moment');
const { Client } = require('discord.js');
const client = new Client({ messageCacheMaxSize: 3000 });
const settings = process.env;
client.config = settings;
client.prefix = client.config.PREFIX;
client.token = client.config.TOKEN;
client.logger = require('./util/logger.js');
client.commandsRegistered = 0;

require('./util/eventLoader.js')(client);

client.possiblePresences = [{ name: `Prefix "${client.prefix}"`, type: "PLAYING" }, { name: `${client.users.length} Users`, type: "WATCHING" }, { name: `${client.guilds.length} Servers`, type: "WATCHING" }, { name: `${client.commandsRegistered} Commands`, type: "LISTENING" }];

let currentPresence = -1;

client.on("ready", () => {
  console.log(`Client online; ${client.user.tag}`);
  setInterval(function() {
    client.possiblePresences[3].name = `${client.commandsRegistered} Commands`
    client.possiblePresences[1].name = `${client.users.array().length} Users`
    client.possiblePresences[2].name = `${client.guilds.array().length} Servers`
    ++currentPresence;
    if (currentPresence >= client.possiblePresences.length) currentPresence = 0;
    client.user.setPresence({ game: client.possiblePresences[currentPresence] }).catch(console.error);
  }, 25000);
  client.user.setPresence({ game: { name: "Hello, World!", type: "PLAYING" } });
});

client.login(client.token);
