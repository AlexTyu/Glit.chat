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

var messages = [
    {
        user: "0",
        text: "Hello",
        color: ""
    },
    {
        user: "1",
        text: "Are you there",
        color: ""
    },
    {
        user: "0",
        text: "Why do you think you can trust them?",
        color: ""
    }
];

var BG_COLOR = "#ff0000";
var SIZE = 16;
var BGIMAGE = "https://s-media-cache-ak0.pinimg.com/originals/64/d7/27/64d727cedf86f5c82d125e7c14d27134.jpg";

io.on('connection', function (socket) {

    function emitMessages() {
        socket.emit('messages', {
            messages: messages
        });
        socket.broadcast.emit('messages', {
            messages: messages
        });
    }

    function emitOptions() {
        socket.emit('color', {
            color: BG_COLOR
        });
        socket.broadcast.emit('color', {
            color: BG_COLOR
        });
        socket.emit('size', {
            size: SIZE
        });
        socket.broadcast.emit('size', {
            size: SIZE
        });
        socket.emit('bgimage', {
            bgimage: BGIMAGE
        });
        socket.broadcast.emit('bgimage', {
            bgimage: BGIMAGE
        });
    }

    socket.on('new message', function(message) {
        messages.push(message);
        emitMessages();
    });

    socket.on('color', function(data) {
        BG_COLOR = data.color;
        emitOptions();
    });

    socket.on('size', function(data) {
        SIZE = data.size;
        emitOptions();
    });

    socket.on('bgimage', function(data) {
        BGIMAGE = data.bgimage;
        emitOptions();
    });

    emitMessages();
    emitOptions();


  //
  //   socket.emit('avatars', {
  //       avatars: getAvatars()
  //   });
  //
  //   socket.on('register', function(user) {
  //       var _user = new User(user);
  //       _users.push(_user);
  //       _availableAvatars.splice(_availableAvatars.indexOf(_user.avatar.name), 1);
  //       if(socket.avatar) {
  //           _availableAvatars.push(socket.avatar);
  //       }
  //       socket.avatar = _user.avatar.name;
  //       socket.emit('avatars', {
  //           avatars: getAvatars()
  //       });
  //       socket.broadcast.emit('avatars', {
  //           avatars: getAvatars()
  //       });
  //   });
  //
  //   socket.on('disconnect', function() {
  //       _availableAvatars.push(socket.avatar);
  //       socket.broadcast.emit('avatars', {
  //           avatars: getAvatars()
  //       });
  //   });
  //
  // // when the client emits 'new message', this listens and executes
  // socket.on('new message', function (data) {
  //   // we tell the client to execute 'new message'
  //   socket.broadcast.emit('new message', {
  //       username: socket.username,
  //       message: data,
  //       date: new Date()
  //   });
  // });
  //
  // // when the client emits 'add user', this listens and executes
  // socket.on('add user', function (username) {
  //   if (addedUser) return;
  //
  //   // we store the username in the socket session for this client
  //   socket.username = username;
  //   ++numUsers;
  //   addedUser = true;
  //   socket.emit('login', {
  //     numUsers: numUsers
  //   });
  //   // echo globally (all clients) that a person has connected
  //   socket.broadcast.emit('user joined', {
  //     username: socket.username,
  //     numUsers: numUsers
  //   });
  // });
  //
  // // when the client emits 'typing', we broadcast it to others
  // socket.on('typing', function () {
  //   socket.broadcast.emit('typing', {
  //     username: socket.username
  //   });
  // });
  //
  // // when the client emits 'stop typing', we broadcast it to others
  // socket.on('stop typing', function () {
  //   socket.broadcast.emit('stop typing', {
  //     username: socket.username
  //   });
  // });
  //
  // // when the user disconnects.. perform this
  // socket.on('disconnect', function () {
  //   if (addedUser) {
  //     --numUsers;
  //
  //     // echo globally that this client has left
  //     socket.broadcast.emit('user left', {
  //       username: socket.username,
  //       numUsers: numUsers
  //     });
  //   }
  // });
});
