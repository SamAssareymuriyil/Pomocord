module.exports = {
    name: 'user',
    description: '[DEV] Says the username of the sender.',
    args: false,
    execute(message, args) {
        message.channel.send(`Your username is ${message.author.tag}`)
    },
};