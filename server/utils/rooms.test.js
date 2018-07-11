const expect = require('expect');
const { Rooms } = require('./rooms');

describe('rooms', () => {
    const rooms = new Rooms();
    beforeEach(() => {
        rooms.rooms = ['ChatA', 'ChatB'];
    });
    it('should add a new room to list', () => {
        const newRoom = 'Chat 1';
        rooms.addRoom(newRoom);
        expect(rooms.rooms[2]).toEqual(newRoom);
    });
    it('should return all existing rooms in the list', () => {
        const roomList = rooms.getRooms();
        expect(roomList.length).toBe(2);
    });
});
