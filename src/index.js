import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import dotenv from 'dotenv';
import { loadCommands } from './commands.js';

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, (readyClient) => {
    console.log(`🤖 Logged in as ${readyClient.user.tag}`);
});

client.commands = new Collection();
await loadCommands(client);

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) {
        return;
    }

    const command = interaction.client.commands.get(interaction.commandName);

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
});

client.login(process.env.DISCORD_TOKEN);


