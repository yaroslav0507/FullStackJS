(function(){
    'use strict';

    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    function HeaderController(ItemsService){

        var vm = this;

        angular.extend(vm, {
            isAuthenticated: isAuthenticated,
            logOut: logOut,
            userName: localStorage.getItem("userName"),
            items: ItemsService
        });

        function isAuthenticated(){
            if(localStorage.getItem("userName")){
                return true;
            }
        }

        function logOut(){
            localStorage.removeItem("userName");
            localStorage.removeItem("authToken");
        }

    }
})();