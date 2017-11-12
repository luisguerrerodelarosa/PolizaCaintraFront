(function () {
    'use strict';

    angular .module('app.acceso', ['ngRoute'])
    .controller('AccesoController', AccesoController);

    AccesoController.$inject = ['$location', 'AuthenticationService','$http','$scope'];
    function AccesoController($location, AuthenticationService,$http,$scope) {
    	var host = "http://www.administraciondepracticantes.com"
    	$scope.username="";
    	$scope.password="";
    	$scope.login = function () {
    		$http.get(host+'/ModuloPoliza/getAcceso/usuario/'+$scope.username+'/password/'+$scope.password)
            .then(function(response){
              if(response.data.respuestaServicio){
                  localStorage.setItem('usuario', angular.toJson($scope.username));
            	  $location.path('/generar');
              }else{
            	  alert(response.data.mensajeRespuesta);
              }

		    });
    	  };
    }

})();
