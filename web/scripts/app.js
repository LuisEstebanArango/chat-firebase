(function () {

  'use strict';

  var app = angular.module('chat', ['ngRoute']);

  app.config(function ($routeProvider) {

      $routeProvider
        .when('/', {
          templateUrl: 'views/nick.html',
          controller: 'MainController',
          controllerAs: 'jj'
        });
      });

  app.controller('MainController', [function () {
    var mainController = this;
  }]);


})();
