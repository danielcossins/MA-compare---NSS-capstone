var app = angular.module("MAApp",[ 'ngRoute', 'firebase']);

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
        controllers: 'AddArtCtrl'
      })
      .when('/addGenre', {
        templateUrl: 'partials/addGenre.html',
        controllers: 'AddGenreCtrl'
      })
      .when('/addTechnique', {
        templateUrl: 'partials/addTechnique.html',
        controllers: 'AddTechCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);