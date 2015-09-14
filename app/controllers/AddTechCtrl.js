app.controller("AddTechCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$http",
  function($scope,  $routeParams, $firebaseArray, $location, $http) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/arts"); 

    // Data from firebase 
    $scope.techniques = $firebaseArray(ref);

    $http.get("https://ma-compare.firebaseio.com/arts/.json").
    then(function(data) {
      console.log(data);
      $scope.arts = data.data;
    });

    $http.get("https://ma-compare.firebaseio.com/genres/.json").
    then(function(data) {
      console.log(data);
      $scope.genres = data.data;
    });
  }
]);