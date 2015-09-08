(function(){
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('main', {
                url: '/main',
                views: {
                    '':{
                      templateUrl: 'store/main/main.html',
                      controller: 'MainController',
                      controllerAs: "mainCtrl"
                    },
                    'header@main': {
                        templateUrl: 'store/components/header/header.html',
                        controller: 'HeaderController',
                        controllerAs: 'headerCtrl'
                    },
                    'footer@main':{
                        templateUrl: 'store/components/footer.html'
                    }
                },
                resolve: {
                    items: resolveItems
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

        function resolveItems(ItemsService){
            return ItemsService.getAll();
        }
    }
})();