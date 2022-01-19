const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user information.'),
	async execute(interaction) {
		await interaction.reply(
         `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
       );
	},
};
