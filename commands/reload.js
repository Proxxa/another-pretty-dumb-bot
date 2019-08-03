exports.run = (client, message, args, command) => {
  message.delete(0);
  delete require.cache[require.resolve(`./${args[0]}`)]
  message.channel.send(`Command **${args[0]}** reloaded.`).then(msg => msg.delete(3000));
}

exports.config = {
  ownerOnly: true,
  argsRequired: true
}

exports.help = {
  description: "Deletes the cache of a command's javascript file.",
  usage: "Reload <command>",
  name: "Reload"
}