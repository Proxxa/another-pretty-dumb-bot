const { Attachment } = require('discord.js');
const fetch = require('node-fetch');
exports.run = async (client, message, args, command) => {
    const file = await fetch('https://dog.ceo/api/breeds/image/random').then(fil => fil.json());
    console.log('Dog found! ' + file.message);
    const img = new Attachment()
        .setAttachment(file.message);
    message.channel.send(img);
};

exports.config = {
    ownerOnly: false,
    argsRequired: false,
};

exports.help = {
    description: 'Finds a picure of a dog.',
    usage: 'Dog',
    name: 'Dog',
};