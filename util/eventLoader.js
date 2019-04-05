const load = event => require(`../events/${event}`);
module.exports = client => {
  client.on("message", load("message"))
}