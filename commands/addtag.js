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
  const tagName = args.shift();
  const tagDesc = args.join(" ");

  try {
    const tag = await client.Tags.create({
      name: tagName,
      description: tagDesc,
      username: message.author.username,
    });

    return message.reply(`Tag ${tag.name} added.`);
  
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return message.channel.send('That tag already exists.');
    }
    console.log(e);
    return message.channel.send('Something went wrong with adding a tag.');

  }
}