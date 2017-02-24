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
        user: "0",
        text: "[103.231.481.213]. Ping 424ms",
        textColor: "gray",
    },
    {
        user: "0",
        text: "Connection established",
        textColor: "gray",
    },
    {
        user: "0",
        text: "Hello?",
        textColor: "red",
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
    LiveCss: "",
    popupBg: "http://49.media.tumblr.com/79222e3f67bc37408e9a6825f5eb2188/tumblr_o4at51bG4M1s4fz4bo1_500.gif"
};

var CLIENT = "";

io.on('connection', function (socket) {


      function emitUser() {
          socket.broadcast.emit('user joined', {
            user: socket.user
          });
      }

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

    socket.on('new user', function(message) {

        emitUser();
    });

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
    emitUser();

});
