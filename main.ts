import * as Discord from 'discord.js';
import * as config from "./config.json";
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(config.discord.api_key);