import * as Discord from 'discord.js';
import { readdirSync } from 'fs';
import 'reflect-metadata';
import { createConnection, getConnection } from 'typeorm';
import { Command } from './command';
import * as config from '../config.json';
import { CustomCommand } from './models/customcommand';

const client = new Discord.Client();
const commands: Array<Command> = [];

createConnection();

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
        const debugChannel = <Discord.TextChannel> client.channels.get(config.debug.channel_id);

        if (debugChannel !== undefined && debugChannel instanceof Discord.TextChannel) {
            const handleError = async (error: unknown): Promise<void> => {
                if (error instanceof Error)
                    await debugChannel.send(`**Unhandled error:**\n${error.stack}`.substring(0, 2000));

                console.error(error);
                process.exit(1);
            }

            process.on('uncaughtException', handleError);
            process.on('unhandledRejection', handleError);
        }
    }
});

client.on('message', message => {
    for (const command of commands)
        if (command.match(message.content)) {
            const spaceIndex = message.content.indexOf(' ', config.discord.command_prefix.length);
            const args = spaceIndex === -1 ? '' : message.content.substring(spaceIndex + 1);

            command.action(message, args);
        }

    if (message.guild !== null) {
        const commandMatch = message.content.match(new RegExp(`${config.discord.command_prefix}(.+?)(\\s|$)`));

        if (commandMatch !== null)
            getConnection()
                .getRepository(CustomCommand)
                .findOne({
                    name: commandMatch[1],
                    guildId: message.guild.id
                })
                .then(customCommand => {
                    if (customCommand !== undefined)
                        customCommand.respond(message);
                });
    }
});

client.login(config.discord.api_key);
