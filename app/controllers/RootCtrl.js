app.controller("RootCtrl", 
  ["$scope",
  "$rootScope",
  "$firebaseAuth",
  "$location",
  function($scope, $rootScope, $firebaseAuth, $location) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/");
    $scope.auth = $firebaseAuth(ref);

    $scope.search = "";

    $scope.logout = function(){
      $scope.auth.$unauth();
      $location.path('/#/');
      location.reload();
    };
  }
]);