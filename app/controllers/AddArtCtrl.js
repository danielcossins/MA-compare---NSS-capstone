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
    };

    function getCheckboxes(className){
      var arr = angular.element(className);
      console.log(arr);
      var storageArr = [];
      for(var i=0; i<arr.length; i++){
        if(arr[i].checked===true){
          console.log("this one matches", arr[i]);
          var obj = {
            name: arr[i].value
          };
          console.log(obj);
///////////////gets the image for that name
          if(className===".genres"){
            for(var k=0; k<$scope.genres.length; k++){
              if($scope.genres[k].name === obj.name){
                obj.image = $scope.genres[k].image;
              }
            }
          }else if(className===".techniques"){
            for(var j=0; j<$scope.techniques.length; j++){
              if($scope.techniques[j].name === obj.name){
                obj.image = $scope.techniques[j].image;
              }
            }
          }

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