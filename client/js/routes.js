(function(){
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/templates/main.html'
            })
            .state('login', {
                url: "/login",
                templateUrl: '/templates/login.html',
                controller: 'authController',
                controllerAs: "authCtrl"
            });

        $urlRouterProvider.otherwise('login');
    }
})();