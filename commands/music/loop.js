const { MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");
module.exports = {
  name: "loop",
  description: "Loops the Music/ Puts it on repeat!",
  usage: "",
  aliases: ["loops"],
  timeout: 5000,
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SPEAK"],
  run: async (client, message, args) => {
    if (!message.member.voice.channel) {
 
      return message.channel.send("sen önce sesli bir kanala girip müzik açta sonra loop seçeneği işine bakarız");
    }
    if (!client.distube.isPlaying(message)) {

      return message.channel.send(`aynn çalmayan müziğe loop süper fikir!`);
    }

    let mode = null;

    switch (args[0]) {
      case "Kapalı":
        mode = 0;
        break;
      case "Müzik":
        mode = 1;
        break;
      case "queue":
        mode = 2;
        break;
    }

    mode = client.distube.setRepeatMode(message, mode);
    mode = mode ? (mode == 2 ? "Tekrar Queue" : "Tekrar Müzik") : "Kapalı";
 
    message.channel.send(`Loop Ayarlaması Tanımlandı: \`${mode}\` \n Döngü modları arasında geçiş yapmak için Döngü'yü birden çok kez kullan`);
  },
};
