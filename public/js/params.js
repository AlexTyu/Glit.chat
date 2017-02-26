var app = angular.module("beetchat", []);


document.documentElement.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, false);

app.controller("main", function($scope) {

    console.log($scope.user);

    $scope.message = {};
    $scope.message.textColor = "red";


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

    Socket.on('oleg', function(data) {
        $scope.oleg = data.oleg;
        $scope.$apply();
    })

    // Socket.on('user joined', function(data) {
    //     console.log('user Joinded')
    // })
    //
    // $scope.newUser = function() {
    //     Socket.emit("new user", {
    //         user: $scope.user
    //     });
    // }


    $scope.updateOptions = function() {
        Socket.emit("options", {
            textColor: $scope.options.textColor,
            textSize: $scope.options.textSize,
            bgColor: $scope.options.bgColor,
            bgImage: $scope.options.bgImage,
            wrapperAnimation: $scope.options.wrapperAnimation,
            popup: $scope.options.popup,
            popuptext: $scope.options.popuptext,
            popupBg: $scope.options.popupBg,
            popupTextColor: $scope.options.popupTextColor,
            inputText: $scope.message.text,
            LiveCss: $scope.options.LiveCss,
            showMessages: $scope.options.showMessages,
            blendMode: $scope.options.blendMode,
            filter: $scope.options.filter,
            filterValue: $scope.options.filterValue,
            glitcher: $scope.options.glitcher,
            glitcherX: $scope.options.glitcherX,
            popupScale: $scope.options.popupScale,
            transitionState: $scope.options.transitionState
        });
    }

    $scope.sendMessage = function() {
        Socket.emit("new message", {
            user: $scope.user,
            text: $scope.message.text,
            textColor: $scope.message.textColor,
            textSize: $scope.message.textSize
        });

        if ( $scope.message.text == "555" ) {
            $scope.options.puzzle1 = true;
            $scope.options.bgImage = '/gifs/16.gif';
            $scope.options.popuptext = 'Access Granted';
            $scope.options.popupTextColor = 'red'

        }

        if ( $scope.message.text == "999" ) {
            $scope.options.puzzle2 = true;
            $scope.options.bgImage = '/gifs/6.gif';
            $scope.options.popuptext = 'Kirkorov!';
            $scope.options.popupTextColor = 'white',
            $scope.options.popupScale = '30'
        }

        $scope.message.text = "";
        $scope.options.inputText = "";
    }

    $scope.reset = function() {
        $scope.options.textColor = "#f00",
        $scope.options.textSize = 16,
        $scope.options.bgColor = "#000000",
        $scope.options.bgImage = "",
        $scope.options.wrapperAnimation = "none",
        $scope.options.inputText = "",
        $scope.options.LiveCss = "",
        $scope.options.popupBg = "",
        $scope.options.popupTextColor = "white",
        $scope.options.popup = true,
        $scope.options.popuptext = 'Enter PIN',
        $scope.options.popupBg = 'black',
        $scope.options.popupTextColor = 'white',
        $scope.options.showMessages = false,
        $scope.options.blendMode = 'normal',
        $scope.messages = "",
        $scope.message.text = "",
        $scope.messages = "",
        updateOptions()
    }

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.position = position;
      });
    });
  }

});
