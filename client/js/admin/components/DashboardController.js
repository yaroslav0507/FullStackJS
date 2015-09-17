(function(){
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    function DashboardController(AuthService){
        var vm = this;

        angular.extend(vm, {
           user: AuthService.currentUser()
        });
    }
})();