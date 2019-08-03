const load = event => require(`../events/${event}`);
module.exports = client => {
  client.on("message", load("message"))
  client.on("guildMemberAdd", load("guildMemberAdd"));
  client.on("guildMemberRemove", load("guildMemberRemove"));
}