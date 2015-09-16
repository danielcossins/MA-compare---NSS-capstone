app.controller("TechDetailsCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
  function($scope,  $routeParams, $firebaseArray, $location) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/techniques"); 

    // Data from firebase 
    $scope.techs = $firebaseArray(ref);
    console.log($scope.techs);
    console.log($routeParams.name);


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

    //voting functionality
    $scope.clicked=false;
    $scope.vote = function(){
      if($scope.clickedTech.votes!==undefined){
        $scope.clickedTech.votes++;
      }else{
        $scope.clickedTech.votes = 1;
      }
      console.log($scope.clickedTech);
      $scope.clicked=true;
      $scope.techs.$remove($scope.clickedTech);
      $scope.techs.$add($scope.clickedTech);
    };

  }
]);