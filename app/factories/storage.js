app.factory("storage", function(){
  var userId = null;
  var authData;

  return {
    getUserId: function() {
      return userId;
    },
    setUserId: function(id) {
      userId = id;
      console.log("userId", userId);
    },

    getAuthData: function(){
      return authData;
    },
    setAuthData: function(data){
      authData = data;
      console.log(authData);
    }
  };

});