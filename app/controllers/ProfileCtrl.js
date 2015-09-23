app.controller("ProfileCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$rootScope",
  function($scope,  $routeParams, $firebaseArray, $location, $rootScope) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/users"); 

    // Data from firebase 
    $scope.users = $firebaseArray(ref);

    $scope.users.$loaded()
    .then(function(){
      for(var i=0; i<$scope.users.length; i++){
        if($scope.users[i].uid===$rootScope.user.uid){
          $scope.clickedUser = $scope.users[i];
          console.log($scope.clickedUser);
        }
      }
    });
  }
]);