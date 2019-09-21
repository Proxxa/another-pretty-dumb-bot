exports.run = (client, message, args, command) => {
    const letters = 'acdefghijklmnopqrstuvwxyz';
    const exceptList = ['?', 'b', '!', '#', '$', '+', '-'];
    const exceptReplace = [':question:', ':b:', ':exclamation:', ':hash:', ':heavy_dollar_sign:', ':heavy_plus_sign:', ':heavy_minus_sign:'];
    const msg = args.join(' ').toLowerCase();
    const msgLetters = msg.split('');
    const charList = [];
    msgLetters.forEach(letter => {
        if (letters.includes(letter)) {
            charList.push(`:regional_indicator_${letter}:`);
        }
 else if (exceptList.includes(letter)) {
            charList.push(exceptReplace[exceptList.indexOf(letter)]);
        }
 else {
            charList.push(letter);
        }
    });

    message.channel.send(charList.join(' '));
};

exports.config = {
    ownerOnly: false,
    argsRequired: true,
};

exports.help = {
    description: 'A Text to emoji command',
    usage: 'Emojify <text>',
    name: 'Emojify',
};