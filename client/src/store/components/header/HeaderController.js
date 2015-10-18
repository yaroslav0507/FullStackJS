(function(){
    'use strict';

    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    function HeaderController(AuthService, UsersService, CartService){

        var vm = this;
        if (AuthService.isLoggedIn()){
            var user = getUser();
        }

        angular.extend(vm, {
            isAuthenticated: AuthService.isLoggedIn,
            logOut: AuthService.logOut,
            cart: CartService.getCurrentCart()
        });

        function getUser(){
            UsersService.getUserData().then(function(response){
                vm.user = response.data;
            })
        }

    }
})();