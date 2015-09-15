app.factory("getCheckboxes", function(){
  return function(className){
    var arr = angular.element(className);
      var storageArr = [];
      for(var i=0; i<arr.length; i++){
        if(arr[i].checked===true){
          var obj = {
            name: arr[i].value.split(",")[0],
            image: arr[i].value.split(",")[1]
          };
          if(obj.name!==undefined){
            storageArr.push(obj);
          }
        }
      }
      return storageArr;
  };
});