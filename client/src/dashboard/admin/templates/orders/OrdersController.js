(function () {
    'use strict';

    angular
        .module('app')
        .controller('OrdersController', OrdersController);

    function OrdersController(orders, OrdersService) {

        var vm = this;

        angular.extend(vm, {
            orders: orders,
            deleteOrder: deleteOrder
        });


        function deleteOrder(order) {
            var id = order._id;

            OrdersService.deleteOrder(id).then(function () {
                vm.orders = vm.orders.filter(function (vmOrder) {
                    return vmOrder._id !== id;
                });
            });
        }

    }
})();