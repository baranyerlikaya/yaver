const { MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");
module.exports = {
  name: "play",
  description: "plays a song",
  usage: "<link/name of song>",
  timeout: 5000,
  userPerms: ["SEND_MESSAGES"],
  clientPerms: ["SPEAK"],
  run: async (client, message, args) => {
    if (!message.member.voice.channel) {
      return message.channel.send("SESLİ KANALA GİRERSEN Bİ MÜZİK ÇALABİLİRSİN GÖKTEN VAHİY İNMEYECEK SANA :face_with_symbols_over_mouth: :face_with_symbols_over_mouth: ");
    }
    const voiceChannel = message.member.voice.channel;
    const permissions = voiceChannel.permissionsFor(message.client.user);

    if (!permissions.has("CONNECT")) {
      return message.channel.send("bu kadarına benim boynuz yetmez. yetkim yok çalamıyorum müzik");
    }

    let songName = args.slice(0).join(" ");
    if (!songName) {
      return message.channel.send("bi isim söyle yada url ver çalam sana");
    }

    try {
      voiceChannel.join().then((connection) => {
        connection.voice.setSelfDeaf(true);
      });
      client.distube.play(message, songName);
    } catch (err) {
      message.channel.send(
        `lan noluyo lan sistemimde garip şeyler dönüyo srry çalamıyorum müzik\n\nError: ||${err}||`,
      );
    }
  },
};
