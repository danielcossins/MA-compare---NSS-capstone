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


            $scope.art = $scope.arts[0];
            $scope.bestArtsArr.push($scope.art);
            console.log("$scope.art", $scope.art);
            for(var j=0; j<$scope.arts.length; j++){
              if($scope.art.votes[$scope.genres[k].name]===undefined){
                $scope.art.votes[$scope.genres[k].name] = 0;
                // $scope.art.name = "No Award";
              }
              if($scope.arts[j].votes[$scope.genres[k].name]===undefined){
                $scope.arts[j].votes[$scope.genres[k].name] = 0;
                // $scope.arts[j].name = "No Award";
              }
              if($scope.arts[j].votes[$scope.genres[k].name]>$scope.art.votes[$scope.genres[k].name]){
                $scope.art = $scope.arts[j];
              }
            }
            if($scope.art.votes[$scope.genres[k].name]===undefined || $scope.art.votes[$scope.genres[k].name]===0){
              $scope.art.name="No Award";
              $scope.art.image="";
            }
            console.log("for "+$scope.genres[k].name, $scope.art);
            $scope.bestArtsArr[k] = $scope.art;


            // $scope.tech = {
            //   name: "No award"
            // };
            $scope.tech = $scope.techs[$scope.techs.length-1];
            $scope.bestTechsArr.push($scope.tech);
            console.log($scope.tech);
            /////POSSIBLE BUG: DOESN"T LOAD $scope.techs if remove console.log
            console.log($scope.techs);
            //might need to move all of this to $scope.techs.$loaded()
            console.log("$scope.tech", $scope.tech);
            for(var l=0; l<$scope.techs.length; l++){
              if($scope.tech.votes[$scope.genres[k].name]===undefined){
                $scope.tech.votes[$scope.genres[k].name] = 0;
              }
              if($scope.techs[l].votes[$scope.genres[k].name]===undefined){
                $scope.techs[l].votes[$scope.genres[k].name] = 0;
              }
              if($scope.techs[l].votes[$scope.genres[k].name]>$scope.tech.votes[$scope.genres[k].name]){
                $scope.tech = $scope.techs[l];
                //IF THERE IS A BUG, THIS IS PROBABLY WHERE IT IS
              }
            }
            if($scope.tech.votes[$scope.genres[k].name]===undefined || $scope.tech.votes[$scope.genres[k].name]===0){
              $scope.tech.name = "No Award";
              $scope.tech.image = "";
            }
            console.log("for "+$scope.genres[k].name, $scope.tech);
            $scope.bestTechsArr[k] = $scope.tech;
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