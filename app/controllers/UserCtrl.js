app.controller("UserCtrl", 
  ["$scope",
  "$rootScope",
  "$firebaseAuth",
  "$location",
  function($scope, $rootScope, $firebaseAuth, $location) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/users");
    $scope.users = $firebaseAuth(ref);
  }
]);