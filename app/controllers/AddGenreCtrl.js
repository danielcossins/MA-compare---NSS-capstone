app.controller("AddGenreCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$http",
  function($scope,  $routeParams, $firebaseArray, $location, $http) {
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
  }
]);