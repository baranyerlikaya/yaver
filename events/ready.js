const client = require('../index')
const { prefix } = require('../config.json')
const emoji = require(`.././emoji.json`)
const moment = require('moment');
const Discord = require(`discord.js`)
client.on('ready', async() => {
    const ArrayStatus = [
        `slm köleler`,
        `ya uf neyim ben ya`,
        `${client.users.cache.size} tane köle`,
        `meep noob!`, 
        'abisi devlopırım diyorum',
        'depwesyon',
        'sktı canısı',
        'ne ölüm ne zulüm birtek sen varsın gülüm',
        'meepde zenginmi ya',
        'ara beni güzelim'
    ];

    let index = 0;
    setInterval(() => {
        if(index === ArrayStatus.length) index = 0;
        const status = ArrayStatus[index]
        client.user.setActivity(status);
        index++;
    }, 15000)
    let usersCount = 0;
    for (const guild of client.guilds.cache) {
    usersCount += (await guild[1].members.fetch()).size
    }
    await console.log(`${client.user.tag} is now connected to Discord, Cached ${usersCount} Users`);



    const channel = client.channels.cache.get(`861004756738375700`)
    const time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); 
    const text = `${emoji.online} **${client.user.tag}** is now online \n \n ${emoji.success} **${time}** \n \n ${emoji.member} **Cached ${usersCount} Users**`

    const embed = new Discord.MessageEmbed()
    .setDescription(text)
    .setColor(`GREEN`)
    channel.send(embed)


})
