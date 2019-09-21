exports.config = {
    ownerOnly: false,
    argsRequired: true,
};


exports.help = {
    name: 'Kick',
    description: 'Kicks the mentioned user.',
    usage: 'Kick <@Mention> [Reason]',
};

exports.run = (client, message, args, command) => {
    const toKick = message.guild.member(message.mentions.users.first());
    const kicker = message.guild.member(message.author);
    args.shift();
    const reason = args.join(' ');
    console.log(reason);
    if (kicker.hasPermission('KICK_MEMBERS')) {
        message.channel.send('Kicking ' + toKick.user.tag + ' for the reason: ' + reason);
        toKick.kick(reason);
    }
 else {
        message.channel.send('Sorry! Looks like you don\'t have the permissions to Kick Server Members!');
    }
};