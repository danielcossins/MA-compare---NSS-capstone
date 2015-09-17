app.controller("AddTechCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$http",
   "$firebaseAuth",
   "$rootScope",
   "getCheckboxes",
  function($scope,  $routeParams, $firebaseArray, $location, $http, $firebaseAuth, $rootScope, getCheckboxes) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/techniques"); 

    // Data from firebase 
    $scope.techniques = $firebaseArray(ref);

    //changes display by whether or not user is loggin in
    $scope.loggedIn = $rootScope.user;

    $http.get("https://ma-compare.firebaseio.com/arts/.json").
    then(function(data) {
      console.log(data);
      $scope.arts = data.data;
      /////Moves this in here so storage gets loaded in time////////////
    //changes display by whether or not user is loggin in
    $scope.loggedIn = storage.getAuthData();
    /////////////////
    });

    $http.get("https://ma-compare.firebaseio.com/genres/.json").
    then(function(data) {
      console.log(data);
      $scope.genres = data.data;
    });

    $scope.saveToFirebase = function(){
      var technique = {
        name: angular.element("#techName").val(),
        description: angular.element("#techDescription").val(),
        image: angular.element("#techLogo").val()
      };
      technique.arts = getCheckboxes(".arts");
      console.log(technique.arts);
      technique.genres = getCheckboxes(".genres");
      technique.votes = {};
      technique.uid = $rootScope.user.uid;
      console.log(technique);

      $scope.techniques.$add(technique)
      .then(function () {

      });
    };
  }
]);