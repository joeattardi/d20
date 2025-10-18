import { Events, MessageFlags, type Interaction } from 'discord.js';
import type { CommandClient } from '../CommandClient.js';

export const name = Events.InteractionCreate;
export async function execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) {
        return;
    }

    const client = interaction.client as CommandClient;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            flags: MessageFlags.Ephemeral
        });
    }
}
