(function () {

  'use strict';

  var app = angular.module('chat', ['ngRoute', 'ngAnimate', 'firebase']);

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/nick.html',
        controller: 'NickController',
        controllerAs: 'nickController'
      })
      .when('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'ChatController',
        controllerAs: 'chatController'
      });
  });

  app.run([function (){
  }]);

  app.controller('NickController', ['$location', '$rootScope', function ($location, $rootScope) {
    var nickController = this;
    nickController.nick = '';
    nickController.saveNick = saveNick;
    $rootScope.inside = '';
    activate();

    function activate(){
      $.material.init();
    }


    function saveNick(){
      if( nickController.nick == '' || nickController.nick == undefined ){
        swal("Oops...", "Something went wrong!", "error");
      } else {
        $rootScope.nick = nickController.nick;
        $location.path('/chat');
      }
    }

  }]);

  app.controller('ChatController', ['$location', '$rootScope', '$firebaseObject', '$firebaseArray',
    function ($location, $rootScope, $firebaseObject, $firebaseArray) {
    var chatController = this;
    chatController.writePush  = writePush;
    $rootScope.inside         = 'chat';
    chatController.msj        = '';
    chatController.datos      = {};

    var ref = firebase.database().ref();
    chatController.datos = $firebaseArray(ref);

    activate();

    function activate(){
      $.material.init();
      // if( $rootScope.nick == '' || $rootScope.nick == undefined ){
      //   $location.path('/');
      // }
    }

    function writePush(){
      if( chatController.msj == '' ) {
        swal("Falta el mensaje");
      } else {
        chatController.datos.$add({
            nick: $rootScope.nick,
            msj: chatController.msj
          }).then(function(ref) {
            chatController.msj = '';
            console.log(chatController.datos);
        });
      }

    }


  }]);


})();
