exports.config = {
    ownerOnly: true,
    argsRequired: true
}


exports.help = {
    name: "Eval",
    description: "Evaluates the input text using eval()",
    usage: "eval <javascript>"
}


function clean(text) {
    if (typeof(text) === "string") {
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
      return text;
    }
  }


exports.run = async (client, message, args, command) => {
    try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

        if (evaled.length >= 1980) {
          console.log(evaled);
          return message.channel.send("Message length greater than 2000 characters. Check console.");
        }

        message.channel.send(clean(evaled), {code:"js"});
    } catch (err) {
        message.channel.send(`\`\`\`js\n${clean(err)}\`\`\``);
    }
}