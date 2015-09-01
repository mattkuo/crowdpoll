'use strict';

angular.module('crowdpollApp')
  .controller('PollModalController', function($rootScope, $scope, alertFactory, Auth, $http) {
    $scope.titles = {
      pollQuestion: '',
      pollInfo: ''
    };

    $scope.pollOption = [
      {optionName: '', votes: []},
      {optionName: '', votes: []}
    ];

    $scope.addOption = function() {
      $scope.pollOption.push({optionName: '', votes: []});
    };

    $scope.removeOption = function(index) {
      $scope.pollOption.splice(index, 1);
    };

    $scope.savePoll = function() {
      // TODO: form validation
      var poll = {
        name: $scope.titles.pollQuestion,
        info: $scope.titles.pollInfo,
        active: true,
        owner: Auth.getCurrentUser()._id,
        fields: $scope.pollOption
      };

      $http.post('/api/polls', poll).then(function() {
        alertFactory.add('Poll was successfully saved!', 'success');
      },function(err) {
        alertFactory.add(err, 'danger');
      });
    };

  });
