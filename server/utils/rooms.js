class Rooms {
    constructor() {
        this.rooms = ['default'];
    }

    addRoom(name) {
        this.rooms.push(name);
    }

    getRooms() {
        return this.rooms;
    }
}

module.exports = { Rooms };
