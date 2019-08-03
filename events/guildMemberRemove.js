const { RichEmbed } = require("discord.js");
module.exports = member => {
    if (!member.user.bot) {
        let channel = member.guild.systemChannel
        let embed = new RichEmbed()
                .setAuthor(`${member.user.username} left.`, member.user.avatarURL)
                .setTimestamp()
                .setFooter(`${member.user.tag} (${member.user.id})`)
                .setColor(0xff0000)
        if (channel) {
        channel.send(embed);
        }
        member.user.send(`Welcome to ${member.guild.name}!`)
    }
}