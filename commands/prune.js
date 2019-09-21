exports.config = {
  ownerOnly: false,
  argsRequired: true,
};

exports.help = {
  name: 'Prune',
  usage: 'Prune <# 1 - 100>',
  description: 'Deletes a number of messages',
};

exports.run = async (client, message, args, command) => {
  if (message.member.hasPermission('MANAGE_MESSAGES')) {
    if (JSON.parse(args[0]) > 100 || JSON.parse(args[0]) < 1) return message.channel.send('Please select a number 1 - 100!');
    message.channel.fetchMessages({ limit: JSON.parse(args[0]) }).then(messages => {
      const mapped = messages.map(m => m);
      const total = mapped.length;
      message.channel.bulkDelete(messages);
      message.channel.send(`Deleted ${total} messages!`).then(m => m.delete(2500));
    });
  }
 else {return message.channel.send('Sorry, you do not have the permission `MANAGE_MESSAGES`');}
};