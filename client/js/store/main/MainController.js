(function(){
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController(items){

        var vm = this;

        angular.extend(vm, {
            items: items
        });

    }
})();