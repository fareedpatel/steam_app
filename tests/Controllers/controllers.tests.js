// var angular = require('angular');
// angular.module('myMod', [
//   require('angular-animate'),
//   require('angular-mocks/ngMock'),
//   require('angular-mocks/ngAnimateMock')
// ]);

describe('Controllers', function(){
  var scope;

  beforeEach(module('starter.controllers'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('AccountCtrl', {$scope: scope});
  }));

  it('should have friends enabled', function(){
    expect(scope.settings.enableFriends).toEqual(true);
  });
});