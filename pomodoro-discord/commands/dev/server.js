module.exports = {
    name: 'server',
    description: '[DEV] Says the name of the Server',
    args: false,
    execute(message, args) {
        message.channel.send(`This server is named ${message.guild.name}`)
    },
};