import { MessageEmbed } from 'discord.js';
import { NamedCommand } from '../command';

export default new NamedCommand(
    'serverinfo',
    async (message) => {
        if (message.guild === null || message.guild.owner === null)
            return;

        const embed = new MessageEmbed({ title: `${message.guild.name} (${message.guild.id})` });

        const icon = message.guild.iconURL();
        if (icon !== null)
            embed.setThumbnail(icon);

        embed.addField('Members', message.guild.members.size, true);
        embed.addField('Roles', message.guild.roles.size, true);
        embed.addField('Region', message.guild.region, true);
        embed.addField('Server created', `${message.guild.createdAt.getUTCDate()}/${message.guild.createdAt.getUTCMonth()}/${message.guild.createdAt.getUTCFullYear()}`, true);
        embed.addField('Server owner', `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true);
        embed.addField('Channels', message.guild.channels.size, true);

        await message.channel.send(embed);
    },
    'NONE'
);
