(function(){
    'use strict';

    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    function HeaderController(AuthService, UsersService){

        var vm = this;
        var user = getUser();

        angular.extend(vm, {
            isAuthenticated: AuthService.isLoggedIn,
            logOut: AuthService.logOut
        });

        function getUser(){
            UsersService.getUserData().then(function(response){
                vm.user = response.data;
            })
        }

    }
})();