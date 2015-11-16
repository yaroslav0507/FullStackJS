(function(){
    'use strict';

    angular
        .module('app')
        .controller('UserDashboardController', UserDashboardController);

    function UserDashboardController(UsersService, AuthService, $state, $scope){
        var vm = this;
        var user = getUser();

        angular.extend(vm, {
            getUserAccessLevel: user.accessLevel,
            profileOccupancy: '',
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
                return vm.user;
            });
        }

        function onNameChange(){
            $scope.$on('change-name', function(event, args){
                vm.user.username = args;
            });
        }

        function getProfileOccupancy(){

            var hasAvatar = false;
            var profileOcupancy = 50;
            var numberOfCriterias = 1;

            return getUser().then(function(response){
                if(response.image){
                    hasAvatar = true;
                }
                return hasAvatar;
            }).then(function (hasAvatar) {
                if(hasAvatar){
                    profileOcupancy += 100/2;
                }
                vm.profileOccupancy =  profileOcupancy;
            });
        }

        getProfileOccupancy();

    }
})();