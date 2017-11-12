(function () {
    'use strict';

    angular
        .module('app.authservice', ['ngRoute'])
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http','$filter', '$rootScope', '$timeout', '$q'];
    function AuthenticationService($http,$filter, $rootScope, $timeout, $q) {
    	/*
    	var service = {
    			getAcceso: getAcceso
    		  };

    	return service;
*/
    	var def = $q.defer();
    	return {
    		getAcceso: function (user,pwd) {
    	      return $http.get('http://localhost:8080/ModuloPoliza/getAcceso/usuario/'+user+'/password/'+pwd )
    	        .then(function (data) {
    	          def.resolve(data);
    	        })
    	        .error(function () {

    	        });
    	    },

          generaPoliza: function (convenio,opcionPoliza,fechaInicio) {
            return $http.get('http://localhost:8080/ModuloPoliza/generarPoliza/'+
              'practicante/'+convenio+'/opcionPoliza/'+opcionPoliza+'/fechaInicio/'+fechaInicio+'/mesDuracion/1')
              .then(function (data) {
                def.resolve(data);
              })
              .error(function () {

              });
          }
    	}
    	/*
    function getAcceso(user,pwd) {
        var promise = $q.defer();
        var req = {
          method: 'GET',
          url: 'http://localhost:8080/ModuloPoliza/getAcceso/usuario/'+user+'/password/'+pwd ,
          headers: {
          },
          dataType: 'jsonp'
        };

        $http(req)
          .then(function (data) {
            promise.resolve(data);
          })
          .error(function (data) {
            promise.reject(data);
          });

        return promise.promise;
      }*/
    }
})();