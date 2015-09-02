'use strict';

angular.module('crowdpollApp')
  .controller('PollsCtrl', function ($scope, $http, Auth, alertFactory, Modal) {

    $scope.userPolls = [];

    $scope.refreshUserPolls = function() {
      $http.get('/api/polls?owner=' + Auth.getCurrentUser()._id).success(function(polls) {
        $scope.userPolls = polls;
      });
    };

    $scope.openPollModal = function() {
      Modal.confirm.save($scope.refreshUserPolls)();
    };


    $scope.totalVotes = function(poll) {
      return poll.fields.reduce(function(prev, current) {
        return prev + current.votes.length;
      }, 0);
    };

    $scope.removePoll = function(index) {
      var prompt = window.confirm('Are you sure you want to delete this poll? (This action cannot be undone)');

      if (!prompt) { return; }

      var poll = $scope.userPolls[index];
      $http.delete('/api/polls/' + poll._id).then(function() {
        alertFactory.add('The poll was successfully deleted.', 'success');
        $scope.userPolls.splice(index, 1);
      }, function() {
        alertFactory.add('Error deleting poll. Please try again later', 'danger');
      });
    };

    Auth.isLoggedInAsync(function(loggedIn) {
      if (loggedIn) {
        $scope.refreshUserPolls();
      }
    });

  });
