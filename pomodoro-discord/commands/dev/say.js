module.exports = {
    name: 'say',
    description: '[DEV] Prints what the user says',
    args: true,
    execute(message, args) {
        message.channel.send(args.join(' '))
    },
};