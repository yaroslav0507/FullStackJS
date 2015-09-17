(function () {
    'use strict';

    angular
        .module('app')
        .controller('SingleItemController', SingleItemController);

    function SingleItemController(item) {

        var vm = this;

        angular.extend(vm, {
            item: item
        });

    }
})();