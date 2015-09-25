app.controller("ProfileCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$rootScope",
   "$firebaseAuth",
   "uploadImage",
  function($scope,  $routeParams, $firebaseArray, $location, $rootScope, $firebaseAuth, uploadImage) {

  console.log($routeParams);


    var ref = new Firebase("https://ma-compare.firebaseio.com/users"); 

    // Data from firebase 
    $scope.users = $firebaseArray(ref);

    $scope.users.$loaded()
    .then(function(){
      for(var i=0; i<$scope.users.length; i++){
        console.log($routeParams, $scope.users[i].uid);
        if($scope.users[i].uid===$routeParams.uid){
          $scope.clickedUser = $scope.users[i];
          console.log($scope.clickedUser);
        }
      }
    });

    $scope.setUpload = function(){
      console.log(angular.element("#profileUpload").val());
      // $scope.photoUpload = angular.element("#exampleInputFile").val();
      // console.log(uploadImage());
      // $scope.photoUpload = uploadImage();
      var xhr = uploadImage("profileUpload");
      angular.element("#profile").html("<h5 class='accent'>Please wait . . .</h5>");
      xhr.onload = function() {
        $scope.photoUpload = JSON.parse(xhr.responseText).data.link;
        angular.element("#profile").html("<img src='"+$scope.photoUpload+"' width='50px'>");
      };
    };

    $scope.savePhoto = function(){
      //This deals with photo gallary
      var image = angular.element("#profileUrl").val();
      if($scope.photoUpload!==undefined){
        image = $scope.photoUpload;
      }
      console.log(image);
      $scope.clickedUser.userImage = image;
      $scope.users.$save($scope.clickedUser);
    };
  }
]);