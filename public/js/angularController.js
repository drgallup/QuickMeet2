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

app.controller('UserCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  })

app.controller('GroupCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  })

app.controller("ListGroups", function($scope, $timeout) 
{
    displayGroups();
    setTimeout(function()
    {
      $scope.listOfGroups = getGroupList();
    }, 3000);

    $scope.displayListOfGroups = function ()
    {
        $scope.listOfGroups = getGroupList();
    }
  
    $scope.intervalFunction = function()
    {
        $timeout(function() 
        {
          $scope.displayListOfGroups();
          $scope.intervalFunction();
        }, 1000)
    };

    $scope.intervalFunction();
});

app.controller("ListUsers", function($scope, $timeout) 
{
    displayUsersOfGroup();
    setTimeout(function()
    {
      $scope.listOfUsers = getUserList();
    }, 3000);

    $scope.displayListOfUsers = function ()
    {
        $scope.listOfUsers = getUserList();
    }

    $scope.intervalFunction = function()
    {
        $timeout(function() 
        {
          $scope.displayListOfUsers();
          $scope.intervalFunction();
        }, 1000)
    };

    $scope.intervalFunction();
  
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
Output: none 
Needed to add list of groups 
*/
function setGroupList(groupArray) 
{
    listGroups = groupArray;
}


/*
Input: nothing, just call this
Output: table appended to body
This how to generate a list of users the group has
*/
var listUsers;
function displayUsersOfGroup()
{
   var link = window.location.href.split("groupName=");
    var groupName = link[1];
    var x = getUsersInGroup(groupName, setUserList);
}
/*
Input: nothing 
Output: list of user id's 
Needed because callbacks
*/
function getUserList()
{
    return listUsers;
}

/*
Input: an array of user id's
Output: none
Needed to add list of groups 
*/
function setUserList(groupArray) 
{
    listUsers = groupArray;
}