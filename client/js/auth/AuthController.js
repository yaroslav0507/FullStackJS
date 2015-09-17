(function(){
    'use strict';

    angular
        .module('app')
        .controller('AuthController', AuthController);

    function AuthController($state, AuthService){

        var vm = this;

        angular.extend(vm, {
            user: {
                username: '',
                password: ''
            },
            register: register,
            logIn: logIn
        });

        function register(){
            AuthService.register(vm.user).error(function(error){
               vm.error = error;
            }).then(function(){
                $state.go('store.main');
            });
        }

        function logIn(){
            AuthService.logIn(vm.user).error(function(error){
                vm.error = error;
            }).then(function(){
                $state.go('store.main');
            });
        }

    }
})();