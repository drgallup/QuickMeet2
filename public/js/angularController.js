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
  
  $scope.showGroup = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.group.html',
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

app.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  })

app.controller("List", function($scope) {
    setTimeout(function(){
      $scope.listOfGroups = getGroupList();}, 3000);

    console.log($scope.listOfGroups);
    $scope.displayListOfGroups = function ()
    {
        $scope.listOfGroups = getGroupList();
        $scope.listOfGroups.reload();
    }
  
});

/*
Input: nothing, just call this
Output: table appended to body
This how to generate a list of groups the user is part of
*/
var listGroups;
function displayGroups()
{
    var link = window.location.href.split("username=");
    var userName = link[1];
    var x = getGroupForUser(userName, setGroupList);
}
/*
Input: nothing 
Output: list of group id's 
Needed because callbacks
*/
function getGroupList()
{
    return listGroups;
}

/*
Input: an array of group id's
Output: list of group id's 
Needed to add list of groups 
*/
function setGroupList(groupArray) 
{
    listGroups = groupArray;
}