app.controller("AddGenreCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$http",
   "$firebaseAuth",
   "getCheckboxes",
   "storage",
  function($scope,  $routeParams, $firebaseArray, $location, $http, $firebaseAuth, getCheckboxes, storage) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/genres"); 

    // Data from firebase 
    $scope.genres = $firebaseArray(ref);

    //changes display by whether or not user is loggin in
    $scope.loggedIn = storage.getAuthData();

    $http.get("https://ma-compare.firebaseio.com/arts/.json").
    then(function(data) {
      console.log(data);
      $scope.arts = data.data;
      /////Moves this in here so storage gets loaded in time////////////
    //changes display by whether or not user is loggin in
    $scope.loggedIn = storage.getAuthData();
    /////////////////
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
      genre.uid = storage.getAuthData().uid;
      console.log(genre);

      $scope.genres.$add(genre)
      .then(function () {

      });
    };
  }
]);