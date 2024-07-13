import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('leetcode')
	.setDescription('Reads leetcode username')
	.addStringOption(option =>
		option.setName('username')
			.setDescription('Your LeetCode username')
			.setRequired(true));

export async function execute(interaction) {
	const username = interaction.options.getString('username');
	await interaction.reply(`You entered: ${username}`);
}
