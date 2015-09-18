(function(){
    'use strict';

    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    function HeaderController(AuthService, UsersService){

        var vm = this;
        var user = UsersService.getUserInfo();

        angular.extend(vm, {
            isAuthenticated: AuthService.isLoggedIn,
            logOut: AuthService.logOut,
            userName: user.username
        });

    }
})();