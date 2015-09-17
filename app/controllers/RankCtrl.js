app.controller("RankCtrl", 
  ["$scope",
   "$firebaseArray",
  function($scope, $firebaseArray) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/genres"); 
    $scope.genres = $firebaseArray(ref);

    var ref2 = new Firebase("https://ma-compare.firebaseio.com/arts"); 
    $scope.arts = $firebaseArray(ref2);



    $scope.arts.$loaded()
    .then(function() {
      $scope.bestArt = $scope.arts[0];
      for(var i=0; i<$scope.arts.length; i++){
        if($scope.arts[i].votes.Overall > $scope.bestArt.votes.Overall){
          $scope.bestArt = $scope.arts[i];
        }
      }
    })
    .catch(function(err) {
      console.error(err);
    });

    
  }
]);