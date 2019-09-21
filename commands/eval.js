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

const { Attachment } = require('discord.js');
const blacklist = ['process.exit()', 'token'];
exports.run = async (client, message, args, command) => {
    try {
        const code = clean(args.join(' '));
        console.log('Running ' + code);

        blacklist.forEach(query => {
          if (code.toLowerCase().includes(query)) throw `Blacklisted term, '${query}'`;
        });

        let evaled = eval(code);

        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

        evaled = evaled.replace(client.config.TOKEN, '[REDACTED]');
        evaled = clean(evaled);
        let reply = `\`\`\`js\n${clean(evaled)}\n\`\`\``;
        if (evaled.length >= 1980) {
          console.log(evaled);
          const buf = new Buffer(clean(evaled));
          reply = new Attachment(buf, 'Output.txt');
        }
        message.channel.send(reply);
    }
 catch (err) {
        message.channel.send(`\`\`\`js\n${clean(err)}\`\`\``);
    }
};