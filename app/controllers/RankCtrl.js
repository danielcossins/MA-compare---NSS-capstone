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
        $scope.bestArt = $scope.arts[0];
        for(var i=0; i<$scope.arts.length; i++){
          if($scope.arts[i].votes.Overall > $scope.bestArt.votes.Overall){
            $scope.bestArt = $scope.arts[i];
          }
        }






        $scope.techs.$loaded()
        .then(function() {
          $scope.bestTech = $scope.techs[0];
          for(var i=0; i<$scope.techs.length; i++){
            if($scope.techs[i].votes.Overall > $scope.bestTech.votes.Overall){
              $scope.bestTech = $scope.techs[i];
            }
          }








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
              }
              if($scope.art.votes[$scope.genres[k].name]===0){
                $scope.art.name = "No award";
                $scope.art.image = "";
              }
              if($scope.arts[j].votes[$scope.genres[k].name]===undefined){
                $scope.arts[j].votes[$scope.genres[k].name] = 0;
              }
              if($scope.arts[j].votes[$scope.genres[k].name]===0){
                $scope.arts[j].name = "No award";
                $scope.arts[j].image = "";
              }
              if($scope.arts[j].votes[$scope.genres[k].name]>$scope.art.votes[$scope.genres[k].name]){
                $scope.art = $scope.arts[j];
                //IF THERE IS A BUG, THIS IS PROBABLY WHERE IT IS
                $scope.bestArtsArr[k] = $scope.art;
                break;
              }
            }
            console.log("for "+$scope.genres[k].name, $scope.art);


            // $scope.tech = {
            //   name: "No award"
            // };
            $scope.tech = $scope.techs[0];
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
              if($scope.tech.votes[$scope.genres[k].name]===0){
                $scope.tech.name = "No award";
                $scope.tech.image = "";
              }
              console.log("techs", $scope.techs[l].votes[$scope.genres[k].name]);
              console.log("local", $scope.tech.votes[$scope.genres[k].name]);
              if($scope.techs[l].votes[$scope.genres[k].name]>$scope.tech.votes[$scope.genres[k].name]){
                console.log("made it in");
                $scope.tech = $scope.techs[l];
                //IF THERE IS A BUG, THIS IS PROBABLY WHERE IT IS
                $scope.bestTechsArr[k] = $scope.tech;
                break;
              }
            }
            console.log($scope.bestTechsArr);
            console.log("for "+$scope.genres[k].name, $scope.tech);
          }
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

    


    // $scope.genres.$loaded()
    // .then(function() {
    //   console.log($scope.arts);
    //   for(var k=0; k<$scope.genres.length; k++){
    //     console.log($scope.arts[0]);
    //     $scope[$scope.genres[k].name] = $scope.arts[0];
    //     console.log("$scope."+[$scope.genres[k].name], $scope[$scope.genres[k].name]);
    //     for(var i=0; i<$scope.arts.length; i++){
    //       if($scope.arts[i].votes.Overall > $scope[$scope.genres[k].name].votes.Overall){
    //         $scope[$scope.genres[k].name] = $scope.arts[i];
    //       }
    //     }
    //     console.log("for "+$scope.genres[k].name, $scope[$scope.genres[k].name]);
    //   }
    // })
    // .catch(function(err) {
    //   console.error(err);
    // });

    
  }
]);