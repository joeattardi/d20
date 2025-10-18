import type { CommandClient } from './CommandClient.js';
import { loadModules } from './loader.js';

export async function loadCommands(client: CommandClient) {
    const commands = await loadModules('commands');

    commands.forEach((command) => {
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(
                `[WARNING] The command at ${command} is missing a required "data" or "execute" property.`
            );
        }
    });
}
