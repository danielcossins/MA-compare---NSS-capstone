app.controller("AuthCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$firebaseAuth",
  function($scope,  $routeParams, $firebaseArray, $location, $firebaseAuth) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/");
    var auth = $firebaseAuth(ref);
    console.log(auth);

    
  }
]);