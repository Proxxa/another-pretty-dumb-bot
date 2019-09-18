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
        const code = clean(args.join(" "));
        if (code.includes("client.config")) throw "'Cannot reveal client token!'";
        if (code.includes("process.env.TOKEN")) throw "'Cannot reveal client token!'"
        if (code.includes("process")) throw "'Cannot affect node process!'";
        console.log("Running " + code);
        let evaled = eval(code);

        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

        evaled = evaled.replace(client.config.TOKEN, "[REDACTED]");

        if (evaled.length >= 1980) {
          console.log(evaled);
          let split = evaled.match(/.{1,1900}/g);
          await split.forEach(msg => {message.channel.send(`````\n${clean(msg)}\n\`\`\``)})
          let skipSending = 1;
        }

        if (skipSending !== 0) return "Sent in chunks";
        message.channel.send(clean(evaled), {code:"js"});
    } catch (err) {
        message.channel.send(`\`\`\`js\n${clean(err)}\`\`\``);
    }
}