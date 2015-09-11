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

        function makeShortDescriptions(length){
            vm.items.forEach(function(item){
                item.shortDescription = item.description.substr(0, length) + '..';
            });
        }

        makeShortDescriptions(120);
    }
})();