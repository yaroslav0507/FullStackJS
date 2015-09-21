(function(){
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    function DashboardController(UsersService, AuthService, $state){
        var vm = this;
        var user = UsersService.getUserPayload();

        angular.extend(vm, {
            user: user,
            getUserAccessLevel: user.accessLevel,
            userRole: UsersService.getUserRole(),
            userData: userData(),
            logOut: logOut
        });

        function logOut(){
            AuthService.logOut();
            $state.go('store.main');
        }

        function userData(){
            return UsersService.getUserData(user._id).success(function (response) {
                user.imageURL = response.image;
            });
        }

    }
})();