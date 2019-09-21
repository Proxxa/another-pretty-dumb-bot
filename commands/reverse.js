exports.help = {
    name: 'Reverse',
    description: 'Responds with the "reversed" version of the input.',
    usage: 'reverse <text>',
};


exports.config = {
    ownerOnly: false,
    argsRequired: true,
};


exports.run = (client, message, args, command) => {
    let string = args.join(' ');
    string = string.split('');
    string = string.reverse();
    string = string.join('');
    message.channel.send(string);
};