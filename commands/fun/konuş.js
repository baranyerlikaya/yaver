
module.exports = {
    name: 'konuş',
    aliases: ["sor","ai"],
    timeout: 1000,
    hidden: true,
    run: async(bot, message, args) => {
      const argx = await args[0]
      const ai = require('@codare/codare.ai')

ai.ayarla(message.author.id)//kullanıcı adı/id belirtiyoruz

ai.sorv2(argx).then(res => {
    message.channel.send(res)  //Garip soruları cevaplıyorum.
    })
    }
}