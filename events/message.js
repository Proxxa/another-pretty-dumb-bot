const { RichEmbed } = require("discord.js")
const fs = require('fs')
module.exports = message => {
    const client = message.client;
    const prefix = client.prefix;
    const main = require('../app.js')
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
    const args = message.content.split(' ');
    const command = args.shift().slice(prefix.length).toLowerCase();
    if (!command) return;
    client.logger.log(`New command received: ${prefix}${command} ${args.join(" ")} `);
    fs.readdir('./commands', (err, files) => {
        if (err) client.logger.error(err);
        if (files.indexOf(command + '.js') < 0) {
            message.channel.send(`Sorry, the command \`${command}\` does not exist.`)
        } else {
            try {
                ++client.commandsRegistered
                let cmdFile = require(`../commands/${command}`)
                if (cmdFile.config.ownerOnly && message.author.id !== client.config.ownerID) return message.channel.send("You are not the bot owner!");
                if (cmdFile.config.argsRequired && !args[0]) {
                    const msg = new RichEmbed()
                        .addField('Description', cmdFile.help.description)
                        .addField('Usage', `\`\`\`xl\n${cmdFile.help.usage}\n\`\`\``)
                        .setTimestamp()
                        .setAuthor(cmdFile.help.name, message.author.avatarURL)
                        .setColor("#ff0000");
                    return message.channel.send(msg);
                }
                if (cmdFile.helpModule) return message.channel.send(cmdFile.contents)
                cmdFile.run(client, message, args, command);
            } catch (err) {
                client.logger.error(err.stack);
                message.channel.send("```xl\n" + err + "\n```")
            }
        
        }
    });
}