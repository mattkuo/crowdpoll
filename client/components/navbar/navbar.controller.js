'use strict';

angular.module('crowdpollApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      { 'title': 'Home', 'link': '/' }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    Auth.isLoggedInAsync(function(loggedIn) {
      if (loggedIn) {
        $scope.menu = [
          { 'title': 'My Polls', 'link': '/polls'}
        ];
      }
    });
  });
