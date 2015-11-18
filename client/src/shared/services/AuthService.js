(function(){
    'use strict';

    angular
        .module('app')
        .factory('AuthService', AuthService);

    function AuthService(HttpTokenAuthService, UsersService, CartService, $http, $window, $cookies){

        var auth = {
            isLoggedIn: isLoggedIn,
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
        
        function register(user){
            return $http.post('/register', user).success(function (data) {
                HttpTokenAuthService.saveToken(data.token);
            });
        }

        function logIn(user){
            return $http.post('/login', user).success(function(data){
                HttpTokenAuthService.saveToken(data.token);
                UsersService.getUserData().then(function(response){
                    var userID = response.data._id;
                    $cookies.put('user.id', userID);
                    CartService.getCart();
                });

            });
        }

        function logOut(){
            HttpTokenAuthService.deleteToken();
            $cookies.remove('user.id');
            CartService.getCart();
        }

    }
})();