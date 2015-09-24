var app = angular.module("MAApp",[ 'ngRoute', 'firebase'])
.run([
   "$firebaseAuth",
   "$rootScope",
  function($firebaseAuth, $rootScope){
    var ref = new Firebase("https://ma-compare.firebaseio.com/");
    this.auth = $firebaseAuth(ref);
    $rootScope.user = ref.getAuth();
    console.log($rootScope.user);
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
      //rankings
      .when('/rankings', {
        templateUrl: 'partials/rankings.html',
        controller: 'RankCtrl'
      })
      //user profile
      .when('/profile/:uid', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/users', {
        templateUrl: 'partials/users.html',
        controller: 'UserCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);