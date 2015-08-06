'use strict';

angular.module('crowdpollApp')
  .controller('PollsCtrl', function ($scope, $http, Auth) {
    $scope.userPolls = [];
    $scope.pollQuestion = '';
    $scope.pollInfo = '';
    $scope.pollOption = [
      {optionName: '', votes: 0},
      {optionName: '', votes: 0}
    ];

    $scope.selectedTab = 0;

    $scope.refreshUserPolls = function() {
      $http.get('/api/polls?owner=' + Auth.getCurrentUser()._id).success(function(polls) {
        $scope.userPolls = polls;
      });
    };

    $scope.totalVotes = function(poll) {
      return poll.fields.reduce(function(prev, current) {
        return prev + current.votes;
      }, 0);
    };

    $scope.setSelectedTab = function(num) {
      $scope.selectedTab = num;
    };

    $scope.addOption = function() {
      $scope.pollOption.push({optionName: '', votes: 0});
    };

    $scope.removeOption = function(index) {
      $scope.pollOption.splice(index, 1);
    };

    $scope.savePoll = function() {
      // TODO: form validation
      var poll = {
        name: $scope.pollQuestion,
        info: $scope.pollInfo,
        active: true,
        owner: Auth.getCurrentUser()._id,
        fields: $scope.pollOption
      };

      $http.post('/api/polls', poll).success(function(data) {
        // TODO: Display sharing options
        console.log(data);
        $scope.refreshUserPolls();
        $scope.setSelectedTab(0);
      });
    };

    $scope.refreshUserPolls();

  });
