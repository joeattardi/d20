import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import { loadModules } from './loader.js';

dotenv.config();

const commands = [];

const commandFiles = await loadModules('commands');

for (const command of commandFiles) {
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(
            `[WARNING] The command at ${command} is missing a required "data" or "execute" property.`
        );
    }
}

if (!process.env.DISCORD_TOKEN) {
    throw new Error('DISCORD_TOKEN is not defined in environment variables.');
}

if (!process.env.DISCORD_CLIENT_ID) {
    throw new Error('DISCORD_CLIENT_ID is not defined in environment variables.');
}

if (!process.env.DISCORD_GUILD_ID) {
    throw new Error('DISCORD_GUILD_ID is not defined in environment variables.');
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);
const data = await rest.put(
    Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
    { body: commands }
);
console.log('Successfully reloaded application (/) commands.');
