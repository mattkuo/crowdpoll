'use strict';

angular.module('crowdpollApp')
  .controller('ShowPollCtrl', function ($scope, $http, $routeParams) {
    $scope.labels = [];
    $scope.data = [];
    $scope.poll = {};
    $scope.selectedOption = '';

    $http.get('/api/polls/' + $routeParams.id).then(function(data) {

      if (data.status !== 200) {
        return console.log('unable to get poll data.');
      }

      var poll = data.data;
      $scope.poll = poll;

      poll.fields.forEach(function(field) {
        $scope.labels.push(field.optionName);
        $scope.data.push(field.votes.length);
      });

    }, function(err) {
      console.log(err);
    });

  });
