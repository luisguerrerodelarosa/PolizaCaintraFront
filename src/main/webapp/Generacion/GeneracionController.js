(function () {
    'use strict';

    angular
        .module('app.generacion', ['ngRoute'])
        .controller('GeneracionController', GeneracionController);

    GeneracionController.$inject = ['$location', '$rootScope','$scope','$http','$filter'];
    function GeneracionController( $location, $rootScope,$scope,$http,$filter) {
    	var host = "http://www.administraciondepracticantes.com"
    	
        $scope.usuario = angular.fromJson(localStorage.getItem('usuario'));
        if($scope.usuario  == null)
           $location.path('/');
        $scope.estatusProceso=1;
        $scope.convenio="";
        $scope.opcionSeguro;
        $scope.fechaActual= $filter("date")(Date.now(), 'yyyy-MM-dd');
        $scope.fechaInicio= new Date($scope.fechaActual);
        $scope.practicante={};
        $scope.units = [
                        {'id': 1, 'label': 'Opcion 1'},
                        {'id': 2, 'label': 'Opcion 2'}
                    ];
        
        
        $scope.practicante = {};
        $scope.generaPoliza= function () {
            var fecha =  $filter('date')($scope.fechaInicio, "yyyy-MM-dd");
            $http.get(host+'/ModuloPoliza/generarPoliza/'+
              'practicante/'+$scope.convenio+'/opcionPoliza/'+$scope.opcionSeguro+'/fechaInicio/'+fecha+'/mesDuracion/1')
                .then(function(response){
                  if(response.data != null){
                   if(response.data.respuestaServicio){
                        
                       // console.log(response.data);
                        localStorage.setItem('poliza', angular.toJson(response.data.polizaPracticante));
                         $location.path('/finish');
                       }else{
                         $scope.estatusProceso=1;  
                         localStorage.setItem('poliza', null);
                          alert(response.data.mensajeRespuesta);
                          $location.path('/finish');
                       }
                  }else{
                     alert("Error al consultar el Servicio de Practicante");
                     return; 
                   }
                  

              });
        }
        $scope.getConvenio = function () {
            if(angular.isUndefined($scope.convenio) || $scope.convenio == null || $scope.convenio == ""){
                alert("Favor de Capturar el Convenio");
                return;
             }
             if(angular.isUndefined($scope.opcionSeguro) || $scope.opcionSeguro == null){
                alert("Favor de Capturar la Opcion de Seguro");
                return;
             }

             if (!isNaN($scope.convenio)) {
                $http.get(host+'/ModuloPoliza/getPracticante/practicante/'+$scope.convenio)
                .then(function(response){
                  if(response.data != null){
                   if(response.data.respuestaServicio){
                        $scope.estatusProceso=2;
                        $scope.practicante = response.data.practicanteCaintra;
                        console.log($scope.practicante);
                       }else{
                         $scope.estatusProceso=1;  
                          alert(response.data.mensajeRespuesta);
                          return; 
                       }
                  }else{
                     alert("Error al consultar el Servicio de Practicante");
                     return; 
                   }
                  

              });
            }else{
                  alert("Favor de Capturar Correctamente el Convenio");
                return;   
            }
           	 
        }
    }

})();
