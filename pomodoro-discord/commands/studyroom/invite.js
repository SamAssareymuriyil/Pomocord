module.exports = {
    name: 'invite',
    description: 'Invites a user to your study room.',
    args: true,
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply('Please tag a user to invite to your study room.')
        }
        const partner = message.mentions.users.first();

        const category = message.guild.channels.cache.find(c => c.name === `${message.author.username} study room`)
        message.guild.channels.cache.get(category.id).updateOverwrite(partner.id, {
            CONNECT: true,
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
        })

        message.channel.send(`You have invited ${partner.tag}`)
    },
};
