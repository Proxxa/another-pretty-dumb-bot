exports.help = {
  name: "Cat",
  description: "Gives you a picture of a random cat. (May take some time)",
  usage: "Cat"
}

exports.config = {
  ownerOnly: false,
  argsRequired: false
}

const cat = require("random.cat-meow");
const { Attachment } = require('discord.js')

exports.run = (client, message, args, command) => {
  cat().then(url => {
    console.log(url)
    let toSend = new Attachment(url);
    message.channel.send(toSend);
  })
}