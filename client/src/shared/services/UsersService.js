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
            generateURL:            generateURL,
            changeUserName:         changeUserName,
            changeUserPhoto:        changeUserPhoto,
            changeUserPassword:     changeUserPassword
        };

        return service;

        function getUserPayload(){
            var token = HttpTokenAuthService.getToken();

            if(token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload;
            } else {
                return ''
            }
        }

        function getUserData(){
            var id = getUserId();
            return $http.get('/users/' + id).then(function(res){
                return res;
            }, function(err){
                return err;
            });
        }

        function getUserId(){
            return getUserPayload()._id;
        }


        function getUserRole(user){
            var accessLevel = getUserPayload().accessLevel;
            var userRoles = ['User', 'Redactor', 'Administrator'];
            return userRoles[accessLevel];
        }


        function getUsers(){
            return $http.get('/users').then(function(res){
                return res.data;
            }, function(err){
                return err.data;
            });
        }


        function uploadImage(file) {
            return Upload.upload({
                url: '/upload/user-pic/',
                method: 'POST',
                file: file
            }).then(function(res){
                return res.data;
            }, function(err){
                return err.data;
            });
        }

        function generateURL(filename){
            if(filename){
                return '/images/users/' + filename;
            } else {
                return '/images/service/no-image.png';
            }
        }

        function changeUserPhoto(user){
            return $http.put('/users/change-image/' + user._id, user).then(function(res){
                return res.data;
            }, function(err){
                return err.data;
            });
        }

        function changeUserName(user){
            return $http.put('/users/change-name/' + user._id, user).then(function(res){
                return res.data;
            }, function(err){
                return err.data;
            });
        }

        function changeUserPassword(user){
            return $http.put('/users/change-pass/' + user._id, user).then(function(res){
                return res.data;
            }, function(err){
                return err.data;
            });
        }

    }
})();