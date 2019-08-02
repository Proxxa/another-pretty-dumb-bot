exports.config = {
    ownerOnly: false,
    argsRequired: true
}


exports.help = {
    name: "Tempban",
    description: "Temporarily bans the mentioned user. (May be decimal)",
    usage: "Tempbn <@Mention> <days> [Reason]"
}

exports.run = (client, message, args, command) => {
    let toBan = message.guild.member(message.mentions.users.first());
    let banner = message.guild.member(message.author);
    args[1] = JSON.parse(args[1]);
    let length = args[1];
    let banReason = args.slice(2, args.length).join(" ");
    if (banner.hasPermission("BAN_MEMBERS")) {
        message.channel.send("Banning " + toBan.user.tag + " for " + length + " days. Reason: "+ banReason);
        toBan.ban({ days: length, reason: banReason });
    } else {
        message.channel.send("Sorry! Looks like you don't have the permissions to Ban Server Members!");
    }
}