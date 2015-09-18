app.controller("ArtDetailsCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$rootScope",
  function($scope,  $routeParams, $firebaseArray, $location, $rootScope) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/arts"); 

    $scope.edit=false;

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
      $scope.currentUser = {};
      var result = false;
      console.log("user info", $rootScope.user);
      for(var j=0; j<$scope.users.length; j++){
        console.log($rootScope.user);
        if($rootScope.user.uid===$scope.users[j].uid){
          $scope.currentUser = $scope.users[j];
          result=true;
        }
      }
      if(result===false){
        $scope.currentUser.uid = $rootScope.user.uid;
        // $scope.users.push($scope.currentUser);
      }










      var votesArr = angular.element(".votes");
      for(var i=0; i<votesArr.length; i++){
        if(votesArr[i].checked){
/////////////removes the vote from the previously voted art
          var previouslyVotedArt = $scope.currentUser.arts[votesArr[i].value];
          for(var k=0; k<$scope.arts.length; k++){
            if($scope.arts[k].name===previouslyVotedArt){
              console.log("before", $scope.arts[k]);
              console.log(votesArr[i].value);
              $scope.arts[k].votes[votesArr[i].value]--;
              // console.log($scope.arts[k].votes[votesArr[i].value]++);
              console.log("after", $scope.arts[k]);
              // $scope.arts.$remove($scope.arts[k]);
              // $scope.arts.$add($scope.arts[k]);
              $scope.arts.$save($scope.arts[k]);
            }
          }
///////////////////////////////////////////////////////////


          console.log(votesArr[i], "checked");
          if($scope.clickedArt.votes[votesArr[i].value]===undefined){
            $scope.clickedArt.votes[votesArr[i].value] = 1;
          }else{
            $scope.clickedArt.votes[votesArr[i].value]++;
          }
          console.log($scope.clickedArt);
          $scope.currentUser.arts[votesArr[i].value] = $scope.clickedArt.name;
        }
      }
      console.log($scope.currentUser);
      console.log($scope.users);
      // $scope.users.$remove($scope.currentUser);
      // $scope.users.$add($scope.currentUser);
      $scope.users.$save($scope.currentUser);
      // $scope.arts.$remove($scope.clickedArt);
      // $scope.arts.$add($scope.clickedArt);
      $scope.arts.$save($scope.clickedArt);
    };

    $scope.changeEdit = function(){
      if($scope.edit){
        $scope.edit=false;
      }else{
        $scope.edit=true;
      }
      // angular.element("#artName").val() = $scope.clickedArt.name;
      document.getElementById("artName").value = $scope.clickedArt.name;
      document.getElementById("artLogo").value = $scope.clickedArt.image;
      document.getElementById("artDescription").value = $scope.clickedArt.description;
    }

    $scope.update = function(){
      $scope.clickedArt.name = angular.element("#artName").val();
      console.log($scope.clickedArt);
    };
  }
]);