app.controller("TechDetailsCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$rootScope",
  function($scope,  $routeParams, $firebaseArray, $location, $rootScope) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/techniques"); 

    $scope.edit=false;
    $scope.loggedIn = $rootScope.user;

    // Data from firebase 
    $scope.techs = $firebaseArray(ref);
    console.log($scope.techs);
    console.log($routeParams.name);

    var ref2 = new Firebase("https://ma-compare.firebaseio.com/genres"); 
    $scope.genres = $firebaseArray(ref2);

    var ref3 = new Firebase("https://ma-compare.firebaseio.com/arts"); 
    $scope.arts = $firebaseArray(ref3);

    var ref4 = new Firebase("https://ma-compare.firebaseio.com/users"); 
    $scope.users = $firebaseArray(ref4);
    console.log($scope.users);


    $scope.techs.$loaded()
      .then(function() {
        console.log($scope.techs);
        for(var i=0; i<$scope.techs.length; i++){
          if($scope.techs[i].name === $routeParams.name){
            $scope.clickedTech = $scope.techs[i];
          }
        }
      })
      .catch(function(err) {
        console.error(err);
      });


    $scope.vote = function(){
      // $scope.clickedTech.votes = {};
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
          var previouslyVotedTech = $scope.currentUser.techniques[votesArr[i].value];
          console.log(previouslyVotedTech);
          for(var k=0; k<$scope.techs.length; k++){
            if($scope.techs[k].name===previouslyVotedTech){
              console.log("before", $scope.techs[k]);
              console.log(votesArr[i].value);
              $scope.techs[k].votes[votesArr[i].value]--;
              // console.log($scope.techs[k].votes[votesArr[i].value]++);
              console.log("after", $scope.techs[k]);
              // $scope.techs.$remove($scope.techs[k]);
              // $scope.techs.$add($scope.techs[k]);
              $scope.techs.$save($scope.techs[k]);
            }
          }
///////////////////////////////////////////////////////////
          console.log(votesArr[i], "checked");
          if($scope.clickedTech.votes[votesArr[i].value]===undefined){
            $scope.clickedTech.votes[votesArr[i].value] = 1;
          }else{
            $scope.clickedTech.votes[votesArr[i].value]++;
          }
          console.log($scope.clickedTech);
          $scope.currentUser.techniques[votesArr[i].value] = $scope.clickedTech.name;
        }
      }
      $scope.users.$save($scope.currentUser);
      // $scope.techs.$remove($scope.clickedTech);
      // $scope.techs.$add($scope.clickedTech);
      $scope.techs.$save($scope.clickedTech);
    };

    $scope.changeEdit = function(){
      if($scope.edit){
        $scope.edit=false;
      }else{
        $scope.edit=true;
      }
      // angular.element("#artName").val() = $scope.clickedArt.name;
      document.getElementById("techNameEdit").value = $scope.clickedTech.name;
      document.getElementById("techLogoEdit").value = $scope.clickedTech.image;
      document.getElementById("techDescriptionEdit").value = $scope.clickedTech.description;
      document.getElementById("techVideoEdit").value = $scope.clickedTech.video;
    };

  }
]);