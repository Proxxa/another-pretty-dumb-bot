exports.config = {
    ownerOnly: false,
    argsRequired: false,
};


exports.help = {
    name: 'Invite',
    description: 'Sends the user a link to invite the bot.',
    usage: 'Invite',
};

exports.run = (client, message, args, command) => {
    client.generateInvite([ 'ADMINISTRATOR', 'SEND_MESSAGES', 'MANAGE_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS', 'KICK_MEMBERS', 'BAN_MEMBERS' ]).then(link => {
        message.author.send(`Here's my invite link: ${link}`);
        message.delete();
        message.channel.send('You have 1 new message!').then(msg => msg.delete(3000));
    }).catch(console.error);
};