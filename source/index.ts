import * as Discord from 'discord.js';
import { readdirSync } from 'fs';

import * as config from '../config.json';
import { Command } from './interfaces';

const client = new Discord.Client();
const commands: Array<Command> = [];

for (const dirent of readdirSync(`${__dirname}/commands`, { withFileTypes: true }))
    if (dirent.isFile() && dirent.name.endsWith('.js'))
        commands.push(require(`./commands/${dirent.name}`).default);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'ShinyLan',
            type: 'LISTENING'
        }
    });
});

client.on('message', message => {
    if (message.content.startsWith(config.discord.command_prefix)) {
        const withoutPrefix = message.content.substring(config.discord.command_prefix.length);

        for (const command of commands)
            if (withoutPrefix.startsWith(command.name + ' '))
                command.action(message);
    }
});

client.login(config.discord.api_key);
