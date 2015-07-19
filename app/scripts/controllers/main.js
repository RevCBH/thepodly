'use strict';

/**
 * @ngdoc function
 * @name podlyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the podlyApp
 */
angular.module('podlyApp')
  .controller('MainCtrl', function ($scope) {
    $scope.episode = {
      podcast: "Podlycast",
      number: 1,
      title: "The Poddening"
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
