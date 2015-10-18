(function(){
    'use strict';

    angular
        .module('app')
        .controller('FooterController', FooterController);

    function FooterController(){

        var vm = this;

        angular.extend(vm, {
            getYear: getYear
        });

        function getYear(){
            return new Date().getFullYear();
        }

    }
})();