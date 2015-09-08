(function(){
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController(ItemsService){

        var vm = this;

        angular.extend(vm, {
            items: ItemsService.items,
        });

    }
})();