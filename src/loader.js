import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(
    fileURLToPath(import.meta.url)
);

export async function loadModules(
    moduleDirectory,
    filterFunc = file => file.endsWith('.js'),
) {
    const modulesPath = path.resolve(__dirname, moduleDirectory);
    const files = await fs.readdir(modulesPath);
    const moduleFiles = files.filter(filterFunc);

    const loadedModules = [];

    for (const file of moduleFiles) {
        const module = await import(path.join(modulesPath, file));
        loadedModules.push(module);
    }

    return loadedModules;
}
