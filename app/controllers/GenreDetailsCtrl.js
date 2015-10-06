app.controller("GenreDetailsCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$rootScope",
  function($scope,  $routeParams, $firebaseArray, $location, $rootScope) {
    //CSS
    angular.element(".active").removeClass("active");
    /////
    var ref = new Firebase("https://ma-compare.firebaseio.com/genres"); 

    // Data from firebase 
    $scope.genres = $firebaseArray(ref);
    console.log($scope.genres);
    console.log($routeParams.name);

    var ref2 = new Firebase("https://ma-compare.firebaseio.com/arts"); 
    $scope.arts = $firebaseArray(ref2);
    var ref3 = new Firebase("https://ma-compare.firebaseio.com/techniques"); 
    $scope.techniques = $firebaseArray(ref3);

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

      $scope.arts.$loaded()
      .then(function(){
        $scope.matchingArts = [];
        for(var k=0; k<$scope.arts.length; k++){
          if($scope.arts[k].genres!==undefined){
            for(var l=0; l<$scope.arts[k].genres.length; l++){
              if($scope.arts[k].genres[l] === $scope.clickedGenre.name){
                $scope.matchingArts.push({name: $scope.arts[k].name, image: $scope.arts[k].image});
              }  
            }
          }
        }
        console.log($scope.matchingArts);
      });

      $scope.techniques.$loaded()
      .then(function(){
        $scope.matchingTechs = [];
        for(var j=0; j<$scope.techniques.length; j++){
          if($scope.techniques[j].genres!==undefined){
            for(var h=0; h<$scope.techniques[j].genres.length; h++){
              if($scope.techniques[j].genres[h] === $scope.clickedGenre.name){
                $scope.matchingTechs.push({name: $scope.techniques[j].name, image: $scope.techniques[j].image});
              }  
            }
          }
        }
        console.log($scope.matchingTechs);
      });
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
      location.reload();
    };

  }
]);