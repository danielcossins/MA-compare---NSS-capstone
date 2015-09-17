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
        if($scope.arts[i].votes.Overall > $scope.bestArt.votes.Overall){
          $scope.bestArt = $scope.arts[i];
        }
      }
    })
    .catch(function(err) {
      console.error(err);
    });




    var ref2 = new Firebase("https://ma-compare.firebaseio.com/techniques"); 

    // Data from firebase 
    $scope.techs = $firebaseArray(ref2);
    console.log($scope.techs);

    $scope.techs.$loaded()
    .then(function() {
      console.log($scope.techs);
      $scope.bestTech = $scope.techs[0];
      for(var i=0; i<$scope.techs.length; i++){
        if($scope.techs[i].votes.Overall > $scope.bestTech.votes.Overall){
          $scope.bestTech = $scope.techs[i];
        }
      }
    })
    .catch(function(err) {
      console.error(err);
    });

    
  }
]);