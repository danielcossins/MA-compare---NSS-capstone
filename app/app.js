var app = angular.module("MAApp",[ 'ngRoute', 'firebase'])
.factory("storage", function(){
  var authData;

  return {

    getAuthData: function(){
      return authData;
    },
    setAuthData: function(data){
      authData = data;
      console.log(authData);
    }
  };

})
.run([
   "$firebaseAuth",
   "storage",
  function($firebaseAuth, storage){
    var ref = new Firebase("https://ma-compare.firebaseio.com/");
    this.auth = $firebaseAuth(ref);

    this.auth.$onAuth(function(authData) {
      storage.setAuthData(authData);
    });
  }
]);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      })
      //Art routes
      .when('/arts', {
        templateUrl: 'partials/arts.html',
        controller: 'ArtsCtrl'
      })
      .when('/arts/:name', {
        templateUrl: 'partials/art-details.html',
        controller: 'ArtDetailsCtrl'
      })
      //Genre routes
      .when('/genres', {
        templateUrl: 'partials/genres.html',
        controller: 'GenreCtrl'
      })
      .when('/genres/:name', {
        templateUrl: 'partials/genre-details.html',
        controller: 'GenreDetailsCtrl'
      })
      //Technique routes
      .when('/techniques', {
        templateUrl: 'partials/techniques.html',
        controller: 'TechCtrl'
      })
      .when('/techniques/:name', {
        templateUrl: 'partials/technique-details.html',
        controller: 'TechDetailsCtrl'
      })
      //Adding routes
      .when('/addArt', {
        templateUrl: 'partials/addArt.html',
        controller: 'AddArtCtrl'
      })
      .when('/addGenre', {
        templateUrl: 'partials/addGenre.html',
        controller: 'AddGenreCtrl'
      })
      .when('/addTechnique', {
        templateUrl: 'partials/addTechnique.html',
        controller: 'AddTechCtrl'
      })
      //login
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'AuthCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);