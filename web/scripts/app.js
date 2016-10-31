(function () {

  'use strict';

  var app = angular.module('chat', ['ngRoute', 'ngAnimate']);

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

  app.controller('ChatController', ['$location', '$rootScope', function ($location, $rootScope) {
    var chatController = this;
    chatController.saveNick   = saveNick;
    $rootScope.inside = 'chat';
    chatController.writePush  = writePush;
    activate();

    function activate(){
      $.material.init();
    }

    function saveNick(){
      if( chatController.nick == '' || chatController.nick == undefined ){
        swal("Oops...", "Something went wrong!", "error");
      } else {
        $location.path('/chat');
      }
    }

    function writePush(llave, valor){
      firebase.database().ref().push({
        msj: valor,
        email: llave
      });
    }


  }]);


})();
