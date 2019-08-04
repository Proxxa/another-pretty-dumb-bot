exports.config = {
    ownerOnly: true,
    argsRequired: false
}
  
exports.help = {
  name: "N/A",
  usage: "N/A",
  description: "NO HELP DATA GIVEN"
}
  
  
exports.run = async (client, message, args, command) => {
  const tagName = args.join(" ");

  const tag = await client.Tags.findOne({ where: { name: tagName } });
  if (tag) {
    tag.increment('usage_count');
    return message.channel.send(tag.get("description"));
  }
  return message.channel.send("Tag not found.")
}