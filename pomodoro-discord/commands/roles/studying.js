module.exports = {
    name: 'studying',
    description: 'Gives you the Studying role',
    args: false,
    execute(message, args) {
        const role = message.guild.roles.cache.find(role => role.name === 'Studying');
        const senderID = message.author.id
        const sender = message.guild.members.cache.get(senderID);
        sender.roles.add(role);

        message.guild.channels.create(`${message.author.username} study room`, {
            type:"category",
            permissionOverwrites: [
                {
                    id: '837834721772961802',
                    deny: ["CONNECT", "SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: message.author.id,
                    allow: ["CONNECT", "SEND_MESSAGES", "VIEW_CHANNEL"]
                }
            ]
        })

        const ch = channel => {
            let category = message.guild.channels.cache.find(c => c.name === `${message.author.username} study room`);
            channel.setParent(category.id);
        }

        message.guild.channels.create(`${message.author.username}-study-chat`).then(ch);

        message.guild.channels.create(`${message.author.username} Study VC`, {type:"voice"}).then(ch);

    },
};