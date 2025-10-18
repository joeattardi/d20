import { loadModules } from './loader.js';

export async function loadEvents(client) {
    const eventHandlers = await loadModules('events');

    eventHandlers.forEach(handler => {
        const registrationMethod = handler.once ? 'once' : 'on';
        client[registrationMethod](handler.name, (...args) => handler.execute(...args));
    });
}
