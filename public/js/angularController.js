// controller.js

var app = angular.module('MyApp', ['ngMaterial']);
app.controller('AppCtrl', function($scope) {
  $scope.data = {
    cb1: true
  };

  $scope.message = 'false';

  $scope.onChange = function(cbState) {
  	$scope.message = cbState;
  };
 
});

app.controller('SidebarController', function($scope) 
{
    $scope.state = false;
    $scope.toggleState = function() 
    {
        $scope.state = !$scope.state;
    };
    
});

app.directive('sidebarDirective', function() {
    return {
        link : function(scope, element, attr) {
            scope.$watch(attr.sidebarDirective, function(newVal) {
                  if(newVal)
                  {
                    element.addClass('show'); 
                    return;
                  }
                  element.removeClass('show');
            });
        }
    };
});
