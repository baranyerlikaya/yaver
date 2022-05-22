const client = require("../index");
const emoji = require("../emoji.json");
const { Collection, MessageEmbed } = require("discord.js");
const { prefix, invite } = require("../config.json");
const prefixSchema = require("../models/prefix");
const Timeout = new Collection();
const ms = require("ms");
const premiumServer = require("../models/premium");
const blacklist = require("../models/blacklist");
const schema = require("../models/custom-commands");

client.on("message", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  //anti-ping
  
  //prefix
  const p = await client.prefix(message);
  if (message.mentions.users.first()) {
    const embedPinged = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`Hello my name is **${client.user.tag}**`)
      .setDescription(
        "I am a multi-purpose discord bot meant to help your server!",
      )
      .addField(
        "My usage",
        `My prefix in this server is \`${p}\` and you can start by typing \`${p}help\` to see all my commands`,
      )
      .addField(
        "My Invites",
        `[Support](${invite}) | [Invite Me](https://dsc.gg/corex) |  [Vote for me](https://top.gg/bot/819643325177921587/vote)`,
      )
      .setFooter("Thanks 💖", client.user.displayAvatarURL({ dynamic: true }));
    if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES"))
      return;
    if (message.content === `<@!${client.user.id}>`)
      return message.channel.send(embedPinged);
  }
  if (!message.content.startsWith(p)) return;
  if (!message.member)
    message.member = await message.guild.members.fetch(message);
  //command handling
  const args = message.content.slice(p.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length == 0) return;
  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));
  //premium stuff
  let premium = await premiumServer.findOne({ Guild: message.guild.id });

  blacklist.findOne({ id: message.author.id }, async (err, data) => {
    if (err) throw err;
    if (!data) {
      const data = await schema.findOne({
        Guild: message.guild.id,
        Command: cmd,
      });
      if (data) message.channel.send(data.Response);

      if (command) {
        if (command.primeOnly == true && !premium)
          return message.reply(`${emoji.error} This command is premium only!`);
        //permission handler
        if (!message.member.hasPermission(command.userPerms || []))
          return message.lineReply(
            new MessageEmbed()
              .setColor("RED")
              .setDescription(
                `${emoji.error} You do not have the permission \`${command.userPerms}\``,
              ),
          );

        if (!message.guild.me.hasPermission(command.clientPerms || []))
          return message.lineReply(
            new MessageEmbed()
              .setColor("RED")
              .setDescription(
                `${emoji.error} I do not have the permission \`${command.userPerms}\``,
              ),
          );
        //cooldown stuff
        if (command.timeout) {
          if (Timeout.has(`${command.name}${message.author.id}`))
            return message.channel.send(
              `Woah chill out, you are on \`${ms(
                Timeout.get(`${command.name}${message.author.id}`) - Date.now(),
                { long: true },
              )}\` cooldown.`,
            );
          command.run(client, message, args);
          Timeout.set(
            `${command.name}${message.author.id}`,
            Date.now() + command.timeout,
          );
          setTimeout(() => {
            Timeout.delete(`${command.name}${message.author.id}`);
          }, command.timeout);
        }
      }
    } else {
      let server = `[Server](${invite})`;

      message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTitle(
            `${emoji.ban} You have been blacklisted from using **${client.user.tag}**`,
          )
          .addField("Reason", `\`\`\`${data.reason}\`\`\``)
          .setDescription(
            "If you would like to get whitelisted you can join the support " +
              server,
          ),
      );
    }
  });
});

client.on("guildDelete", async (guild) => {
  prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
    if (!data) return;
    if (err) throw err;
    if (data) {
      prefixSchema.findOneAndDelete({ Guild: guild.id });
    }
  });
});

client.on("guildDelete", async (guild) => {
  schema.findOne({ Guild: guild.id }, async (err, data) => {
    if (!data) return;
    if (err) throw err;
    if (data) {
      schema.findOneAndDelete({ Guild: guild.id });
    }
  });
});

client.on("guildDelete", async (guild) => {
  antiPing.findOne({ Guild: guild.id }, async (err, data) => {
    if (!data) return;
    if (err) throw err;
    if (data) {
      antiPing.findOneAndDelete({ Guild: guild.id });
    }
  });
});