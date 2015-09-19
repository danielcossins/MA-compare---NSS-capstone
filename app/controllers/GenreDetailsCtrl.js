app.controller("GenreDetailsCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$rootScope",
  function($scope,  $routeParams, $firebaseArray, $location, $rootScope) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/genres"); 

    // Data from firebase 
    $scope.genres = $firebaseArray(ref);
    console.log($scope.genres);
    console.log($routeParams.name);

    $scope.edit=false;
    $scope.loggedIn = $rootScope.user;


    $scope.genres.$loaded()
    .then(function() {
      console.log($scope.genres);
      for(var i=0; i<$scope.genres.length; i++){
        if($scope.genres[i].name === $routeParams.name){
          $scope.clickedGenre = $scope.genres[i];
        }
      }
    })
    .catch(function(err) {
      console.error(err);
    });




    $scope.changeEdit = function(){
      if($scope.edit){
        $scope.edit=false;
      }else{
        $scope.edit=true;
      }
      // angular.element("#artName").val() = $scope.clickedArt.name;
      document.getElementById("genreNameEdit").value = $scope.clickedGenre.name;
      document.getElementById("genreLogoEdit").value = $scope.clickedGenre.image;
      document.getElementById("genreDescriptionEdit").value = $scope.clickedGenre.description;
    };

    $scope.update = function(){
      $scope.clickedGenre.name = angular.element("#genreNameEdit").val();
      $scope.clickedGenre.image = angular.element("#genreLogoEdit").val();
      $scope.clickedGenre.description = angular.element("#genreDescriptionEdit").val();



      console.log($scope.clickedGenre);
      $scope.genres.$save($scope.clickedGenre);
      $scope.edit=false;
    };

  }
]);