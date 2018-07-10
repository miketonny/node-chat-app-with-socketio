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
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    // var li = $('<li></li>');
    // li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
    // $('#messages').append(li);
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from, 
        url: message.url,
        createdAt: formattedTime
    })
    // var li = $('<li></li>');
    // var a = $('<a target="_blank">My Current location</a>');
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    $('#messages').append(html);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

const locationBtn = $('#send-location'); 
locationBtn.on('click', function (e) {
    if (!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }
    locationBtn.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationBtn.removeAttr('disabled').text('Send location...');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationBtn.removeAttr('disabled').text('Send location...');
        alert('Unable to fetch ur location');
    });
});