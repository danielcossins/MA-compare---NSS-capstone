var app = angular.module("MAApp",[ 'ngRoute', 'firebase']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      })
      .when('/arts', {
        templateUrl: 'partials/arts.html',
        controller: 'ArtsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);