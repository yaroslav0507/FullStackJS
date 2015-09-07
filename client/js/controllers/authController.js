(function(){
    'use strict';

    angular
        .module('app')
        .controller('authController', authController);

    function authController($state){

        (function(){
            if(localStorage.getItem("authToken") === "yes"){
                $state.go('home');
            }
        })();

        var vm = this;

        angular.extend(vm, {
            title: "Enter credentials of fuck off",
            loginInput: this.loginInput,
            loginPassword: this.loginPassword,
            login: "balkon94",
            password: "qwerty",
            tryLogin: tryLogin,
            credentialsAreTrue: credentialsAreTrue
        });

        function tryLogin(){
            if(vm.loginInput === vm.login && vm.loginPassword === vm.password){
                localStorage.setItem("authToken", "yes");
                $state.go('home');
            }
        }

        function credentialsAreTrue(){
            if(vm.loginInput === vm.login && vm.loginPassword === vm.password){
                return false;
            }else{
                return true;
            }
        }

    }
})();