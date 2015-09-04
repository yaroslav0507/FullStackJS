(function(){
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    function AppController(){

        var vm = this;

        angular.extend(vm, {
           title: 'Hello World!'
        });
    }

})();