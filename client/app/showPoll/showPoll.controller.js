'use strict';

angular.module('crowdpollApp')
  .controller('ShowPollCtrl', function ($scope, $http, $routeParams, Auth) {
    // $scope.labels = [];
    $scope.data = {
        optionNames: [],
        votes: [],
        selectedOptions: ''
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

        console.log(data);
      });
    };

    $http.get('/api/polls/' + $routeParams.id).then(function(data) {

      if (data.status !== 200) {
        return console.log('unable to get poll data.');
      }

      var poll = data.data;
      $scope.poll = poll;

      poll.fields.forEach(function(field) {
        $scope.data.optionNames.push(field.optionName);
        $scope.data.votes.push(field.votes.length);
      });

    }, function(err) {
      console.log(err);
    });

  });
