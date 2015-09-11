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
                      controllerAs: "mainCtrl",
                        resolve: {
                            items: resolveItems
                        }
                    },
                    'header@main': {
                        templateUrl: 'store/components/header/header.html',
                        controller: 'HeaderController',
                        controllerAs: 'headerCtrl'
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
                controller: "AuthController",
                controllerAs: "authCtrl"
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
                    })
            .state('admin', {
                url: '/admin',
                abstract: true,
                views:{
                    '':{
                        templateUrl: 'admin/index.html'
                    },
                    'navigation@admin': {
                        templateUrl: 'admin/components/navigation.html'
                    },
                    'sidebar@admin': {
                        templateUrl: 'admin/components/sidebar.html'
                    }
                }
            })
                .state('admin.main', {
                    url: '/main',
                    views: {
                        'content@admin': {
                            templateUrl: 'admin/templates/items/items.html',
                            controller: 'ItemsController',
                            controllerAs: 'itemsCtrl',
                            resolve: {
                                items: resolveItems
                            }
                        }
                    }
                })
                .state('admin.items', {
                    url: '/items',
                    views: {
                        'content@admin': {
                            templateUrl: 'admin/templates/one-item/one-item.html'
                        }
                    }
                });

        $urlRouterProvider.otherwise('main');

        function resolveItems(ItemsService){
            return ItemsService.getAll();
        }
    }
})();