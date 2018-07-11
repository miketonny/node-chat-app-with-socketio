var socket = io();

socket.on('updateRoomList', function (rooms) {
    var template = $('#rooms-template').html();
    rooms.forEach(r => {
        var html = Mustache.render(template, {room: r});
        $('#rooms').append(html);
    });
});