app.controller("RootCtrl", 
  ["$scope",
  "$rootScope",
  "$firebaseAuth",
  function($scope, $rootScope, $firebaseAuth) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/");
    $scope.auth = $firebaseAuth(ref);

    $scope.search = "";

    $scope.logout = function(){
      $scope.auth.$unauth();
      // location.reload();
    };
  }
]);