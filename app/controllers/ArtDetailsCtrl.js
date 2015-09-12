app.controller("ArtDetailsCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
  function($scope,  $routeParams, $firebaseArray, $location) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/arts"); 

    // Data from firebase 
    $scope.arts = $firebaseArray(ref);
    console.log($scope.arts);
    console.log($routeParams);

    for(var i=0; i<$scope.arts.length; i++){
      console.log("aldskfjasdklfj");
      console.log($scope.arts[i]);
      if($scope.arts[i].name===$routeParams.name){
        console.log($scope.arts[i]);
        $scope.clickedArt = $scope.arts[i];
        console.log($scope.clickedArt);
      }
    }
  }
]);