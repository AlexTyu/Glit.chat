var app = angular.module("beetchat", []);

app.controller("main", function($scope) {
    $scope.socket = io();
    $scope.message = "";
    $scope.user = 0;
    $scope.bgimage = "none";
    $scope.bgcolor = "black";
    $scope.adminTextColor = "red";
    $scope.clientTextColor = "white";

    $scope.popup = false;
    $scope.popupText = "PIZDEC TEBE, OLEГ";

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
            color: $scope.adminTextColor,
            size: $scope.messageSize
        });
        $scope.message = "";
        $scope.messageText = "";
    }

    $scope.socket.on('popup', function(data) {
        $scope.popup = data.popup;
        $scope.$apply();
    })



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
            adminTextColor: $scope.adminTextColor
        });
    }
    $scope.socket.on('adminTextColor', function(data) {
        $scope.adminTextColor = data.adminTextColor;
        $scope.$apply();
    })

    $scope.showPopup = function() {
        $scope.socket.emit("popup", {
            popup: $scope.popup,
        });
    }
    $scope.socket.on('popup', function(data) {
        $scope.popup = data.popup;
        $scope.$apply();
    })


    $scope.updatePopupText = function() {
        $scope.socket.emit("popupText", {
            popupText: $scope.popupText,
        });
    }
    $scope.socket.on('popupText', function(data) {
        $scope.popupText = data.popupText;
        $scope.$apply();
    })


    $scope.updateMessageText = function() {
        $scope.socket.emit("messageText", {
            messageText: $scope.messageText,
        });
    }
    $scope.socket.on('messageText', function(data) {
        $scope.messageText = data.messageText;
        $scope.$apply();
    })


    $scope.submitAnimation = function() {
        $scope.socket.emit("wrapperAnimation", {
            wrapperAnimation: $scope.wrapperAnimation
        });
    }
    $scope.socket.on('wrapperAnimation', function(data) {
        $scope.wrapperAnimation = data.wrapperAnimation;
        $scope.$apply();
    })

    $scope.submitCss = function() {
        $scope.socket.emit("LiveCss", {
            LiveCss: $scope.LiveCss
        });
    }
    $scope.socket.on('LiveCss', function(data) {
        $scope.LiveCss = data.LiveCss;
        $scope.$apply();
    })

});
