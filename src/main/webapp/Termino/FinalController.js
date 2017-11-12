(function () {
    'use strict';

    angular
        .module('app.final', ['ngRoute'])
        .controller('FinalController', FinalController);

    FinalController.$inject = ['$location', '$rootScope','$scope','$http','$filter','$window'];
    function FinalController( $location, $rootScope,$scope,$http,$filter,$window) {
             $scope.usuario = angular.fromJson(localStorage.getItem('usuario'));
             if($scope.usuario  == null)
                   $location.path('/');
             $scope.poliza = angular.fromJson(localStorage.getItem('poliza'));
             $scope.mensajePrincipal = "";
             $scope.error=0;
             if($scope.poliza == null){
                    $scope.mensajePrincipal = "No se Genero Correctamente la Poliza Favor de Reintentarlo";
                    $scope.error=1;
             }else{
                $scope.error=0;
                $scope.mensajePrincipal ="Se genero Correctamente la Poliza "+$scope.poliza.numeroPoliza+
                " <br> La puedes consultar en la siguiente URL<br>"
             }
             $scope.redirectPoliza = function(){
                $window.open($scope.poliza.descargaPoliza, '_blank');
            };

             $scope.regresar = function () {
                $location.path('/generar');
             };
       }

})();