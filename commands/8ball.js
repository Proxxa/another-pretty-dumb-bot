let replies = [
//Yes Replies
"Yeah!",
"Sure!",
"Indubitably!",
"Why not?",
//No Replies
"Aah, no.",
"I'd say no.",
"Research says not.",
"Wouldn't suggest it.",
//Heck Off Replies
"I'll have to get back to you on that one...",
"I'm not too sure...",
"I'm tired, ask me tomorrow",
"You pick."
];

exports.run = (client, message, args, command) => {
  let reply = replies[Math.floor(Math.random() * replies.length)];
  message.channel.send("The Eight Ball has spoken! It says, `\"" + reply + "\"`")
}

exports.help = {
  name: "8ball",
  usage: "8ball <Y/N question>",
  description: "The End-All, Be-All 8ball, answers all of your Yes or No questions. With a reply meaning either Yes, No, or 'Try Again, I'm too lazy to answer right now.'"
}

exports.config = {
  ownerOnly: false,
  argsRequired: true
}