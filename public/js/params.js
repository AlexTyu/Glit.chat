var app = angular.module("beetchat", []);

app.controller("main", function($scope) {
    $scope.socket = io();
    $scope.message = "";
    $scope.user = 0;

    $scope.color = "";
    $scope.bgimage = "https://s-media-cache-ak0.pinimg.com/originals/64/d7/27/64d727cedf86f5c82d125e7c14d27134.jpg";

    var $messages = document.getElementById('messages');

    $scope.socket.on('messages', function(data) {
        $scope.messages = data.messages;
        $scope.$apply();
        $messages.scrollTop = $messages.scrollHeight;
    })

    $scope.sendMessage = function() {
        $scope.socket.emit("new message", {
            user: $scope.user,
            text: $scope.message
        });
        $scope.message = "";
    }

    $scope.socket.on('color', function(data) {
        $scope.color = data.color;
        $scope.$apply();
    })

    $scope.socket.on('size', function(data) {
        $scope.size = data.size;
        $scope.$apply();
    })

    $scope.socket.on('bgimage', function(data) {
        $scope.bgimage = data.bgimage;
        $scope.$apply();
    })

    $scope.updateColor = function() {
        $scope.socket.emit("color", {
            color: $scope.color
        });
    }

    $scope.updateSize = function() {
        $scope.socket.emit("size", {
            size: $scope.size
        });
    }

    $scope.updateBgImage = function() {
        $scope.socket.emit("bgimage", {
            bgimage: $scope.bgimage
        });
    }


});
