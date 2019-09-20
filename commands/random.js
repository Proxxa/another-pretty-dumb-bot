const rand = require("random");
exports.run = (client, message, args, command) => {
    if (args.length < 2) {
        return message.channel.send(`Rolling a random number from 1 to ${args[0]}, rolled ${rand.int(1, Number(args[0]) || null)}`);
    } else if (args.length > 1) {
        return message.channel.send(`Rolling a random number from ${args[0]} to ${args[1]}, rolled ${rand.int(Number(args[0]) || null, Number(args[1]) || null)}`);
    } else {
        throw '"Error experienced, somehow received no arguments."'
    }
}
  
exports.config = {
    ownerOnly: false,
    argsRequired: true
}
  
exports.help = {
    description: "A simple random number command",
    usage: "Random [Minimum] <Maximum>",
    name: "Random"
}