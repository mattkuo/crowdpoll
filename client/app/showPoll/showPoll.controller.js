'use strict';

angular.module('crowdpollApp')
  .controller('ShowPollCtrl', function ($scope, $http, $routeParams) {
    $scope.pollName = '';
    $scope.pollInfo = '';
    $scope.labels = [];
    $scope.data = [];

    $http.get('/api/polls/' + $routeParams.id).then(function(data) {

      if (data.status !== 200) {
        return console.log('unable to get poll data.');
      }

      var poll = data.data;

      $scope.pollName = poll.name;
      $scope.pollInfo = poll.info;

      poll.fields.forEach(function(field) {
        $scope.labels.push(field.optionName);
        $scope.data.push(field.votes.length);
      });

    }, function(err) {
      console.log(err);
    });
  });
