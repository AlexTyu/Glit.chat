// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 80;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

var MESSAGES = [
    {
        user: "0",
        text: "[http://138.68.7.45]. Ping 424ms",
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
    bgImage: "",
    wrapperAnimation: "none",
    inputText: "",
    LiveCss: "",
    popupBg: "",
    popupTextColor: "white",
    popup: true,
    popuptext: 'Enter PIN',
    popupBg: 'black',
    popupTextColor: 'white',
    showMessages: false,
    blendMode: 'normal',
    userInputType: 'password',
    userInputModel: 'message',
    userInputAction : '',
    glitcherLayover: false
};

var oleg = false;

io.on('connection', function (socket) {

    var handshakeData = socket.request;
    if( handshakeData._query['user'] == 1 ) {
      oleg = true;
      emitOleg(oleg);
    }
    else {
      statusColor = 'red'
    }

    function emitOleg(status) {
      socket.emit('oleg', {
          oleg: status
      });
      socket.broadcast.emit('oleg', {
          oleg: status
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

    // socket.on('new user', function(message) {
    //     emitUser();
    // });

    socket.on('options', function(data) {
        OPTIONS = data;
        emitOptions();
    });

    socket.on('new message', function(message) {
        MESSAGES.push(message);
        OPTIONS.inputText = "";
        emitMessages();
    });

    socket.on('disconnect', function () {
        if( handshakeData._query['user'] == 1 ) {
            oleg = false;
        }
        emitOleg(oleg);
    });


    emitMessages();
    emitOptions();
    // emitUser();

});
