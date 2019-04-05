exports.help = {
  name: "Idea",
  description: "Gives you a randomly generated idea",
  usage: "Idea"
}

exports.config = {
  ownerOnly: false,
  argsRequired: false
}


let types = [
"website",
"discord bot",
"Minecraft server",
"discord server",
"Roblox game",
"machine",
"shirt",
"meme",
"book",
"paperclip",
"video game"
];

let which = [
  "makes memes",
  "makes shirts",
  "randomly generates ideas for a " + types[Math.floor(Math.random() * types.length)],
  "writes books",
  "makes video games",
  "makes board games",
  "makes flash animations",
  "makes money",
  "proves the Earth is flat",
  "proves the Earth is round",
  "proves the Earth is a dodecahedron",
  "makes dodecahedrons",
  "plays D&D",
  "rolls a dice",
  "plays RPS",
  "makes a " + types[Math.floor(Math.random() * types.length)]
];

let where = [
"the United States",
"Canada",
"Indonesia",
"China",
"Europe",
"Germany",
"Denmark",
"outer space",
"the middle of the Sun",
"the middle of Earth",
"the middle of the Moon",
"the middle of nowhere",
"a box",
"a rocket-ship",
"your house",
"7/11",
"Walmart",
"Kroger",
"McDonalds",
"Japan",
"your friend's house",
"India",
"Upside-Down land (Australia)"
];

exports.run = (client, message, args, command) => {
 message.channel.send(`Make a ${types[Math.floor(Math.random() * types.length)]} that ${which[Math.floor(Math.random() * which.length)]} in ${where[Math.floor(Math.random() * where.length)]}.`)
}