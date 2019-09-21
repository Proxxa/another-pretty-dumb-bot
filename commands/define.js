const querystring = require('querystring');
const { RichEmbed } = require('discord.js');
const fetch = require('node-fetch');
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
exports.run = async (client, message, args, command) => {
    const query = querystring.stringify({ term: args.join(' ') });
    const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(r => r.json());
    if (!list.length) return message.channel.send(`:x: No results found for **\`${args.join(' ')}\`**`);
    const answer = list[0];
    const embed = new RichEmbed()
    .setColor('#DDFF00')
    .setAuthor(answer.word, message.author.avatarURL, answer.permalink)
    .addField('Definition', `>>> ${trim(answer.definition, 1024)}`)
    .addField('Example', `>>> ${trim(answer.example, 1024)}`)
    .setTimestamp();
    const score = answer.thumbs_up - answer.thumbs_down;

    if (score >= 0) {
        embed.setFooter(`${score} Net Upvotes`);
    }
    else {
        embed.setFooter(`${score} Net Downvotes`);
    }

    message.channel.send(embed);
};

exports.config = {
    ownerOnly: false,
    argsRequired: true,
};

exports.help = {
    description: 'Define something on urban dictionary.',
    usage: 'Define <query>',
    name: 'Define',
};