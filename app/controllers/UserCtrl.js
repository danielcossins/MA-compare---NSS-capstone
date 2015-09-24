app.controller("UserCtrl", 
  ["$scope",
  "$rootScope",
  "$location",
  "$firebaseArray",
  function($scope, $rootScope, $location, $firebaseArray) {
    //CSS
    angular.element(".active").removeClass("active");
    angular.element("#users").addClass("active");
    /////
    var ref = new Firebase("https://ma-compare.firebaseio.com/users");
    $scope.users = $firebaseArray(ref);
    console.log($scope.users);
  }
]);