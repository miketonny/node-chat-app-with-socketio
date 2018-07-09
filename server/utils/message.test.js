const expect = require('expect');
const { generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const message = { text: 'test msg', from: 'tester' };
        const newMsg = generateMessage(message.from, message.text);
        expect(newMsg).toMatchObject(message);
        expect(typeof newMsg.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct message object', () => {
        const message = { from: 'Admin', latitude: 15, longitude: 19 };
        const newMsg = generateLocationMessage(message.from, message.latitude, message.longitude);
        const url = 'https://www.google.com/maps?q=15,19';
       
        expect(typeof newMsg.createdAt).toBe('number');
        // expect(newMsg).toMatchObject(url);
        expect(newMsg.url).toEqual(url);
    });
});