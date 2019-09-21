exports.help = {
	name: 'Help',
	description: 'Displays commands that can be detected by the bot',
	usage: 'help [Help Module OR Command]',
};


exports.config = {
	ownerOnly: false,
	argsRequired: false,
};


const { RichEmbed } = require('discord.js');
const fs = require('fs');
exports.run = (client, message, args, _command) => {
	message.delete();
	fs.readdir('./commands', (e, files) => {
		if (e) throw e;
		if (args[0]) {
			const name = args[0].toLowerCase();
			if (files.indexOf(`${name}.js`) < 0) {
				fs.readdir('./helpModules', (err, moreFiles) => {
					if (moreFiles.indexOf(`${name}.js`) < 0) {
						return message.channel.send(`Invalid command/module name: \`${name}\``).then(m => m.delete(7500));
					}
					const file = require(`../helpModules/${name}`);
					let embedName = name.split('');
					embedName[0] = embedName[0].toUpperCase();
					embedName = embedName.join('');
					const msg = new RichEmbed()
						.setAuthor(embedName, message.author.avatarURL)
						.setColor('#2FFF2F')
						.setTimestamp();
					file.commands.forEach(object => {
						msg.addField(object.name, `\`${object.description}\``, true);
					});
					message.channel.send(msg);
				});
			}
			else {
				const cmdFile = require(`./${name}`);
				let embedName = name.split('');
				embedName[0] = embedName[0].toUpperCase();
				embedName = embedName.join('');
				if (!cmdFile.help) return message.channel.send(`Sorry, the command \`${embedName}\` has no help object to extract data from.`).then(m => m.delete(7500));
				const msg = new RichEmbed()
					.setAuthor(embedName, message.author.avatarURL)
					.setColor('#FFFF2F')
					.setTimestamp()
					.addField('Description', cmdFile.help.description)
					.addField('Usage', `\`${cmdFile.help.usage}\``);
				message.channel.send(msg);
			}
		}
		else {
			fs.readdir('./helpModules', (err, moreFiles) => {
				if (err) throw err;
				const msg = new RichEmbed()
					.setAuthor('Help Modules', message.author.avatarURL)
					.setColor('#2FFF2f')
					.setTimestamp();
				moreFiles.forEach(file => {
					const fileDesc = require('../helpModules/' + file).description;
					msg.addField(fileDesc.name, `\`${fileDesc.description}\``, true);
				});
				message.channel.send(msg);
			});
		}
	});
};