var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
    // socket.emit('createEmail', {
    //     to: 'jen@example.com',
    //     text: 'hey, its jen'
    // });
    // socket.emit('createMessage', {
    //     from: 'Andy',
    //     text: 'yes, works'
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// socket.emit('createMessage', {
//     from: 'frank',
//     text: 'hi',
// }, function (data) {
//     console.log('Got it', data);
// });

socket.on('newMessage', function (msg) {
    console.log('new message', msg);
    var li = $('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);
    $('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function () {

    });
});
