app.controller("AddArtCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$http",
   "$firebaseAuth",
   "$rootScope",
   "getCheckboxes",
  function($scope,  $routeParams, $firebaseArray, $location, $http, $firebaseAuth, $rootScope, getCheckboxes) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/arts"); 

    // Data from firebase 
    $scope.arts = $firebaseArray(ref);

    //changes display by whether or not user is loggin in
    $scope.loggedIn = $rootScope.user;

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
      art.uid = storage.getAuthData().uid;
      console.log(art);

      $scope.arts.$add(art)
      .then(function () {

      });
    };
  }
]);