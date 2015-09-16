app.controller("AuthCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$firebaseAuth",
   "storage",
  function($scope,  $routeParams, $firebaseArray, $location, $firebaseAuth, storage) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/");
    $scope.user = {
      "email": "",
      "password": ""
    };



    // Authenticates user to firebase data
    $scope.auth = $firebaseAuth(ref);
    console.log("$scope.auth", $scope.auth);
    storage.setAuthData($scope.auth);
    

    $scope.authData = null;
    // Any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      console.log("authData", authData);
      //changes the profile picture based on how user is logged in
      storage.setAuthData(authData);
      $scope.authData = authData;
      console.log($scope.authData);
    });
    
    // Authorizes user by email/password
    $scope.login = function() {
      console.log($scope.authData);

      ref.authWithPassword($scope.user, function(error, authData) {
        console.log("LogCtrl", authData);
        if (error) {
          console.log("Auth with password error", error);
          $location.path('/#/login');
          // console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          storage.setAuthData(authData);
        }
      });
    };

    $scope.logout = function(){
      $scope.auth.$unauth();
    };


  }
]);