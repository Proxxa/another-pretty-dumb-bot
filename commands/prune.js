exports.config = {
  ownerOnly: true,
  argsRequired: true
}

exports.help = {
  name: "Prune",
  usage: "Prune <# 1 - 100>",
  description: "Deletes a number of messages"
}

exports.run = async (client, message, args, command) => {
  if (message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.fetchMessages({ limit: JSON.parse(args[0]) }).then(messages => {
      message.channel.bulkDelete(messages);
    });
  } else return message.channel.send("Sorry, you do not have the permission `MANAGE_MESSAGES`");
}