import { Guild, Message } from 'discord.js';
import { Column, Index, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Index(['name', 'guildId'], { unique: true })
export class CustomCommand {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public guildId: string;

    @Column('text')
    private reply: string;

    public constructor(guild: Guild, name: string, reply: string) {
        this.name = name;
        this.guildId = guild.id;
        this.reply = reply;
    }

    public respond(message: Message): Promise<Message> {
        return message.channel.send(this.reply);
    }
}
