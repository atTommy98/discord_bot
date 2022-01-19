const { Client, Intents, Interaction } = require("discord.js");
require("dotenv").config();

// Create client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When ready, run:
client.once("ready", () => {
  console.log("Bot up and running!");
});

// Listen for commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "server") {
    await interaction.reply(
      `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
    );
  } else if (commandName === "user") {
    await interaction.reply(
      `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
    );
  }
});

// Login to Discord with token
client.login(process.env.BOT_TOKEN);
