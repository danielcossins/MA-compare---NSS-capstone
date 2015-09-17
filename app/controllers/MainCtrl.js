app.controller("MainCtrl", 
  ["$scope",
   "$firebaseArray",
  function($scope, $firebaseArray) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/arts"); 

    // Data from firebase 
    $scope.arts = $firebaseArray(ref);

    $scope.arts.$loaded()
    .then(function() {
      console.log($scope.arts);
      $scope.bestArt = $scope.arts[0];
      for(var i=0; i<$scope.arts.length; i++){
        if($scope.arts[i].votes > $scope.bestArt.votes){
          $scope.bestArt = $scope.arts[i];
        }
      }
    })
    .catch(function(err) {
      console.error(err);
    });

    
  }
]);