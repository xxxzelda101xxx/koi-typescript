import { MatchedCommand } from '../command';

export default new MatchedCommand(
    /<:cl8n:500781451986337793>/,
    async (message) => {
        await message.channel.send({
            files: ['http://i.imgur.com/dLfPsSw.png']
        });
    },
    'NONE'
);
