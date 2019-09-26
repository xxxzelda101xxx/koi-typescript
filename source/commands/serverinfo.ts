import { NamedCommand } from '../command';
import { MessageEmbed } from 'discord.js';

export default new NamedCommand(
    'serverinfo',
    async (message) => {
        if (message.client.user === null || message.guild === null || message.guild.owner === null)
            return;
        const data = new MessageEmbed()
        data.setTitle(`${message.guild.name} (${message.guild.id})`)
        const icon = message.guild.iconURL()
        if (icon !== null) {
            data.setThumbnail(icon)
        }
        data.addField("Members", message.guild.members.array().length, true)
        data.addField("Roles", message.guild.roles.array().length, true)
        data.addField("Region", message.guild.region, true)
        data.addField("Server Created", `${message.guild.createdAt.getUTCDate()}/${message.guild.createdAt.getUTCMonth()}/${message.guild.createdAt.getUTCFullYear()}`, true)
        data.addField("Server Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
        data.addField("Channels", message.guild.channels.array().length, true);
        await message.channel.send(data);
    },
    'NONE'
);
