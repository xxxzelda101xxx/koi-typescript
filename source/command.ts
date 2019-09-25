import { Message } from 'discord.js';
import { discord } from '../config.json';

export abstract class Command {
    public constructor(
        public action: (message: Message) => Promise<void>,
        public permission: 'NONE'|'TRUSTED'|'ADMIN'
    ) {}

    public abstract match(message: string) : boolean;
}

export class MatchedCommand extends Command {
    public constructor(
        private pattern: RegExp,
        action: (message: Message) => Promise<void>,
        permission: 'NONE'|'TRUSTED'|'ADMIN'
    ) {
        super(action, permission);
    }

    public match(message: string): boolean {
        return message.search(this.pattern) !== -1;
    }
}

export class NamedCommand extends Command {
    public constructor(
        private name: string,
        action: (message: Message) => Promise<void>,
        permission: 'NONE'|'TRUSTED'|'ADMIN'
    ) {
        super(action, permission);
    }

    public match(message: string): boolean {
        return message.search(new RegExp(`${discord.command_prefix}${this.name}(\\s|$)`)) !== -1;
    }
}
