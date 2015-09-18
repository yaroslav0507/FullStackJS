(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    function ProfileController(user, UsersService) {

        var vm = this;

        angular.extend(vm, {
            user: user,
            userRole: UsersService.getUserRole(vm.user),
            uploadPhoto: uploadPhoto,
            updateUser: updateUser
        });

        function updateUser(){
            var userImage = vm.file;
            if(userImage){
                UsersService.uploadImage(userImage).then(function(filename){
                    vm.user.imageURL = '/images/users/' + filename;

                    UsersService.updateUser(vm.user).then(function () {
                        vm.message = 'Your profile is successfully updated.';
                    });
                })
            } else {
                UsersService.updateUser(vm.user).then(function () {
                    vm.message = 'Your profile is successfully updated.';
                });
            }
        }

        function uploadPhoto(){
            var userImage = vm.file;
            UsersService.uploadImage(userImage).then(function(response){
                return UsersService.generateURL(response);
            }).then(function(response){
                console.log(response);
                vm.user.imageURL = response;
                UsersService.updateUser(vm.user);
            })
        }
    }
})();