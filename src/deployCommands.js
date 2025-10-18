import { REST, Routes } from 'discord.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

const commands = [];

const commandsPath = path.resolve('./commands');
const commandFiles = await fs.readdir(commandsPath);

for (const file of commandFiles) {
    if (file === 'index.js' || !file.endsWith('.js')) {
        continue;
    }

    const command = await import(path.join(commandsPath, file));
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(
            `[WARNING] The command at ${file} is missing a required "data" or "execute" property.`
        );
    }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);
const data = await rest.put(
    Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
    { body: commands }
);
console.log('Successfully reloaded application (/) commands.');
