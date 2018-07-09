const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server); // web sockets server
const {generateMessage} = require('./utils/message');

app.use(express.static(publicPath));

// individual socket connection built in events = socket
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // broadcast will emit message to all but the one send this
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text)); // io emit emits to all connections
        callback('this is from the server');
        // broadcast will emit message to all but the one send this
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: message.createdAt,
        // });
    });
});




server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
