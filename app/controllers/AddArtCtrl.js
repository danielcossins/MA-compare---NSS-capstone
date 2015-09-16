app.controller("AddArtCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$http",
   "$firebaseAuth",
   "getCheckboxes",
   "storage",
  function($scope,  $routeParams, $firebaseArray, $location, $http, $firebaseAuth, getCheckboxes, storage) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/arts"); 

    // Data from firebase 
    $scope.arts = $firebaseArray(ref);
    console.log($scope.arts);

    //changes display by whether or not user is loggin in
    var auth = new Firebase("https://ma-compare.firebaseio.com/"); 
    $scope.loggedIn = $firebaseAuth(auth);
    // $scope.loggedIn = storage.getAuthData();


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
        name: angular.element("#artName").val(),
        description: angular.element("#artDescription").val(),
        image: angular.element("#artLogo").val()
      };
      art.genres = getCheckboxes(".genres");
      art.techniques = getCheckboxes(".techniques");
      console.log(art);

      $scope.arts.$add(art)
      .then(function () {

      });
    };
  }
]);