import * as Discord from 'discord.js';
import * as Config from '../config.json';

const client = new Discord.Client();

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

client.login(Config.discord.api_key);
