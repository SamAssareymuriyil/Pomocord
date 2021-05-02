module.exports = {
    name: 'DBUpdate',
    execute(data, client) {

        const fs = require('fs');
        let myData;
        fs.readFile('info.json', (err, data) => {
            if (err) throw err;
            myData = JSON.parse(data);

            if(myData) {
                const users = myData.info
                let studyPeers
                try {
                    studyPeers = myData.studyPeers
                } catch (e) {
                    studyPeers = []
                }

                const studyRole = client.guilds.cache.get('837834721772961802').roles.cache.find(role => role.name === 'Studying');
                const breakRole = client.guilds.cache.get('837834721772961802').roles.cache.find(role => role.name === 'Break');
                const availableRole = client.guilds.cache.get('837834721772961802').roles.cache.find(role => role.name === 'Available');

                const haveChannel = (username, id) => {
                    const categoryChannel = client.guilds.cache.get('837834721772961802').channels.cache.find(channel => channel.name === `${username} study room`)
                    if (categoryChannel) {return;}

                    client.guilds.cache.get('837834721772961802').channels.create(`${username} study room`, {
                        type:"category",
                        permissionOverwrites: [
                            {
                                id: '837834721772961802',
                                deny: ["CONNECT", "SEND_MESSAGES", "VIEW_CHANNEL"]
                            },
                            {
                                id: id.toString(),
                                allow: ["CONNECT", "SEND_MESSAGES", "VIEW_CHANNEL"]
                            }
                        ]
                    })

                    const ch = channel => {
                        let category = client.guilds.cache.get('837834721772961802').channels.cache.find(c => c.name === `${username} study room`);
                        channel.setParent(category.id);
                    }

                    client.guilds.cache.get('837834721772961802').channels.create(`${username}-study-chat`).then(ch);
                    client.guilds.cache.get('837834721772961802').channels.create(`${username} Study VC`, {type:"voice"}).then(ch);

                }
                const dontHaveChannel = (username) => {
                    const category = client.guilds.cache.get('837834721772961802').channels.cache.find(c => c.name === `${username} study room`)
                    if(!category){return;}
                    const text = client.guilds.cache.get('837834721772961802').channels.cache.find(c => c.name === (`${username}-study-chat`.toLowerCase()))
                    const voice = client.guilds.cache.get('837834721772961802').channels.cache.find(c => c.name === `${username} Study VC`)

                    client.guilds.cache.get('837834721772961802').channels.cache.get(category.id).delete();
                    client.guilds.cache.get('837834721772961802').channels.cache.get(text.id).delete();
                    client.guilds.cache.get('837834721772961802').channels.cache.get(voice.id).delete();
                }

                let username, status, id, subject, subjectRole, senderRoles, hostID, hostStatus, hostSubject, hostSubjectRole, hostChannel;

                for (let i = 100001; i <= myData.uId.lastUID; i++) {

                    username = users[i.toString()].discord.discord.toString().split('#')[0]
                    status = users[i.toString()].stat.status
                    id = client.guilds.cache.get('837834721772961802').members.cache.find(member => member.user.username === username).id
                    subject = users[i.toString()].subject.sub
                    subjectRole = client.guilds.cache.get('837834721772961802').roles.cache.find(role =>
                        role.name === 'Subject: '.concat(subject));
                    senderRoles = client.guilds.cache.get('837834721772961802').members.cache.find(member =>
                        member.id === id.toString()).roles;

                    if (studyPeers.includes(username)) {
                        for (let j = 100001; j <= myData.uId.lastUID; j++) {
                            if (users[j.toString()].partners) {
                                if (users[j.toString()].partners.includes(username)) {
                                    hostID = client.guilds.cache.get('837834721772961802').members.cache.find(member =>
                                        member.user.username === users[j.toString()].discord.discord.toString().split('#')[0]).id
                                    hostStatus = users[j.toString()].status
                                    hostSubject = users[j.toString()].subject.sub
                                    hostSubjectRole = client.guilds.cache.get('837834721772961802').roles.cache.find(role =>
                                        role.name === 'Subject: '.concat(hostSubject));


                                    if (hostStatus === 1 || hostStatus === 3 || hostStatus === 5 || hostStatus === 7) {
                                        senderRoles.add(studyRole);
                                        senderRoles.remove(breakRole);
                                        senderRoles.remove(availableRole);
                                        senderRoles.add(hostSubjectRole);
                                        hostChannel = client.guilds.cache.get('837834721772961802').channels.cache.find(c =>
                                            c.name === `${users[j.toString()].discord.discord.toString().split('#')[0]} study room`)
                                        client.guilds.cache.get('837834721772961802').channels.cache.get(hostChannel.id).updateOverwrite(id, {
                                            CONNECT: true,
                                            SEND_MESSAGES: true,
                                            VIEW_CHANNEL: true,
                                        })
                                    } else if (hostStatus === 2 || hostStatus === 4 || hostStatus === 6 || hostStatus === 8) {
                                        senderRoles.remove(studyRole);
                                        senderRoles.add(breakRole);
                                        senderRoles.remove(availableRole);
                                        senderRoles.add(hostSubjectRole);
                                        hostChannel = client.guilds.cache.get('837834721772961802').channels.cache.find(c =>
                                            c.name === `${users[j.toString()].discord.discord.toString().split('#')[0]} study room`)
                                        client.guilds.cache.get('837834721772961802').channels.cache.get(hostChannel.id).updateOverwrite(id, {
                                            CONNECT: true,
                                            SEND_MESSAGES: true,
                                            VIEW_CHANNEL: true,
                                        })
                                    } else if (hostStatus === 0) {
                                        senderRoles.remove(studyRole);
                                        senderRoles.remove(breakRole);
                                        senderRoles.add(availableRole);
                                        senderRoles.remove(hostSubjectRole);
                                    }
                                }
                            }
                        }

                    } else if (status === 1 || status === 3 || status === 5 || status === 7) {
                        senderRoles.add(studyRole);
                        senderRoles.remove(breakRole);
                        senderRoles.remove(availableRole);
                        senderRoles.add(subjectRole)
                        haveChannel(username, id)
                    } else if (status === 2 || status === 4 || status === 6 || status === 8) {
                        senderRoles.remove(studyRole);
                        senderRoles.add(breakRole);
                        senderRoles.remove(availableRole);
                        senderRoles.add(subjectRole);
                        haveChannel(username, id);
                    } else if (status === 0) {
                        senderRoles.remove(studyRole);
                        senderRoles.remove(breakRole);
                        senderRoles.add(availableRole);
                        senderRoles.remove(subjectRole);
                        dontHaveChannel(username);
                    }
                }
            }
        });
    },
};