(function(){
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($stateProvider){
        $stateProvider
            .state('auth', {
                url: '/auth',
                abstract: true,
                templateUrl: 'auth/auth-base.html',
                controller: 'AuthController',
                controllerAs: 'authCtrl'
            })
            .state('auth.login', {
                url: '/login',
                views: {
                    'auth':{
                        templateUrl: 'auth/templates/login.html'
                    }
                }
            })
            .state('auth.register', {
                url: '/register',
                views: {
                    'auth':{
                        templateUrl: 'auth/templates/register.html'
                    }
                }
            });

    }
})();