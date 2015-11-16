(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserOrdersController', UserOrdersController);

    function UserOrdersController(orders) {

        var vm = this;

        angular.extend(vm, {
            orders: orders
        });

    }
})();