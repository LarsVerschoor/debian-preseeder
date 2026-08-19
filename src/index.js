import { readFile } from "node:fs/promises";
import getConfig from './config.js';
import { startServer } from './server.js';
import getLocalIpAddress from "./ip-address.js";
import { readGrubConfigFromImage, addPreseedUrlToImage } from './iso-image.js';

const [config, template] = await Promise.all([
	getConfig(),
	readFile('./preconfiguration.txt', 'utf8')
]);

let preseed = template;

for (const [key, value] of Object.entries(config.template)) {
	preseed = preseed.replaceAll(`{{${key}}}`, value);
}

console.log('\nPreseed config made.');

startServer(preseed);

console.log(readGrubConfigFromImage(config.image.path));
