const rand = require('random');
exports.run = (client, message, args, command) => {
    message.delete();
    const die = args[0];
    if (!die.includes('d')) {
        return message.channel.send('Sorry, dice names have the format "`AdB`", where B is the maximum number on the die, and A is the number of times the die is rolled.').then(m => m.delete(7500));
    }
 else {
        const dieArgs = die.split('d');
        if (dieArgs.length > 2) {
            return message.channel.send('Sorry, dice names only have one "`d`" in them.').then(m => m.delete(7500));
        }
        let times = Number(dieArgs[0]) || 1;
        const max = Number(dieArgs[1]) || null;
        if (typeof times !== typeof 1) {
            times = 1;
        }
        if (typeof max !== typeof 1) {
            return message.channel.send(`Invalid Argument "${dieArgs[1]}" (M)`).then(m => m.delete(7500));
        }
        let num = 0;
        const nums = [];
        let temp;
        for (let x = 0; x < times; x++) {
            temp = rand.int(1, max);
            num += temp;
            nums.push(temp);
        }
        const textList = nums.join(' + ');
        return message.reply(`${times}d${max} → (${textList}) = ${num}`);
    }
};

exports.config = {
    ownerOnly: false,
    argsRequired: true,
};

exports.help = {
    description: 'A D&D Dice-rolling command',
    usage: 'Roll <Dice>',
    name: 'Roll',
};