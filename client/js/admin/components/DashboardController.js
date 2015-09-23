(function(){
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    function DashboardController(UsersService, AuthService, $state, $scope){
        var vm = this;
        var user = getUser();

        angular.extend(vm, {
            getUserAccessLevel: user.accessLevel,
            userRole: UsersService.getUserRole(),
            onNameChange: onNameChange(),
            logOut: logOut
        });

        function logOut(){
            AuthService.logOut();
            $state.go('store.main');
        }

        function getUser(){
            return UsersService.getUserData().then(function(response){
                vm.user = response.data;
            })
        }

        function onNameChange(){
            $scope.$on('change-name', function(event, args){
                vm.user.username = args;
            });
        }


    }
})();