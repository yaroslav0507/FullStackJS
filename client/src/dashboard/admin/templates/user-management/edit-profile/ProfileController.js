(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    function ProfileController(user, UsersService, $state, $scope) {

        var vm = this;

        angular.extend(vm, {
            user: user,
            message: '',
            userRole: UsersService.getUserRole(vm.user),
            uploadPhoto: uploadPhoto,
            updateUser: updateUser,
            getUserData: getUserData,
            changeUserName: changeUserName,
            changeUserPassword: changeUserPassword
        });

        function updateUser(){
            var userImage = vm.file;
            if(userImage){
                UsersService.uploadImage(userImage).then(function(urls){
                    vm.user.image = urls;

                    UsersService.updateUser(vm.user).then(function () {
                        vm.message = 'Your profile is successfully updated.';
                    });
                });
            } else {
                UsersService.updateUser(vm.user).then(function () {
                    vm.message = 'Your profile is successfully updated.';
                });
            }
        }

        function uploadPhoto(){
            var userImage = vm.file;
            UsersService.uploadImage(userImage).then(function(response){
                vm.user.image = response;
                UsersService.changeUserPhoto(vm.user);

                $state.reload();
            });
        }

        function getUserData(){
            return UsersService.getUserData(user._id).then(function (response) {
                vm.user.imageURL = response.image;
            });
        }

        function changeUserName(){
            vm.user._id = UsersService.getUserId();
            UsersService.changeUserName(vm.user).then(function (response) {
                if(response.message){
                    vm.message = response.message;
                } else {
                    vm.user.username = response;
                    vm.message = 'Your login successfuly changed to ' + vm.user.username;
                    $scope.$emit('change-name', response);
                }
            });

        }

        function changeUserPassword(){
            UsersService.changeUserPassword(vm.user).then(function (response) {
                if(response.message){
                    vm.message = response.message;
                }
            });
        }
    }
})();