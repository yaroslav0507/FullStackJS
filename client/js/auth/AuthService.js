(function(){
    'use strict';

    angular
        .module('app')
        .factory('AuthService', AuthService);

    function AuthService(HttpTokenAuthService, $http, $window){

        var auth = {
            isLoggedIn: isLoggedIn,
            userName: userName,
            userAccessLevel: userAccessLevel,
            register: register,
            logIn: logIn,
            logOut: logOut,
            getUsers: getUsers,
            getUserRole: getUserRole
        };

        return auth;

        function isLoggedIn(){
            var token = HttpTokenAuthService.getToken();

            if(token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        }

        function userName(){
            var token = HttpTokenAuthService.getToken();

            if(token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.username;
            }
        }

        function userAccessLevel(){
            var token = HttpTokenAuthService.getToken();

            if(token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.accessLevel;
            }
        }

        function getUsers(){
            return $http.get('/users').success(function (response) {
                return response;
            });
        }

        function getUserRole(user){
            var accessLevel = userAccessLevel();
            var userRoles = ['User', 'Redactor', 'Administrator'];
            return userRoles[accessLevel];
        }
        
        function register(user){
            return $http.post('/register', user).success(function (data) {
                HttpTokenAuthService.saveToken(data.token);
            });
        }

        function logIn(user){
            return $http.post('/login', user).success(function(data){
                HttpTokenAuthService.saveToken(data.token);
            })
        }

        function logOut(){
            HttpTokenAuthService.deleteToken();
        }
    }
})();