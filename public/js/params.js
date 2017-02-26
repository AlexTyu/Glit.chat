var app = angular.module("beetchat", []);


document.documentElement.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, false);

app.controller("main", function($scope, $timeout) {


    $scope.message = {};
    $scope.message.textColor = "red";
    $scope.statusColor = 'red';

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
        if ($scope.oleg == true ) {
          $scope.statusColor = 'green';
        }
        else {
          $scope.statusColor = 'red';
        }
        $scope.$apply();
    })

    // $scope.updateStatus = function() {
    //     if ($scope.oleg == true ) {
    //       $scope.statusColor = 'green';
    //     }
    //     else {
    //       $scope.statusColor = 'red';
    //     }
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
            transitionState: $scope.options.transitionState,
            userInputType: $scope.options.userInputType,
            userInputTextType: $scope.options.userInputTextType,
            userInputLabel: $scope.options.userInputLabel,
            userInputModel: $scope.options.userInputModel,
            userInputAction: $scope.options.userInputAction
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
            $scope.pinSolved();
        }

        $scope.message.text = "";
        $scope.options.inputText = "";

        if ( $scope.message.text == "999" ) {
            $scope.options.puzzle2 = true;
            $scope.options.bgImage = '/gifs/6.gif';
            $scope.options.popuptext = 'Kirkorov!';
            $scope.options.popupTextColor = 'white',
            $scope.options.popupScale = '30'
        }
    }

    $scope.pinSolved = function() {
      $scope.options.puzzle1 = true;
      $scope.options.bgImage = '/gifs/21.gif';
      $scope.options.popuptext = 'User Identified';
      $scope.options.popupTextColor = 'red';
      $scope.options.userInputType = '';
      $scope.updateOptions();

      $timeout( function(){
        $scope.options.wrapperAnimation = 'tvon';
        $scope.options.bgImage = '';
        $scope.options.popup = false;
        $scope.options.showMessages = true;
        $scope.options.wrapperAnimation = '';
        $scope.updateOptions();
      }, 4000 );
    }

    $scope.actionExplosion = function() {
      $scope.options.bgImage = '/gifs/19.gif';
      $scope.options.popuptext = 'BOOM';
      $scope.options.popup = true;
      $scope.options.popupTextColor = 'red';
      $scope.options.userInputType = '';
      $scope.options.glitcherLayover = true;
      $scope.options.wrapperAnimation = 'none'
      $scope.updateOptions();
    }

    $scope.windowsError = function(){
      $scope.options.wrapperAnimation = 'tvoff';
      $scope.options.bgImage = '/gifs/13.gif';
      $scope.options.popup = false;
      $timeout( function(){
        $scope.options.wrapperAnimation = '';
        $scope.options.bgImage = '/gifs/13.gif';
        $scope.options.showMessages = false;
        $scope.options.transitionState = 'none';
        $scope.updateOptions();
      }, 2000 );
    }



    $scope.resetKeyframes = function() {
        $scope.options.wrapperAnimation = '';
        $scope.updateOptions();
        $scope.options.transitionState = 'none';
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
        $scope.updateOptions()
    }
  //
  //   if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position){
  //     $scope.$apply(function(){
  //       $scope.position = position;
  //     });
  //   });
  // }

});
