const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const message = { text: 'test msg', from: 'tester' };
        const newMsg = generateMessage(message.from, message.text);
        expect(newMsg).toMatchObject(message);
        expect(typeof newMsg.createdAt).toBe('number');
    });
});
