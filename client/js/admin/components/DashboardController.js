(function(){
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    function DashboardController(UsersService, AuthService, $state){
        var vm = this;
        var user = UsersService.getUserInfo();

        angular.extend(vm, {
            user: user.username,
            userPic: user.imageURL,
            getUserAccessLevel: user.accessLevel,
            userRole: UsersService.getUserRole(),
            logOut: logOut
        });

        function logOut(){
            AuthService.logOut();
            $state.go('store.main');
        }
    }
})();