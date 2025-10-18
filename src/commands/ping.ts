import { SlashCommandBuilder, type RepliableInteraction } from 'discord.js';

export const data = new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!');

export async function execute(interaction: RepliableInteraction) {
    await interaction.reply('Pong Refactored!');
}
