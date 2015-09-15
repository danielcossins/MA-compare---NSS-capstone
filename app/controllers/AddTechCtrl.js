app.controller("AddTechCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$http",
   "getCheckboxes",
  function($scope,  $routeParams, $firebaseArray, $location, $http, getCheckboxes) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/techniques"); 

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

    $scope.saveToFirebase = function(){
      var technique = {
        name: angular.element("#techName").val(),
        description: angular.element("#techDescription").val(),
        image: angular.element("#techLogo").val()
      };
      technique.arts = getCheckboxes(".arts");
      console.log(technique.arts);
      technique.genres = getCheckboxes(".genres");
      console.log(technique);

      $scope.techniques.$add(technique)
      .then(function () {

      });
    };
  }
]);