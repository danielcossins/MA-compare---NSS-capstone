app.controller("GenreDetailsCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
  function($scope,  $routeParams, $firebaseArray, $location) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/genres"); 

    // Data from firebase 
    $scope.genres = $firebaseArray(ref);
    console.log($scope.genres);
    console.log($routeParams.name);


    $scope.genres.$loaded()
      .then(function() {
        console.log($scope.genres);
        for(var i=0; i<$scope.genres.length; i++){
          if($scope.genres[i].name === $routeParams.name){
            $scope.clickedGenres = $scope.genres[i];
          }
        }
      })
      .catch(function(err) {
        console.error(err);
      });

  }
]);