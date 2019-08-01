require('dotenv').config();
require('chalk');
require('moment');
const { Client } = require('discord.js');
const client = new Client({ messageCacheMaxSize: 1500 });
const settings = process.env;
client.config = settings;
client.prefix = client.config.PREFIX;
client.token = client.config.TOKEN;
client.logger = require('./util/logger.js');

require('./util/eventLoader.js')(client);

client.on("ready", () => {
  console.log(`Client online; ${client.user.tag}`);
  client.user.setActivity(`${client.prefix} | Ver. ${require('./package.json').version}`)
});

client.login(client.token);
