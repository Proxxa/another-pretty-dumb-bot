exports.config = {
    ownerOnly: false,
    argsRequired: true
}


exports.help = {
    name: "Math",
    description: "Performs basic arithmetic operations",
    usage: "math <number> < +,  -,  *, / > <number>"
}


exports.run = (client, message, args, command) => {
    message.channel.send("Solving `" + args.join(" ") + "`")
        .then(msg => {
            if (args[1] === "+") return msg.edit(Number(args[0]) + Number(args[2]));
            if (args[1] === "-") return msg.edit(Number(args[0]) - Number(args[2]));
            if (args[1] === "*") return msg.edit(Number(args[0]) * Number(args[2]));
            if (args[1] === "/") return msg.edit(Number(args[0]) / Number(args[2]));
            return msg.edit("Sorry! You must've used an invalid operator!")
        });
}