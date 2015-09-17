app.controller("ArtDetailsCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
  function($scope,  $routeParams, $firebaseArray, $location) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/arts"); 

    // Data from firebase 
    $scope.arts = $firebaseArray(ref);
    console.log($scope.arts);
    console.log($routeParams.name);

    var ref2 = new Firebase("https://ma-compare.firebaseio.com/genres"); 

    // Data from firebase 
    $scope.genres = $firebaseArray(ref2);

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
        }
      }
      $scope.arts.$remove($scope.clickedArt);
      $scope.arts.$add($scope.clickedArt);
    };
  }
]);