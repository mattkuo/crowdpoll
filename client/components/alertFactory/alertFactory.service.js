'use strict';

angular.module('crowdpollApp')
  .factory('alertFactory', function ($rootScope) {

    $rootScope.alerts = [];

    var alertService = {
      add: function(msg, type) {
        $rootScope.alerts.push({
          msg: msg,
          type: type,
          close: function() { alertService.closeAlert(this); }
        });
      },

      closeAlert: function(alert) {
        var index = $rootScope.alerts.indexOf(alert);
        this.closeAlertIndex(index);
      },

      closeAlertIndex: function(index) {
        $rootScope.alerts.splice(index, 1);
      }

    };

    return alertService;

  });
