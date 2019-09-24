exports.config = {
    ownerOnly: true,
    argsRequired: true,
};


exports.help = {
    name: 'Eval',
    description: 'Evaluates the input text using eval()',
    usage: 'eval <javascript>',
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
const blacklist = ['process.exit()', 'token', 'client.destroy()'];
exports.run = async (client, message, args, command) => {
    try {
        const code = clean(args.join(' '));
        console.log('Running ' + code);

        blacklist.forEach(query => {
          if (code.toLowerCase().includes(query.toLowerCase())) throw `Blacklisted term, '${query}'`;
        });

        const startDate = new Date();
        let evaled = await eval(code);
        const timeTaken = new Date() - startDate;

        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

        evaled = evaled.replace(client.token, '[REDACTED]');
        evaled = evaled.replace(client.dblToken, '[REDACTED]');
        evaled = clean(evaled);
        let reply = `\`\`\`js\n${clean(evaled)}\n\`\`\``;
        if (evaled.length >= 1980) {
          console.log(evaled);
          const buf = new Buffer(clean(evaled));
          reply = new Attachment(buf, 'Output.txt');
          return message.channel.send(reply);
        }

        const embed = new RichEmbed()
          .setAuthor(`Evaluated by ${message.author.tag}`, message.author.avatarURL)
          .addField(':inbox_tray: Input', '```js\n' + code + '\n```')
          .addField(':outbox_tray: Output', '```js\n' + evaled + '\n```')
          .setTimestamp()
          .setFooter(`Took ${Math.round(timeTaken)}ms`)
          .setColor('#00dd00');

        message.channel.send(embed);
    }
 catch (err) {
   const embed = new RichEmbed()
    .setAuthor('Failed to Evaluate', message.author.avatarURL)
    .addField(':outbox_tray: Error', `\`\`\`js\n${clean(err)}\`\`\``)
    .setColor('#dd0000')
    .setTimestamp();
        message.channel.send(embed);
    }
};