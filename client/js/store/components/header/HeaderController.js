(function(){
    'use strict';

    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    function HeaderController(ItemsService, AuthService){

        var vm = this;

        angular.extend(vm, {
            isAuthenticated: AuthService.isLoggedIn,
            logOut: AuthService.logOut,
            userName: AuthService.currentUser(),
            items: ItemsService
        });

    }
})();