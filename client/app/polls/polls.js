'use strict';

angular.module('crowdpollApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/polls', {
        templateUrl: 'app/polls/polls.html',
        controller: 'PollsCtrl',
        authenticate: true
      });
  });
