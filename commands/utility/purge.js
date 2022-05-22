const { MessageEmbed } = require("discord.js");
const emoji = require("../../emoji.json");

module.exports = {
  name: "purge",
  timeout: 1000 * 5,
  description: "Clears messages,",
  userPerms: ["MANAGE_MESSAGES"],
  clientPerms: ["MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    try {
      const amount = parseInt(args[0]);
      if (isNaN(amount) === true || !amount || amount < 0 || amount > 100)
        return message.channel.send(
          "1-100 Arasında bi rakam belirt enai",
        );

      await message.channel
        .bulkDelete(amount, true)
        .catch((err) => console.log(err));
      message.channel
        .send(`\`${amount}\` tanecik mesaj silindi `)
        .then((msg) => msg.delete({ timeout: 5000 }));
    } catch (e) {
      message.channel.send(`Lan!!!!, There has been an error, **${e}**`);
    }
  },
};
