const rand = require("random");
exports.run = (client, message, args, command) => {
    let die = args[0];
    if (!die.includes("d")) {
        return message.channel.send("Sorry, dice names have the format \"`AdB`\", where B is the maximum number on the die, and A is the number of times the die is rolled.");
    } else {
        let dieArgs = die.split("d");
        if (dieArgs.length > 2) {
            return message.channel.send("Sorry, dice names only have one \"`d`\" in them.");
        } else if (dieArgs.length < 2) {
            return message.channel.send("Sorry, you need a number before and after the \"`d`\".");
        }
        let times = Number(dieArgs[0]) || null;
        let max = Number(dieArgs[1]) || null;
        if (typeof times !== typeof 1) {
            return message.channel.send(`Invalid Argument "${dieArgs[0]}"`);
        }
        if (typeof max !== typeof 1) {
            return message.channel.send(`Invalid Argument "${dieArgs[1]}"`);
        }
        let num = 0;
        let nums = [];
        let temp;
        for (x = 0; x < times; x++) {
            temp = rand.int(1, max);
            num += temp;
            nums.push(temp);
        }
        let textList = nums.join(" + ");
        return message.channel.send(`${times}d${max} → ${textList} = ${num}`);
    }
}
  
exports.config = {
    ownerOnly: false,
    argsRequired: true
}
  
exports.help = {
    description: "A D&D Dice-rolling command",
    usage: "Roll <Dice>",
    name: "Roll"
}