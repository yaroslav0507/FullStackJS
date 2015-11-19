(function(){
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    function AppController($state, $window, $location){

        var vm = this;

        angular.extend(vm, {
            title: 'E-commerce',
            goBack: goBack,
            getLocation: getLocation
        });

        toastr.options = {
            'closeButton': false,
            'debug': false,
            'newestOnTop': true,
            'progressBar': true,
            'positionClass': 'toast-top-right',
            'preventDuplicates': true,
            'onclick': goToCart,
            'showDuration': '300',
            'hideDuration': '1000',
            'timeOut': '5000',
            'extendedTimeOut': '1000',
            'showEasing': 'swing',
            'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        };

        function goToCart(){
            $state.go('store.cart');
        }

        function goBack(){
            $window.history.back();
        }

        function getLocation(){
            return $location.absUrl();
        }
    }

})();