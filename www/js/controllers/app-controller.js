angular.module('mean.controllers')

.controller('AppCtrl', ['$scope' , '$state' , 'Alert' , 'Authentication' , 'AUTH_EVENTS' , function($scope, $state, Alert, Authentication, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    Alert.alert('Unauthorized!' , 'You are not allowed to access this resource.');
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    Authentication.logout();
    $state.go('login');
  });
}]);
