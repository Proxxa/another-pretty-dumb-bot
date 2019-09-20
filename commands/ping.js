exports.run = (client, message, args, command) => {
    message.channel.send("Ping?").then(msg => {
        msg.edit(`Pong! **${msg.createdTimestamp - message.createdTimestamp}ms**`);
    });
}

exports.config = {
    ownerOnly: false,
    argsRequired: false
}

exports.help = {
    description: "A simple Ping/Pong command.",
    usage: "Ping",
    name: "Ping"
}