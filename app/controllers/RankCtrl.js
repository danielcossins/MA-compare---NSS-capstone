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

      $scope.genres.$loaded()
      .then(function() {
        console.log($scope.arts);
        for(var k=0; k<$scope.genres.length; k++){
          $scope[$scope.genres[k].name] = $scope.arts[0];
          console.log("$scope."+[$scope.genres[k].name], $scope[$scope.genres[k].name]);
          for(var j=0; j<$scope.arts.length; j++){
            if($scope.arts[j].votes.Overall > $scope[$scope.genres[k].name].votes.Overall){
              $scope[$scope.genres[k].name] = $scope.arts[j];
            }
          }
          console.log("for "+$scope.genres[k].name, $scope[$scope.genres[k].name]);
        }
      })
      .catch(function(err) {
        console.error(err);
      });
    })
    .catch(function(err) {
      console.error(err);
    });


    // $scope.genres.$loaded()
    // .then(function() {
    //   console.log($scope.arts);
    //   for(var k=0; k<$scope.genres.length; k++){
    //     console.log($scope.arts[0]);
    //     $scope[$scope.genres[k].name] = $scope.arts[0];
    //     console.log("$scope."+[$scope.genres[k].name], $scope[$scope.genres[k].name]);
    //     for(var i=0; i<$scope.arts.length; i++){
    //       if($scope.arts[i].votes.Overall > $scope[$scope.genres[k].name].votes.Overall){
    //         $scope[$scope.genres[k].name] = $scope.arts[i];
    //       }
    //     }
    //     console.log("for "+$scope.genres[k].name, $scope[$scope.genres[k].name]);
    //   }
    // })
    // .catch(function(err) {
    //   console.error(err);
    // });

    
  }
]);