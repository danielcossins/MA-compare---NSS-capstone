app.controller("AuthCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$firebaseAuth",
   "$rootScope",
  function($scope,  $routeParams, $firebaseArray, $location, $firebaseAuth, $rootScope, storage) {
    //CSS
    angular.element(".active").removeClass("active");
    /////
    //to create user info in firebase
    var ref2 = new Firebase("https://ma-compare.firebaseio.com/users");
    $scope.users = $firebaseArray(ref2);

    var ref = new Firebase("https://ma-compare.firebaseio.com/");
    $scope.user = {
      "email": "",
      "password": ""
    };



    // Authenticates user to firebase data
    $scope.auth = $firebaseAuth(ref);
    console.log("$scope.auth", $scope.auth);
    

    $scope.authData = null;
    // Any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      console.log("authData", authData);
      //changes the profile picture based on how user is logged in
      $scope.authData = authData;
      $rootScope.user = authData;
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
          var result = false;
          for(var i=0; i<$scope.users.length; i++){
            if($scope.users[i].uid===authData.uid){
              result=true;
            }
          }
          if(result===false){
            var userObj = {
              uid: authData.uid,
              arts: {Overall: "no vote"},
              techniques: {Overall: "no vote"},
              email: authData.password.email,
              image: authData.password.profileImageURL,
              username: "",
              userImage: ""
            };
            console.log(userObj);
            $scope.users.$add(userObj);
          }
          location.reload();
          // $rootScope.user = $scope.authData;
        }
      });
    };


  }
]);