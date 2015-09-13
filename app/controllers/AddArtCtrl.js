app.controller("AddArtCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
  function($scope,  $routeParams, $firebaseArray, $location) {
    console.log("hi are you awake?");
    var ref = new Firebase("https://ma-compare.firebaseio.com/arts"); 

    // Data from firebase 
    $scope.arts = $firebaseArray(ref);
    $scope.test = "this is a test";
    console.log($scope.test);


    $http.get("https://ma-compare.firebaseio.com/genres").
    then(function(data) {
      console.log(data);
      $scope.genres = data;
    });

    $http.get("https://ma-compare.firebaseio.com/techniques").
    then(function(data) {
      console.log(data);
      $scope.techniques = data;
    });
  }
]);