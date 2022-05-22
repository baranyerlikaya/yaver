const { MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");
module.exports = {
  name: "autoplay",
  description: "Toggles Autoplay to ON/OFF",
  usage: "",
  aliases: ["autop"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SPEAK"],
  timeout: 5000,
  run: async (client, message, args) => {
    if (!message.member.voice.channel) {
      return message.channel.send("bu nimeti kullanabilmek için bi sesli kanala girmelisin hani :smirk:");
    }
    if (!client.distube.isPlaying(message)) {
      return message.channel.send(`olmayan müziğe auto play uygula aynnnn knk :smirk:`);
    }

    let mode = client.distube.toggleAutoplay(message);
    const embed = new MessageEmbed()
      .setTitle("Başarılı!")
      .setDescription(
        `${emoji.success} Autoplay Ayarlandı:\`` +
          (mode ? "Açık" : "Kapalı") +
          "`",
      )
      .setColor("BLURPLE");
    message.channel.send(embed);
  },
};
