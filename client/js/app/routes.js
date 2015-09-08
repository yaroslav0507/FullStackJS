(function(){
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('main', {
                url: '/main',
                controller: 'MainController',
                controllerAs: "mainCtrl",
                views: {
                    '':{
                      templateUrl: 'store/main/main.html'
                    },
                    'header@main': {
                        templateUrl: 'store/components/header.html'
                    },
                    'footer@main':{
                        templateUrl: 'store/components/footer.html'
                    }
                }
            })
            .state('auth', {
                url: "/auth",
                abstract: true,
                templateUrl: 'auth/auth-base.html',
                controller: 'AuthController',
                controllerAs: "authCtrl"
            })
            .state('auth.login', {
                url: '/login',
                views: {
                    'auth':{
                        templateUrl: 'auth/login/login.html'
                    }
                }
            });

        $urlRouterProvider.otherwise('main');
    }
})();