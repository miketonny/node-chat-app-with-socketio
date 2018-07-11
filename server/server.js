const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { Users } = require('./utils/users');
const { Rooms } = require('./utils/rooms');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server); // web sockets server
const users = new Users();
const rooms = new Rooms();
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');

app.use(express.static(publicPath));

// individual socket connection built in events = socket
io.on('connection', (socket) => {
    // console.log('New user connected');
    io.emit('updateRoomList', rooms.rooms); // broadcast to all channel on connection

    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }
        // check if user name already exists in current name
        const existingUser = users.users.find(u => u.name === params.name
            && u.room === params.room);
        if (existingUser) return callback('Name already taken');
        socket.join(params.room); // joins ppl into the same group to get msg
        const existingRoom = rooms.rooms.find(r => r === params.room);
        if (!existingRoom) {
            rooms.addRoom(params.room); // add new room to list if its not in list
            io.emit('updateRoomList', rooms.rooms); // broadcast to all receipients
        }
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app')); // shows msg to this user

        // broadcast will emit message to all but the one send this
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        return callback();
    });

    socket.on('createMessage', (message, callback) => {
        const user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text)); // io emit emits to all connections
        }
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        const user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
