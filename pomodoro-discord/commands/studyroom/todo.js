module.exports = {
    name: 'todo',
    aliases: ['list', 'next',],
    description: 'Displays your To-Do List',
    args: false,
    execute(message, args) {
        const fs = require('fs');
        let myData;
        fs.readFile('info.json', (err, data) => {
            if (err) throw err;
            myData = JSON.parse(data);

            const id = message.author.id;
            const users = myData.info
            for (let i = 100001; i <= myData.uId.lastUID; i++) {
                if (users[i.toString()].discordId === id) {
                    try {
                        const tasks = users[i.toString()].tasks.localArray
                        let output = 'your tasks are:\n';
                        tasks.forEach(val => {
                            output = output.concat("- ").concat(val).concat('\n')
                        })
                        message.reply(output)
                    }  catch(err) {
                        message.reply("you have no more tasks! Congrats!")
                    }

                }
            }

        });
    },
};