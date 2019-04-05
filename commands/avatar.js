exports.config = {
  ownerOnly: false,
  argsRequired: false
}

exports.help = {
  name: "Avatar",
  usage: "Avatar [@Mention]",
  description: "Retrieves either your or another user's avatar from the current guild."
}

const { Attachment } = require('discord.js')

exports.run = (client, message, args, command) => {
  const user = message.mentions.users.first() || message.author;
  let url = user.avatarURL.split("?");
  url = url[0]
  const reply = new Attachment(url);
  message.channel.send(reply);
}