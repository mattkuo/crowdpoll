'use strict';

angular.module('crowdpollApp')
  .controller('PollsCtrl', function ($scope, $http, Auth, alertFactory) {
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

    $scope.resetPollData = function() {
      $scope.pollQuestion = '';
      $scope.pollInfo = '';
      $scope.pollOption = [
        {optionName: '', votes: 0},
        {optionName: '', votes: 0}
      ];
    };

    $scope.totalVotes = function(poll) {
      return poll.fields.reduce(function(prev, current) {
        return prev + current.votes.length;
      }, 0);
    };

    $scope.setSelectedTab = function(num) {
      $scope.selectedTab = num;
    };

    $scope.addOption = function() {
      $scope.pollOption.push({optionName: '', votes: []});
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

      $http.post('/api/polls', poll).then(function() {
        alertFactory.add('Poll was successfully saved!', 'success');
        $scope.refreshUserPolls();
        $scope.setSelectedTab(0);
        $scope.resetPollData();
      },function(err) {
        alertFactory.add(err, 'danger');
      });
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
