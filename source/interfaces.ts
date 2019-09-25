import { Message } from 'discord.js';

export interface Command {
    name: string;
    permission: 'NONE'|'TRUSTED'|'ADMIN';
    action: (message: Message) => Promise<void>;
}
