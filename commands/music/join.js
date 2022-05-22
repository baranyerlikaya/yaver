const emoji = require("../../emoji.json");
module.exports = {
  name: "join",
  description: "Joins The Voice Channel",
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["CONNECT"],
  usage: "",
  aliases: ["summon"],
  timeout: 5000,
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel)
      return message.channel.send(
        `sesli kanalda değilsinki bir sesli kanala gir`,
      );

    try {
      await voiceChannel.join().then((connection) => {
        connection.voice.setSelfDeaf(true);
      });
    } catch (error) {
      return message.channel.send(
        `Hoba Birşeyler Ters Gitti Sistemde Bir **Hata Oluştu!**: ${error}`,
      );
    }
  },
};
