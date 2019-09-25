import * as Discord from 'discord.js';
import { readdirSync } from 'fs';
import 'reflect-metadata';
import { Command } from './command';
import * as config from '../config.json';

const client = new Discord.Client();
const commands: Array<Command> = [];


for (const dirent of readdirSync(`${__dirname}/commands`, { withFileTypes: true }))
    if (dirent.isFile() && dirent.name.endsWith('.js'))
        commands.push(require(`./commands/${dirent.name}`).default);

client.on('ready', () => {
    if (client.user === null)
        return;

    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'ShinyLan',
            type: 'LISTENING'
        }
    });

    if (config.debug.enabled) {
        const debugChannel = <Discord.TextChannel | Discord.DMChannel> client.channels.get(config.debug.channel_id);
        const handleError = async (error: unknown): Promise<void> => {
            if (error instanceof Error) {
                const message = `Error: [${error.name}] ${error.message}\n` + error.stack;
                await debugChannel.send(message.substring(0, 2000));
            }

            console.error(error);
            process.exit(1);
        }

        if (debugChannel !== undefined && (debugChannel instanceof Discord.TextChannel || debugChannel instanceof Discord.DMChannel)) {
            process.on('uncaughtException', handleError);
            process.on('unhandledRejection', handleError);
        }
    }
});

client.on('message', message => {
    for (const command of commands)
        if (command.match(message.content))
            command.action(message);
});

client.login(config.discord.api_key);
