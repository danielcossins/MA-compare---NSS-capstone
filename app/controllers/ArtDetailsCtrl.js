app.controller("ArtDetailsCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$rootScope",
  function($scope,  $routeParams, $firebaseArray, $location, $rootScope) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/arts"); 

    // Data from firebase 
    $scope.arts = $firebaseArray(ref);
    console.log($scope.arts);
    console.log($routeParams.name);

    var ref2 = new Firebase("https://ma-compare.firebaseio.com/genres"); 
    $scope.genres = $firebaseArray(ref2);

    var ref3 = new Firebase("https://ma-compare.firebaseio.com/users"); 
    $scope.users = $firebaseArray(ref3);
    console.log($scope.users);

    //finds the correctly clicked art
    $scope.arts.$loaded()
      .then(function() {
        console.log($scope.arts);
        for(var i=0; i<$scope.arts.length; i++){
          if($scope.arts[i].name === $routeParams.name){
            $scope.clickedArt = $scope.arts[i];
          }
        }
      })
      .catch(function(err) {
        console.error(err);
      });




    $scope.vote = function(){
      // $scope.clickedArt.votes = {};
      // $scope.users = [];
      var result = false;
      for(var j=0; j<$scope.users.length; j++){
        if($rootScope.user.uid===$scope.users[j].uid){
          $scope.currentUser = $scope.users[j];
          result=true;
        }
      }
      if(result===false){
        $scope.currentUser.uid = $rootScope.user.uid;
        // $scope.users.push($scope.currentUser);
      }
      $scope.currentUser = {
        uid: $rootScope.user.uid
      };




      var votesArr = angular.element(".votes");
      for(var i=0; i<votesArr.length; i++){
        if(votesArr[i].checked){
          console.log(votesArr[i], "checked");
          if($scope.clickedArt.votes[votesArr[i].value]===undefined){
            $scope.clickedArt.votes[votesArr[i].value] = 1;
          }else{
            $scope.clickedArt.votes[votesArr[i].value]++;
          }
          console.log($scope.clickedArt);
          $scope.currentUser[votesArr[i].value] = $scope.clickedArt.name;
        }
      }
      console.log($scope.currentUser);
      console.log($scope.users);
      $scope.users.$add($scope.currentUser);
      $scope.arts.$remove($scope.clickedArt);
      $scope.arts.$add($scope.clickedArt);
    };
  }
]);