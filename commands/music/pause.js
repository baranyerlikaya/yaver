const { MessageEmbed, MessageManager } = require("discord.js");
const emoji = require("../../emoji.json");
module.exports = {
  name: "pause",
  description: "Pause Music",
  usage: "",
  aliases: [],
  timeout: 5000,
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SPEAK"],
  run: async (client, message, args) => {
    if (!message.member.voice.channel) {
      return message.channel.send("bi sesli kanala girmen lazım");
    }
    if (!client.distube.isPlaying(message)) {
      return message.channel.send("müzik çalmıyorki???");
    }
    if (client.distube.isPaused(message)) {
      return message.channel.send(`müziği zaten durdurdumya :D?`);
    }

    client.distube.pause(message);
    message.channel.send("Partiye Kısa Bir Ara!. Müzik Durduruldu");
  },
};
