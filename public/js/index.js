var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
    // socket.emit('createEmail', {
    //     to: 'jen@example.com',
    //     text: 'hey, its jen'
    // });
    socket.emit('createMessage', {
        from: 'Andy',
        text: 'yes, works'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// socket.on('newEmail', function (email) {
//     console.log('New email', email);
// });

socket.on('newMessage', function (msg) {
    console.log('new message', msg);
});
