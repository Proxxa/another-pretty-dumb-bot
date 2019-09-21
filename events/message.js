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
            message.delete()
            message.channel.send(`Sorry, the command \`${command}\` does not exist.`).then(m => m.delete(7500))
        } else {
            try {
                ++client.commandsRegistered
                let cmdFile = require(`../commands/${command}`)
                if (cmdFile.config.ownerOnly && message.author.id !== client.config.ownerID) {
                    message.delete()    
                    return message.channel.send("You are not the bot owner!").then(m => m.delete(7500));
                }
                if (cmdFile.config.argsRequired && !args[0]) {
                    message.delete();
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
                message.channel.send("Encountered an error:\n```xl\n" + err + "\n```")
            }
        
        }
    });
}