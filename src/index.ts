import { GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { CommandClient } from './CommandClient.js';
import { loadCommands } from './commands.js';
import { loadEvents } from './events.js';

dotenv.config();

if (!process.env.DISCORD_TOKEN) {
    throw new Error('DISCORD_TOKEN is not defined in environment variables.');
}

const client = new CommandClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

await loadEvents(client);
await loadCommands(client);

client.login(process.env.DISCORD_TOKEN);
