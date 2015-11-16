(function(){
    'use strict';

    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    function HeaderController($state, AuthService, UsersService, CartService){

        var vm = this;
        if (AuthService.isLoggedIn()){
            vm.user = getUser();
        }

        angular.extend(vm, {
            isAuthenticated: AuthService.isLoggedIn,
            logOut: AuthService.logOut,
            cart: CartService.getCurrentCart(),
            transitionToDashboard: transitionToDashboard
        });

        function getUser(){
            UsersService.getUserData().then(function(response){
                vm.user = response.data;
            });
        }


        function transitionToDashboard(){
            var payload = UsersService.getUserPayload();

            $state.go(payload.accessLevel ? 'admin.main' : 'user.profile');
        }
    }
})();