app.controller("GenreCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
  function($scope,  $routeParams, $firebaseArray, $location) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/genres"); 

    // Data from firebase 
    $scope.genres = $firebaseArray(ref);

    
  }
]);