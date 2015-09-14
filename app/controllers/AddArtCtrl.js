app.controller("AddArtCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$http",
  function($scope,  $routeParams, $firebaseArray, $location, $http) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/arts"); 

    // Data from firebase 
    $scope.arts = $firebaseArray(ref);


    $http.get("https://ma-compare.firebaseio.com/genres/.json").
    then(function(data) {
      console.log(data);
      $scope.genres = data.data;
    });

    $http.get("https://ma-compare.firebaseio.com/techniques/.json").
    then(function(data) {
      console.log(data);
      $scope.techniques = data.data;
    });




    $scope.saveToFirebase = function(){
      var art = {
        name: angular.element("#name").val(),
        description: angular.element("#description").val(),
        image: angular.element("#image").val()
      };
      art.genres = getCheckboxes(".genres");
      art.techniques = getCheckboxes(".techniques");
      console.log(art);
      // var genreBoxesArr = angular.element(".genres");
      // console.log(genreBoxesArr);
      // for(var i=0; i<genreBoxesArr.length; i++){
      //   if(genreBoxesArr[i].checked===true){
      //     console.log("this one matches", genreBoxesArr[i]);
      //     var genre = {
      //       name: genreBoxesArr[i].value
      //     };
      //     //gets teh image for that genre
      //     for(var l=0; l<$scope.genres.length; l++){
      //       if($scope.genres[l].name===genre.name){
      //         genre.image = $scope.genres[l].image;
      //       }
      //     }
      //     //pushes the genre object
      //     art.genres.push(genreBoxesArr[i].value);
      //   }else{
      //     console.log("no match");
      //   }
      // }
      // var techniqueBoxesArr = angular.element(".techniques");
      // console.log(techniqueBoxesArr);
      // for(var j=0; j<techniqueBoxesArr.length; j++){
      //   if(techniqueBoxesArr[j].checked===true){
      //     console.log("this one matches", techniqueBoxesArr[j]);
      //     var technique = {
      //       name: techniqueBoxesArr[j].value
      //     };
      //     //gets the image for that technique
      //     for(var k=0; k<$scope.techniques.length; k++){
      //       if($scope.techniques[k].name===technique.name){
      //         technique.image = $scope.techniques[k].image;
      //       }
      //     }
      //     //pushes the technique object
      //     art.techniques.push(technique);
      //   }else{
      //     console.log("no match");
      //   }
      // }
      // console.log(art);


    };

    function getCheckboxes(className){
      var arr = angular.element(className);
      var storageArr = [];
      for(var i=0; i<arr.length; i++){
        if(arr[i].checked===true){
          console.log("this one matches", arr[i]);
          var obj = {
            name: arr[i].value
          };
          //pushes the technique object
          // if(obj.genres===undefined || obj.techniques===undefined){
          // }else{
          //   return obj;
          // }
          if(obj.name!==undefined){
            storageArr.push(obj);
          }
        }else{
          console.log("no match");
        }
      }
      return storageArr;
    }
  }
]);