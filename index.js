const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

// Create client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When ready, run:
client.once("ready", () => {
  console.log("Bot up and running!");
});

// Client commands
client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (e) {
    console.error(e);
    await interaction.reply({
      content: "An error occured attempting to execute this command.",
      ephemeral: true,
    });
  }
});

// Login to Discord with token
client.login(process.env.BOT_TOKEN);
