app.controller("RootCtrl", 
  ["$scope",
  "$rootScope",
  "$firebaseAuth",
  function($scope, $rootScope, $firebaseAuth) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/");
    $scope.auth = $firebaseAuth(ref);

    $scope.search = "";

    // $scope.loggedIn = $rootScope.user;
    // $scope.loggedIn = ref.getAuth();

    $scope.logout = function(){
      $scope.auth.$unauth();
      // $route.reload();
      location.reload();
      // $rootScope.user = null;
      // $rootScope.user = ref.getAuth();
    };
  }
]);