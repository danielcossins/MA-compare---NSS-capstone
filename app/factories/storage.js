app.factory("storage", function(){
  var userId = null;

  return {
    getUserId: function() {
      return userId;
    },
    setUserId: function(id) {
      userId = id;
    }
  };

});