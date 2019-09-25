import { Command } from '../interfaces';

function pluralize(text: string, value: number): string {
    return value + ' ' + (value === 1 ? text : text + 's');
}

export default <Command> {
    name: 'botstatus',
    permission: 'NONE',
    action: async (message) => {
        if (message.client.user === null || message.client.uptime === null)
            return;

        const reply: Array<string> = [
            `Hello, I'm ${message.client.user.username}, nice to meet you!`,
            `I'm used by ${pluralize('user', message.client.users.size)} in ${pluralize('server', message.client.guilds.size)} and ${pluralize('channel', message.client.channels.size)}.`,
            `My uptime is ${Math.round(message.client.uptime / 1000 / 60 / 60)} hours, ${Math.round(message.client.uptime / 1000 / 60) % 60} minutes, and ${Math.round(message.client.uptime / 1000) % 60} seconds.`,
            `Memory usage: ${Math.round(process.memoryUsage().rss / 1024 / 1000)}MB`
        ];

        await message.channel.send(reply);
    }
}
