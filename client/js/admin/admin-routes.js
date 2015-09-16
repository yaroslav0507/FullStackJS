(function(){
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($stateProvider){
        $stateProvider
            .state('admin', {
                url: '/admin',
                abstract: true,
                onEnter: ['$state', 'AuthService', function($state, AuthService){
                    if(!AuthService.isLoggedIn()){
                        $state.go('main');
                    }
                }],
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
            .state('admin.item', {
                url: '/items/{id}',
                views: {
                    'content@admin': {
                        templateUrl: 'admin/templates/edit-item/edit-item.html',
                        resolve: {
                            items: resolveItem
                        }
                    }
                }
            });


        function resolveItems(ItemsService){
            return ItemsService.getAll();
        }

        function resolveItem($stateParams, ItemsServicse){
            return ItemsService.getItem($stateParams.id);
        }
    }
})();