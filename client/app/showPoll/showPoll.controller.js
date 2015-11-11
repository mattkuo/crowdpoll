'use strict';

angular.module('crowdpollApp')
  .controller('ShowPollCtrl', function ($scope, $http, $routeParams, Auth, alertFactory) {

  $scope.data = {
    optionNames: [],
    votes: [],
    selectedOptions: '',
    hasAlreadyVoted: false
  };

  $scope.poll = {};

  $scope.submitVote = function() {
    var newPoll = $scope.poll;

    newPoll.fields.forEach(function(current) {
      if (current._id === $scope.data.selectedOptions) {
        var userId = Auth.getCurrentUser()._id;
        current.votes.push(userId);
      }
    });

    $http.put('/api/polls/' + newPoll._id, newPoll).then(function(data) {
      if (data.status !== 200) { return console.log('Error submiting poll'); }
      alertFactory.add('Your answer was submitted successfully.', 'success');
      $scope.data.hasAlreadyVoted = true;
      fillChartOptions();
    });
  };

  $http.get('/api/polls/' + $routeParams.id).then(function(data) {

    if (data.status !== 200) {
      return alertFactory.add('Unable to get polldata.', 'danger');
    }
    var poll = data.data;
    $scope.poll = poll;

    if (hasUserVoted()) {
      $scope.data.hasAlreadyVoted = true;
      fillChartOptions();
    }

  }, function(err) {
    console.log(err);
  });

  function fillChartOptions() {
    $scope.poll.fields.forEach(function(field) {
      $scope.data.optionNames.push(field.optionName);
      $scope.data.votes.push(field.votes.length);
    });
  }

  function hasUserVoted() {
    return $scope.poll.fields.some(function(field) {
      return field.votes.some(function(userId) {
        return Auth.getCurrentUser()._id === userId;
      });
    });
  }

});
