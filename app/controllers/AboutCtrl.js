app.controller("AboutCtrl", 
  ["$scope",
  "$rootScope",
  "$location",
  "$firebaseArray",
  function($scope, $rootScope, $location, $firebaseArray) {
    //CSS
    angular.element(".active").removeClass("active");
    angular.element("#about").addClass("active");
    /////
    
  }
]);