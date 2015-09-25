app.controller("RankCtrl", 
  ["$scope",
   "$firebaseArray",
  function($scope, $firebaseArray) {
    //CSS
    angular.element(".active").removeClass("active");
    angular.element("#rankings").addClass("active");
    /////

    var ref = new Firebase("https://ma-compare.firebaseio.com/genres"); 
    $scope.genres = $firebaseArray(ref);

    var ref2 = new Firebase("https://ma-compare.firebaseio.com/arts"); 
    $scope.arts = $firebaseArray(ref2);

    var ref3 = new Firebase("https://ma-compare.firebaseio.com/techniques"); 
    $scope.techs = $firebaseArray(ref3);





    $scope.genres.$loaded()
    .then(function() {

      $scope.arts.$loaded()
      .then(function() {
        console.log($scope.arts);
        $scope.bestArt = $scope.arts[0];
        if($scope.bestArt.votes.Overall===undefined){
          $scope.bestArt.votes.Overall=0;
        }
        for(var i=0; i<$scope.arts.length; i++){
          if($scope.arts[i].votes.Overall===undefined){
            $scope.arts[i].votes.Overall=0;
          }
          if($scope.arts[i].votes.Overall > $scope.bestArt.votes.Overall){
            $scope.bestArt = $scope.arts[i];
          }
        }
        console.log($scope.bestArt);






        $scope.techs.$loaded()
        .then(function() {
          console.log($scope.techs);
          $scope.bestTech = $scope.techs[0];
          if($scope.bestTech.votes.Overall===undefined){
            $scope.bestTech.votes.Overall=0;
          }
          for(var i=0; i<$scope.techs.length; i++){
            if($scope.techs[i].votes.Overall===undefined){
              $scope.techs[i].votes.Overall=0;
            }
            if($scope.techs[i].votes.Overall > $scope.bestTech.votes.Overall){
              $scope.bestTech = $scope.techs[i];
            }
          }
          console.log($scope.bestTech);








          $scope.count = [];
          console.log($scope.arts);
          $scope.bestArtsArr = [];
          $scope.bestTechsArr = [];
          for(var k=0; k<$scope.genres.length; k++){
            //count needed for display
            $scope.count.push(k);


            // var art = $scope.arts[0];
            var art = {
              name: "No Award",
              image: "",
              votes: {
                
              }
            };
            $scope.bestArtsArr.push(art);
            console.log("$scope.art", art);
            for(var j=0; j<$scope.arts.length; j++){
              if(art.votes[$scope.genres[k].name]===undefined){
                art.votes[$scope.genres[k].name] = 0;
              }
              if($scope.arts[j].votes[$scope.genres[k].name]===undefined){
                $scope.arts[j].votes[$scope.genres[k].name] = 0;
              }
              if($scope.arts[j].votes[$scope.genres[k].name]>art.votes[$scope.genres[k].name]){
                art = $scope.arts[j];
              }
            }
            console.log("for "+$scope.genres[k].name, art);
            $scope.bestArtsArr[k] = art;


            // tech = $scope.techs[$scope.techs.length-1];
            var tech = {
              name: "No award",
              image: "",
              votes: {

              }
            };
            $scope.bestTechsArr.push(tech);
            console.log(tech);
            console.log($scope.techs);
            console.log("$scope.tech", tech);
            for(var l=0; l<$scope.techs.length; l++){
              if(tech.votes[$scope.genres[k].name]===undefined){
                tech.votes[$scope.genres[k].name] = 0;
              }
              if($scope.techs[l].votes[$scope.genres[k].name]===undefined){
                $scope.techs[l].votes[$scope.genres[k].name] = 0;
              }
              if($scope.techs[l].votes[$scope.genres[k].name]>tech.votes[$scope.genres[k].name]){
                tech = $scope.techs[l];
              }
            }
            console.log("for "+$scope.genres[k].name, tech);
            $scope.bestTechsArr[k] = tech;
          }
          console.log($scope.bestTechsArr);
        })
        .catch(function(err) {
          console.error(err);
        });
      })
      .catch(function(err) {
        console.error(err);
      });

      






      
    })
    .catch(function(err) {
      console.error(err);
    });

    








    
  }
]);