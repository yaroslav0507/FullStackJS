(function(){
    'use strict';

    angular
        .module('app')
        .factory('AuthService', AuthService);

    function AuthService(HttpTokenAuthService, $http, $window){

        var auth = {
            isLoggedIn: isLoggedIn,
            currentUser: currentUser,
            register: register,
            logIn: logIn,
            logOut: logOut
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

        function currentUser(){
            var token = HttpTokenAuthService.getToken();

            if(token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.username;
            }
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