app.controller("AddArtCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$http",
  function($scope,  $routeParams, $firebaseArray, $location, $http) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/arts"); 

    // Data from firebase 
    $scope.arts = $firebaseArray(ref);


    $http.get("https://ma-compare.firebaseio.com/genres/.json").
    then(function(data) {
      console.log(data);
      $scope.genres = data.data;
    });

    $http.get("https://ma-compare.firebaseio.com/techniques/.json").
    then(function(data) {
      console.log(data);
      $scope.techniques = data.data;
    });




    $scope.saveToFirebase = function(){
      var art = {
        name: angular.element("#name"),
        description: angular.element("#description"),
        image: angular.element("#image"),
        genres: [
          
        ],
        techniques: [
          
        ]
      };
      var genreBoxesArr = angular.element(".genres");
      console.log(genreBoxesArr);
      for(var i=0; i<genreBoxesArr.length; i++){
        if(genreBoxesArr[i].checked===true){
          console.log("this one matches", genreBoxesArr[i]);
          art.genres.push(genreBoxesArr[i].value);
        }else{
          console.log("no match");
        }
      }
      var techniqueBoxesArr = angular.element(".techniques");
      console.log(techniqueBoxesArr);
      for(var j=0; j<techniqueBoxesArr.length; j++){
        if(techniqueBoxesArr[j].checked===true){
          console.log("this one matches", techniqueBoxesArr[j]);
          art.techniques.push(techniqueBoxesArr[j].value);
        }else{
          console.log("no match");
        }
      }
    };
  }
]);