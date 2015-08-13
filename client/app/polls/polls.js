'use strict';

angular.module('crowdpollApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/polls', {
        templateUrl: 'app/polls/polls.html',
        controller: 'PollsCtrl',
        authenticate: true
      })

      .when('/polls/:id', {
        templateUrl: 'app/showPoll/showPoll.html',
        controller: 'ShowPollCtrl'
      });
  });
