var app = angular.module("beetchat", []);

app.controller("main", function($scope) {
    $scope.socket = io();
    $scope.message = "";
    $scope.user = 0;

    $scope.bgimage = "none";
    $scope.bgcolor = "black";
    $scope.textcolor = "white";

    var $messages = document.getElementById('messages');

    $scope.socket.on('messages', function(data) {
        $scope.messages = data.messages;
        $scope.$apply();
        $messages.scrollTop = $messages.scrollHeight;
    })

    $scope.sendMessage = function() {
        $scope.socket.emit("new message", {
            user: $scope.user,
            text: $scope.messageText,
            color: $scope.messageColor,
            size: $scope.messageSize
        });
        $scope.message = "";
    }


    $scope.updateSize = function() {
        $scope.socket.emit("size", {
            size: $scope.size
        });
    }

    $scope.socket.on('size', function(data) {
        $scope.size = data.size;
        $scope.$apply();
    })

    $scope.updateBgImage = function() {
        $scope.socket.emit("bgimage", {
            bgimage: $scope.bgimage
        });
    }

    $scope.socket.on('bgimage', function(data) {
        $scope.bgimage = data.bgimage;
        $scope.$apply();
    })

    $scope.updateBgColor = function() {
        $scope.socket.emit("bgcolor", {
            bgcolor: $scope.bgcolor
        });
    }

    $scope.socket.on('bgcolor', function(data) {
        $scope.bgcolor = data.bgcolor;
        $scope.$apply();
    })

    $scope.updateTextColor = function() {
        $scope.socket.emit("textcolor", {
            textcolor: $scope.textcolor
        });
    }

    $scope.socket.on('textcolor', function(data) {
        $scope.textcolor = data.textcolor;
        $scope.$apply();
    })


});
