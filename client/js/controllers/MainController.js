(function(){
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController(){

        var vm = this;

        angular.extend(vm, {
            login: localStorage.getItem("username")
        });

    }
})();