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

socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
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

const locationBtn = $('#send-location'); 
locationBtn.on('click', function (e) {
    if (!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('Unable to fetch ur location');
    });
});