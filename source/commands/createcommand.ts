import { getConnection } from 'typeorm';
import { NamedCommand } from '../command';
import { CustomCommand } from '../models/customcommand';

export default new NamedCommand(
    'createcommand',
    async (message, args) => {
        if (message.guild === null)
            return;

        const customCommandName = args.substring(0, args.indexOf(' '));
        const customCommand = new CustomCommand(
            message.guild,
            customCommandName,
            args.substring(args.indexOf(' ') + 1)
        );

        await getConnection().getRepository(CustomCommand).insert(customCommand);
        await message.channel.send(`Created new command ${customCommandName}`);
    },
    'NONE'
);
