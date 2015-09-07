(function(){
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: '/templates/main.html',
                controller: 'MainController',
                controllerAs: "MainCtrl"
            })
            .state('login', {
                url: "/login",
                templateUrl: '/templates/login.html',
                controller: 'AuthController',
                controllerAs: "AuthCtrl"
            });

        $urlRouterProvider.otherwise('main');
    }
})();