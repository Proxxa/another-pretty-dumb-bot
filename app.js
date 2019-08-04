require('dotenv').config();
require('chalk');
require('moment');
const { Client } = require('discord.js');
const client = new Client({ messageCacheMaxSize: 3000 });
const settings = process.env;
const Sequelize = require('sequelize');
client.config = settings;
client.prefix = client.config.PREFIX;
client.token = client.config.TOKEN;
client.logger = require('./util/logger.js');
client.commandsRegistered = 0;

require('./util/eventLoader.js')(client);

client.possiblePresences = [{ name: `Prefix "${client.prefix}"`, type: "PLAYING" }, { name: `${client.users.length} Users`, type: "WATCHING" }, { name: `${client.guilds.length} Servers`, type: "WATCHING" }, { name: `${client.commandsRegistered} Commands`, type: "LISTENING" }];

let currentPresence = -1;

const sequelize = new Sequelize('database', 'user', 'password', {
	host: process.env.DATABASE,
	dialect: 'sqlite',
	logging: false,
	operatorsAliases: false,
	storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

client.Tags = Tags;

client.once("ready", () => {
  console.log(`Client online; ${client.user.tag}`);
  setInterval(function() {
    client.possiblePresences[3].name = `${client.commandsRegistered} Commands`
    client.possiblePresences[1].name = `${client.users.array().length} Users`
    client.possiblePresences[2].name = `${client.guilds.array().length} Servers`
    ++currentPresence;
    if (currentPresence >= client.possiblePresences.length) currentPresence = 0;
    client.user.setPresence({ game: client.possiblePresences[currentPresence] }).catch(console.error);
  }, 10000);
  client.user.setPresence({ game: { name: "Hello, World!", type: "PLAYING" } });
  Tags.sync();
});

client.login(client.token);
