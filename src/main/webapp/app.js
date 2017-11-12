'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'ngRoute',
  'app.acceso',
  'app.generacion',
  'app.authservice','app.final'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  //$locationProvider.hashPrefix('!');

  $routeProvider
  .when('/', {
	            controller: 'AccesoController',
	            templateUrl: 'Acceso/Acceso.html'
	        })
	        .when('/generar', {
                controller: 'GeneracionController',
                templateUrl: 'Generacion/Generacion.html'
            })
          .when('/finish', {
                controller: 'FinalController',
                templateUrl: 'Termino/Termino.html'
            })
  .otherwise({redirectTo: '/'});
}]);
