import { Client, Events } from 'discord.js';

export const name = Events.ClientReady;
export const once = true;
export function execute(readyClient: Client) {
    if (readyClient.user) {
        console.log(`🤖 Logged in as ${readyClient.user.tag}`);
    }
}
