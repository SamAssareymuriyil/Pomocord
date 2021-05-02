const admin = require("firebase-admin");
const serviceAccount = require("./pomocord-firebase-adminsdk-jzh5e-05887544f7.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pomocord-default-rtdb.firebaseio.com"
});
const db = admin.database();
const ref = db.ref();

const fs = require('fs');
const Discord = require('discord.js');
const token = require('./config.json').token;

const client = new Discord.Client();
client.commands = new Discord.Collection();

getData = () => {
    ref.once("value", (snapshot) => {

        const data = (snapshot.val());
        let writeData = JSON.stringify(data);
        fs.writeFileSync('info.json', writeData);
        if(client.channels.cache.get('837834721772961805')) {
            const event = require('./DBupdate')
            event.execute(data, client)
        }
    });
}

waterReminder = () => {
    const hostChannel = client.guilds.cache.get('837834721772961802').channels.cache.get('838526541646004225')
    hostChannel.send("@everyone This is a reminder to drink water! Hydration is important!")
}

standingReminder = () => {
    const hostChannel = client.guilds.cache.get('837834721772961802').channels.cache.get('838526541646004225')
    hostChannel.send("@everyone This is a reminder to get up and walk! It's important not to stay idle for too long.")
}

setInterval(getData, 5000)
setInterval(waterReminder, 60000*5)
setInterval(standingReminder, 60000*10)


const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}



const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.login(token);