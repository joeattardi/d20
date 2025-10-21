import { TextDisplayBuilder, MessageFlags, SlashCommandBuilder, type Interaction, ContainerBuilder } from 'discord.js';

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

            const container = new ContainerBuilder();
            container.setAccentColor(0x0099ff);
            container.addTextDisplayComponents(textDisplay => textDisplay.setContent(`## 🎲 Dice Roll: ${expression}`));
            container.addTextDisplayComponents(textDisplay => textDisplay.setContent(`<@${interaction.user.id}> rolled ${expression} and got: `));
            container.addTextDisplayComponents(textDisplay => textDisplay.setContent(`# ${total}`));

            await interaction.reply({
                components: [container],
                flags: MessageFlags.IsComponentsV2
            });
        }
    }
}
