module.exports = {
    name: 'free',
    description: 'Removes the studying role',
    args: false,
    execute(message, args) {
        const role = message.guild.roles.cache.find(role => role.name === 'Studying');
        const people = message.guild.members.cache
        const senderID = message.author.id
        let sender;
        people.forEach((person) => {
            if(person.id === senderID) {
                sender = person
            }
        })
        sender.roles.remove(role);

        const category = message.guild.channels.cache.find(c => c.name === `${message.author.username} study room`)
        const text = message.guild.channels.cache.find(c => c.name === (`${message.author.username}-study-chat`.toLowerCase()))
        const voice = message.guild.channels.cache.find(c => c.name === `${message.author.username} Study VC`)

        message.guild.channels.cache.get(category.id).delete();
        message.guild.channels.cache.get(text.id).delete();
        message.guild.channels.cache.get(voice.id).delete();
    },
};