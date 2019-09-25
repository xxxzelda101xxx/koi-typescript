import { Command } from '../interfaces';

function pluralize(text: string, value: number): string {
    return value + ' ' + (value === 1 ? text : text + 's');
}

export default <Command> {
    name: 'botstatus',
    permission: 'NONE',
    action: async (message) => {
        const client = message.client;
        const reply: Array<string> = [
            `Hello, I'm ${client.user.username}, nice to meet you!`,
            `I'm used by ${pluralize('user', client.users.size)} in ${pluralize('server', client.guilds.size)} and ${pluralize('channel', client.channels.size)}.`,
            `My uptime is ${Math.round(client.uptime / 1000 / 60 / 60)} hours, ${Math.round(client.uptime / 1000 / 60) % 60} minutes, and ${(client.uptime / 1000) % 60} seconds.`,
            `Memory usage: ${Math.round(process.memoryUsage().rss / 1024 / 1000)}MB`
        ];

        await message.channel.send(reply);
    }
}
