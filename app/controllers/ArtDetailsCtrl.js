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
    console.log($routeParams.name);


    $scope.arts.$loaded()
      .then(function() {
        console.log($scope.arts);
        for(var i=0; i<$scope.arts.length; i++){
          if($scope.arts[i].name === $routeParams.name){
            $scope.clickedArt = $scope.arts[i];
          }
        }
      })
      .catch(function(err) {
        console.error(err);
      });

    //voting functionality
    $scope.clicked=false;
    $scope.vote = function(){
      if($scope.clickedArt.votes!==undefined){
        $scope.clickedArt.votes++;
      }else{
        $scope.clickedArt.votes=1;
      }
      console.log($scope.clickedArt);
      $scope.clicked=true;
      $scope.arts.$remove($scope.clickedArt);
      $scope.arts.$add($scope.clickedArt);
    };
  }
]);