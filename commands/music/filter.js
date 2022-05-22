const { MessageEmbed } = require("discord.js");
const { setFilter } = require("distube");
const emoji = require("../../emoji.json");
module.exports = {
  name: "filter",
  description:
    "Set Music Filter! \n Filter Option: `3d, bassboost, echo, karaoke, nightcore, vaporwave`",
  usage: "<filterOption>",
  aliases: ["setfilter"],
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SEND_MESSAGES"],
  timeout: 5000,
  run: async (client, message, args) => {
    if (!message.member.voice.channel) {
      return message.channel.send("müziğe bir filtre eklemek için sesli kanalda olmalısın :smirk:");
    }
    if (!client.distube.isPlaying(message)) {
      return message.channel.send("Burda Hiçbirşey Çalmıyor :neutral_face:");
    }

    let filterOption = args[0];
    if (!args[0]) {
      const filterOptions = new MessageEmbed()
        .setTitle(`**Filter Seçenekleri:**`)
        .setDescription(
          `\`3d, bassboost, echo, karaoke, nightcore, vaporwave\``,
        )
        .setColor("BLURPLE");

      return message.channel.send(filterOptions);
    }

    try {
      await client.distube.setFilter(message, filterOption);

      return message.channel.send(`Müzik Filtresi Ayarlandı: ` +
            `**${filterOption}**` || "Kapalı",);
    } catch (error) {
      return;
    }
  },
};
