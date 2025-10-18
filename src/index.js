import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import dotenv from 'dotenv';
import { loadCommands } from './commands.js';
import { loadEvents } from './events.js';

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
await loadEvents(client);
await loadCommands(client);

client.login(process.env.DISCORD_TOKEN);
