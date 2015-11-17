(function(){
    'use strict';

    angular
        .module('app')
        .factory('UsersService', UsersService);

    function UsersService($http, Upload, HttpTokenAuthService, $window){

        var service = {
            getUserPayload:         getUserPayload,
            getUserId:              getUserId,
            getUserData:            getUserData,
            getUserRole:            getUserRole,
            getUsers:               getUsers,
            uploadImage:            uploadImage,
            changeUserName:         changeUserName,
            changeUserPhoto:        changeUserPhoto,
            changeUserPassword:     changeUserPassword,
            updateUserInfo:         updateUserInfo
        };

        return service;

        function getUserPayload(){
            var token = HttpTokenAuthService.getToken();

            if(token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload;
            } else {
                return '';
            }
        }

        function getUserData(){
            var id = getUserId();
            return $http.get('/users/' + id).then(function(response){
                return response;
            }, function(err){
                return err;
            });
        }

        function getUserId(){
            return getUserPayload()._id;
        }


        function getUserRole(){
            var accessLevel = getUserPayload().accessLevel;
            var userRoles = ['User', 'Redactor', 'Administrator'];
            return userRoles[accessLevel];
        }


        function getUsers(){
            return $http.get('/users').then(function(response){
                return response;
            }, function(err){
                return err;
            });
        }


        function uploadImage(file) {
            return Upload.upload({
                url: '/upload/user-pic/',
                method: 'POST',
                file: file
            }).then(function(response){
                return response.data;
            }, function(err){
                return err.data;
            });
        }

        function changeUserPhoto(user){
            return $http.put('/users/change-image/' + user._id, user).then(function(response){
                return response.data;
            }, function(err){
                return err.data;
            });
        }

        function changeUserName(user){
            return $http.put('/users/change-name/' + user._id, user).then(function(response){
                return response.data;
            }, function(err){
                return err.data;
            });
        }

        function changeUserPassword(user){
            return $http.put('/users/change-pass/' + user._id, user).then(function(response){
                return response.data;
            }, function(err){
                return err.data;
            });
        }

        function updateUserInfo(user){
            return $http.put('/users/update-info/', user).then(function(response){
                return response.data;
            }, function(err){
                return err.data;
            });
        }

    }
})();