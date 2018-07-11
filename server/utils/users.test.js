const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'roomA',
        }, {
            id: '2',
            name: 'Joe',
            room: 'roomA',
        }, {
            id: '3',
            name: 'Ken',
            room: 'roomB',
        }];
    });
    it('should add new user', () => {
        users = new Users();
        const newUser = { id: '123', name: 'Mike', room: 'a' };
        users.addUser(newUser.id, newUser.name, newUser.room);
        expect(users.users).toEqual([newUser]);
    });
    it('should remove a user', () => {
        const user = users.users[0];
        const deletedUser = users.removeUser(user.id);
        expect(deletedUser).toMatchObject(user);
        expect(users.users.length).toBe(2);
    });
    it('should get all user from one room', () => {
        const userList = users.getUserList('roomA');
        expect(userList).toEqual(['Mike', 'Joe']);
    });
    it('should find a user with given id', () => {
        const user = users.getUser('1');
        expect(user).toMatchObject(users.users[0]);
    });
    it('should not find a user', () => {
        const userId = '99';
        const user = users.getUser(userId);
        expect(user).toBeUndefined();
    });
});
