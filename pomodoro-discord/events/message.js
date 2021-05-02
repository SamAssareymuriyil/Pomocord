const prefix = require('../config.json').prefix

module.exports = {
    name: 'message',
    execute(message) {
        console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);



        if (!message.content.startsWith(prefix) || message.author.bot) return;

        // const fs = require('fs');
        // let myData;
        // fs.readFile('info.json', (err, data) => {
        //     if (err) throw err;
        //     myData = JSON.parse(data);
        //     console.log(myData.info[100001].status)
        //     // message.channel.send(myData.info[100001].status)
        // });

        const args = message.content.slice(prefix.length).trim().split(' ');
        const commandName = args.shift().toLowerCase();

        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (command.args && !args.length) {
            return message.reply('Please provide the appropriate arguments.')
        }

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    },
};