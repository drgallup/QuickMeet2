// controller.js

angular.module('MyApp', ['ngMaterial'])
.controller('appCtrl', function($scope) {
  $scope.data = {
    cb1: true,
    cb4: true,
    cb5: false
  };

  $scope.message = 'false';
  
  //$scope.greeting = { text: 'Hello' };
  //$scope.date = Date('2017', '04', '20');

  $scope.onChange = function(cbState) {
  	$scope.message = cbState;
  };
});