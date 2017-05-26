// controller.js

var app = angular.module('MyApp', ['ngMaterial']);
app.controller('PopCtrl', function($scope, $mdDialog) {
  $scope.status = ' ';
  $scope.customFullscreen = false;
  
  $scope.showAlert = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.login.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };	
  
  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
});

app.controller('AppCtrl', function($scope) {
  $scope.data = {
    cb1: false
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
