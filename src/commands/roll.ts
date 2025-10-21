import { CommandInteraction, SlashCommandBuilder, type Interaction, type RepliableInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Rolls dice')
    .addStringOption(option => option.setName('dice')
        .setDescription('The dice to roll (e.g. 2d6+3)')
        .setRequired(true));

export async function execute(interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
        const expression = interaction.options.getString('dice');
        if (expression) {
            const [dice, modifier] = expression.toLowerCase().split('+');

            if (!dice) {
                await interaction.reply('Invalid dice expression.');
                return;
            }

            const [diceCount, diceType] = dice.split('d').map(Number);
            if (!diceCount || isNaN(diceCount) || !diceType || isNaN(diceType) || diceCount <= 0 || diceType <= 0) {
                await interaction.reply('Invalid dice expression.');
                return;
            }

            let total = 0;
            for (let i = 0; i < diceCount; i++) {
                total += Math.floor(Math.random() * diceType) + 1;
            }
            if (modifier) {
                total += Number(modifier);
            }

            await interaction.reply(`${interaction.user.displayName} rolled a total of ${total}!`);
        }
    }
}
