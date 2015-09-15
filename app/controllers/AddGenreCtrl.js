app.controller("AddGenreCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$http",
   "getCheckboxes",
  function($scope,  $routeParams, $firebaseArray, $location, $http, getCheckboxes) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/genres"); 

    // Data from firebase 
    $scope.genres = $firebaseArray(ref);

    $http.get("https://ma-compare.firebaseio.com/arts/.json").
    then(function(data) {
      console.log(data);
      $scope.arts = data.data;
    });

    $http.get("https://ma-compare.firebaseio.com/techniques/.json").
    then(function(data) {
      console.log(data);
      $scope.techniques = data.data;
    });

    $scope.saveToFirebase = function(){
      var genre = {
        name: angular.element("#genreName").val(),
        description: angular.element("#genreDescription").val(),
        image: angular.element("#genreLogo").val()
      };
      genre.arts = getCheckboxes(".arts");
      console.log(genre.arts);
      genre.techniques = getCheckboxes(".techniques");
      console.log(genre);

      $scope.genres.$add(genre)
      .then(function () {

      });
    };
  }
]);