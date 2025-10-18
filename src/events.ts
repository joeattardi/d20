import type { Client } from 'discord.js';
import { loadModules } from './loader.js';

interface EventHandler {
    name: string;
    once?: boolean;
    execute: (...args: any[]) => Promise<void> | void;
}

export async function loadEvents(client: Client) {
    const eventHandlers = await loadModules('events');

    eventHandlers.forEach((handler: EventHandler) => {
        const registrationMethod = handler.once ? 'once' : 'on';
        client[registrationMethod](handler.name, (...args) => handler.execute(...args));
    });
}
