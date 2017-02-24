// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

var MESSAGES = [
    {
        user: "1",
        text: "[103.231.481.213]. Ping 424ms",
        textColor: "gray",
    },
    {
        user: "1",
        text: "Connection established",
        textColor: "gray",
    },
    {
        user: "0",
        text: "ОLEГ",
        textColor: "red",
        textSize: "40"
    },
    {
        user: "0",
        text: "Are you there?",
        textColor: "red"
    },
    {
        user: "0",
        text: "Why do you think you can trust them?",
        textColor: "red"
    }
];

var OPTIONS = {
    textColor: "#f00",
    textSize: 16,
    bgColor: "#000000",
    bgImage: "none",
    wrapperAnimation: "none",
    inputText: "",
    LiveCss: ""
};

io.on('connection', function (socket) {

    function emitMessages() {
        socket.emit('messages', {
            messages: MESSAGES
        });
        socket.broadcast.emit('messages', {
            messages: MESSAGES
        });
    }

    function emitOptions() {
        socket.emit('options', {
            options: OPTIONS
        });
        socket.broadcast.emit('options', {
            options: OPTIONS
        });
    }

    socket.on('options', function(data) {
        OPTIONS = data;
        emitOptions();
    });

    socket.on('new message', function(message) {
        MESSAGES.push(message);
        OPTIONS.inputText = "";
        emitMessages();
    });

    emitMessages();
    emitOptions();

});
