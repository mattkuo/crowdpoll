'use strict';

describe('Controller: ShowPollCtrl', function () {

  // load the controller's module
  beforeEach(module('crowdpollApp'));

  var ShowPollCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowPollCtrl = $controller('ShowPollCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
