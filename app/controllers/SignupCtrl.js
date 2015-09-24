app.controller("SignupCtrl", 
  ["$scope",
   "$routeParams",
  "$firebaseObject",
  // "$firebaseArray",
  function($scope, $routeParams, $firebaseObject/*, $firebaseArray*/) {
    // //to create user info in firebase
    // var ref2 = new Firebase("https://ma-compare.firebaseio.com/users");
    // $scope.users = $firebaseArray(ref2);



    var ref = new Firebase("https://ma-compare.firebaseio.com/");

    // Grabs user input from DOM
    $scope.user = {
      "email": "",
      "password": ""
    };

    // Adds new user to firebase authentication via email/password
    $scope.createUser = function() {

      ref.createUser($scope.user, function(error, userData) {
        console.log(userData);
        if (error) {
          switch (error.code) {
            case "EMAIL_TAKEN":
              $scope.message = "The new user account cannot be created because the email is already in use.";
              break;
            case "INVALID_EMAIL":
              $scope.message = "The specified email is not a valid email.";
              break;
            default:
              alert("Error creating user:", error);
          }
        } else {
          alert("Successfully created user account with uid:", userData.uid);
        }
      });
    }; 
  }
]);