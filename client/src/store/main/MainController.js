(function(){
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController(items, LocalCartService){

        var vm = this;

        angular.extend(vm, {
            items: items.map(makeShortDescriptions.bind(null, 120)),
            predicate: 'price',
            reverse: false,
            order: order,
            cart: {
                itemsCount: LocalCartService.getItemsCount()
            },
            addToCart: addToCart,
            deleteFromCart: removeFromCart
        });


        function addToCart(id){
            LocalCartService.addToCart(id);
            vm.cart.itemsCount += 1;
        }

        function removeFromCart(id){
            LocalCartService.deleteFromCart(id);
            vm.cart.itemsCount -= 1;
        }

        function makeShortDescriptions(length, item) {
            if (item.description.length > length) {
                item.shortDescription = item.description.substr(0, length) + '..';
            } else {
                item.shortDescription = item.description
            }
            return item;
        }

        function order(predicate){
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        }

    }
})();