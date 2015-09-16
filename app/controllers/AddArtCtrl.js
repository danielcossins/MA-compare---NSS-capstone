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


    $http.get("https://ma-compare.firebaseio.com/genres/.json").
    then(function(data) {
      console.log(data);
      $scope.genres = data.data;
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