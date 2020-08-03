exports.config = {
    ownerOnly: true,
    argsRequired: true,
};


exports.help = {
    name: 'Bash',
    description: 'Runs a console command on the host server',
    usage: 'bash <command>',
};


function clean(text) {
    if (typeof (text) === 'string') {
      return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    }
 else {
      return text;
    }
  }

const { Attachment, RichEmbed } = require('discord.js');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const blacklistedCommands = ['rm', 'node', 'npm i']
exports.run = async (client, message, args, command) => {
    try {
        let input = clean(args.join(" "));
        blacklistedCommands.forEach(cmd => {
          if (input.toLowerCase().startsWith(cmd)) throw `Input cannot start with ${cmd}`
        });
        let output = 'No output received?'
        
        const startDate = new Date();
        const { err, stdout, stderr } = await exec(input);
        const timeTaken = new Date() - startDate;
        if (err) throw err;
        if (stdout) output = stdout;
        
        output = output.replace(client.token, '[REDACTED]');
        output = output.replace(client.dblToken, '[REDACTED]');
        output = clean(output);
        
        if (output.length >= 1024) {
          console.log(output);
          const buf = new Buffer(clean(output));
          reply = new Attachment(buf, 'Output.txt');
          return message.channel.send(reply);
        }
        
        const embed = new RichEmbed()
          .setAuthor(`Run by ${message.author.tag}`, message.author.avatarURL)
          .addField(':inbox_tray: Input', '```js\n' + input + '\n```')
          .addField(':outbox_tray: Output', '```js\n' + output + '\n```')
          .setTimestamp()
          .setFooter(`Took ${Math.round(timeTaken)}ms`)
          .setColor('#00dd00');

        message.channel.send(embed);
    }
 catch (err) {
   const embed = new RichEmbed()
    .setAuthor('Command Failed', message.author.avatarURL)
    .addField(':outbox_tray: Error', `\`\`\`xl\n${clean(err)}\`\`\``)
    .setColor('#dd0000')
    .setTimestamp();
        message.channel.send(embed);
    }
};
