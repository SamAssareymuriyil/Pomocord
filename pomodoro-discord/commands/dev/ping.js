module.exports = {
    name: 'ping',
    aliases: ['test', 'start'],
    description: '[DEV] Ping!',
    args: false,
    execute(message, args) {
        message.channel.send('Pong.');
    },
};