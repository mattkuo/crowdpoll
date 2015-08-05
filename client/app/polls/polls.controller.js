'use strict';

angular.module('crowdpollApp')
  .controller('PollsCtrl', function ($scope, $http, Auth) {
    $scope.userPolls = [];

    $http.get('/api/polls?owner=' + Auth.getCurrentUser()._id).success(function(polls) {
      $scope.userPolls = polls;
    });

    $scope.totalVotes = function(poll) {
      return poll.fields.reduce(function(prev, current) {
        return prev.votes + current.votes;
      });
    };

  });
