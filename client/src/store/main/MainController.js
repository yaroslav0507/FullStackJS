(function(){
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController(items, cart, CartService){

        var vm = this;

        angular.extend(vm, {
            items: items.map(makeShortDescriptions.bind(null, 120)),
            predicate: 'price',
            reverse: false,
            order: order,
            cart: cart,
            addToCart: addToCart,
            deleteFromCart: deleteFromCart
        });


        function addToCart(id){
            CartService.addToCart(id).then(function(cart){
                vm.cart = cart;
            });
            console.log(vm.cart);
        }

        function deleteFromCart(id){
            CartService.deleteFromCart(id);
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