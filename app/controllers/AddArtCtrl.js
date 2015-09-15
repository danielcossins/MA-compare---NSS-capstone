app.controller("AddArtCtrl", 
  ["$scope",
   "$routeParams",
   "$firebaseArray",
   "$location",
   "$http",
   "getCheckboxes",
  function($scope,  $routeParams, $firebaseArray, $location, $http, getCheckboxes) {
    var ref = new Firebase("https://ma-compare.firebaseio.com/arts"); 

    // Data from firebase 
    $scope.arts = $firebaseArray(ref);
    console.log($scope.arts);


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
        image: angular.element("#logo").val()
      };
      art.genres = getCheckboxes(".genres");
      art.techniques = getCheckboxes(".techniques");
      console.log(art);

      $scope.arts.$add(art)
      .then(function () {

      });
    };

    // function getCheckboxes(className){
    //   var arr = angular.element(className);
    //   var storageArr = [];
    //   for(var i=0; i<arr.length; i++){
    //     if(arr[i].checked===true){
    //       var obj = {
    //         name: arr[i].value.split(",")[0],
    //         image: arr[i].value.split(",")[1]
    //       };
    //       if(obj.name!==undefined){
    //         storageArr.push(obj);
    //       }
    //     }
    //   }
    //   return storageArr;
    // }
  }
]);