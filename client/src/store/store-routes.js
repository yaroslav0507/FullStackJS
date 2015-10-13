(function(){
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('store', {
                url: '',
                abstract: true,
                views:{
                    '':{
                        templateUrl: 'store/store-base.html'
                    },
                    'navigation@store': {
                        templateUrl: 'store/components/header/header.html',
                        controller: 'HeaderController',
                        controllerAs: 'headerCtrl'
                    },
                    'footer@store': {
                        templateUrl: 'store/components/footer.html'
                    }
                }
            })
            .state('store.main', {
                url: '/',
                views: {
                    'content@store': {
                        templateUrl: 'store/main/main.html',
                        controller: 'MainController',
                        controllerAs: 'mainCtrl',
                        resolve: {
                            items: resolveItems,
                            cart: resolveCart
                        }
                    }
                }
            })
            .state('store.item', {
                url: '/items/{id}',
                views: {
                    'content@store': {
                        templateUrl: 'store/single-item/single-item.html',
                        controller: 'SingleItemController',
                        controllerAs: 'singleItemCtrl',
                        resolve: {
                            item: resolveItem
                        }
                    }
                }
            });

        $urlRouterProvider.otherwise('/');

        function resolveItems(ItemsService){
            return ItemsService.getAll();
        }

        function resolveItem($stateParams, ItemsService){
            return ItemsService.getItem($stateParams.id);
        }

        function resolveCart(CartService){
            return CartService.getCart();
        }
    }
})();