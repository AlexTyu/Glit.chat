var app = angular.module("beetchat", []);
var Socket = io();

app.controller("main", function($scope) {

    $scope.message = {};

    Socket.on('messages', function(data) {
        $scope.messages = data.messages;
        $scope.$apply();
        if( document.getElementById('messages') ) {
            document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
        }
    })

    Socket.on('options', function(data) {
        $scope.options = data.options;
        $scope.$apply();
    })

    $scope.updateOptions = function() {
        Socket.emit("options", {
            textColor: $scope.options.textColor,
            textSize: $scope.options.textSize,
            bgColor: $scope.options.bgColor,
            bgImage: $scope.options.bgImage,
            wrapperAnimation: $scope.options.wrapperAnimation,
            popup: $scope.options.popup,
            popuptext: $scope.options.popuptext,
            inputText: $scope.message.text
        });
    }



    $scope.sendMessage = function() {
        Socket.emit("new message", {
            user: $scope.user,
            text: $scope.message.text,
            textColor: $scope.message.textColor,
            textSize: $scope.message.textSize
        });
        $scope.message.text = "";
    }

});
