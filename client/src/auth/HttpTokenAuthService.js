(function(){
    'use strict';

    angular
        .module('app')
        .factory('HttpTokenAuthService', HttpTokenAuthService);

    function HttpTokenAuthService($window){

        var auth = {
            saveToken: saveToken,
            getToken: getToken,
            deleteToken: deleteToken
        };

        return auth;

        function saveToken(token){
            $window.localStorage.setItem('node-js-store-auth-token', token);
        }

        function getToken(){
            return $window.localStorage.getItem('node-js-store-auth-token');
        }

        function deleteToken(){
            $window.localStorage.removeItem('node-js-store-auth-token');
        }

    }
})();