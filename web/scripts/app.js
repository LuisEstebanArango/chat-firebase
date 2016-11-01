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

  app.controller('ChatController', ['$location', '$rootScope', '$firebaseObject', function ($location, $rootScope, $firebaseObject) {
    var chatController = this;
    chatController.saveNick   = saveNick;
    chatController.writePush  = writePush;
    $rootScope.inside         = 'chat';
    chatController.datos      = {};

    var ref = firebase.database().ref();
    var syncObject = $firebaseObject(ref);
    syncObject.$bindTo(chatController.datos, "data");

    activate();

    function activate(){
      $.material.init();

      syncObject.$loaded()
        .then(function(data) {
          syncObject.data.push({email: "anna", msj: "que mas"});
          syncObject.$save().then(function(ref) {

          }, function(error) {
            console.log("Error:", error);
          });
        })
        .catch(function(error) {
          console.error("Error:", error);
        });


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
