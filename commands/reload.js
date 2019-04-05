exports.run = (client, message, args, command) => {
  delete require.cache[require.resolve(`./${args[0]}`)]
  message.channel.send(`Command **${args[0]}** reloaded.`)
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