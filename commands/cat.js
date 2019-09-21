const { Attachment } = require('discord.js');
const fetch = require('node-fetch');
exports.run = async (client, message, args, command) => {
    const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
    console.log('Cat found! ' + file);
    const attachment = new Attachment()
    .setAttachment(file);
    message.channel.send(attachment);
};

exports.config = {
    ownerOnly: false,
    argsRequired: false,
};

exports.help = {
    description: 'Finds a picure of a cat.',
    usage: 'Cat',
    name: 'Cat',
};