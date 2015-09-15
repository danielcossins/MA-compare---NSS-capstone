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

    $scope.currentPicUrl = "";
    // Data from firebase 
    $scope.pins = $firebaseArray(ref);
    $scope.authData = null;

    // Authenticates user to firebase data
    $scope.auth = $firebaseAuth(ref);

    console.log("$scope.auth", $scope.auth);
    
    // Any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      console.log("authData", authData);
      //changes the profile picture based on how user is logged in
      if(authData!==null){

        //sets the user id in a factory for other controllers to use
        storage.setUserId(authData.uid);
        switch (authData.provider) {
          case "facebook":
            $scope.currentPicURL = authData.facebook.profileImageURL;
            break;
          case "twitter":
            $scope.currentPicURL = authData.twitter.profileImageURL;
            break;
          case "password":
            $scope.currentPicURL = authData.password.profileImageURL;
            break;
          case "github":
            $scope.currentPicURL = authData.github.profileImageURL;
            break;
            case "google":
            $scope.currentPicURL = authData.google.profileImageURL;
            break;
          default:
            $scope.currentPicURL = "";
        }
      }else{
        $scope.currentPicURL = "";
      }
      $scope.authData = authData;
      console.log($scope.authData);
    });
    
    // Authorizes user by email/password
    $scope.login = function() {

      ref.authWithPassword($scope.user, function(error, authData) {
          console.log("LogCtrl", authData.uid);
          if (error) {
            $location.path('/#/login');
            // console.log("Login Failed!", error);
          } else {
            storage.setUserId(authData.uid);
            console.log("Authenticated successfully with payload:", authData);
          }
        });
    };

    $scope.logout = function(){
      $scope.auth.$unauth();
    };


  }
]);