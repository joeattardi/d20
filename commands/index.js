import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(client) {
    const commandsPath = path.resolve(__dirname);
    const commandFiles = await fs.readdir(commandsPath);

    for (const file of commandFiles) {
        if (file === 'index.js' || !file.endsWith('.js')) {
            continue;
        }

        const command = await import(path.join(commandsPath, file));
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(
                `[WARNING] The command at ${file} is missing a required "data" or "execute" property.`
            );
        }
    }
}
