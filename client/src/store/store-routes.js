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
                        templateUrl: 'store/store-base.html',
                        controller: 'StoreController',
                        controllerAs: 'storeCtrl',
                        resolve: {
                            cart: resolveCart
                        }
                    },
                    'navigation@store': {
                        templateUrl: 'store/components/header/header.html',
                        controller: 'HeaderController',
                        controllerAs: 'headerCtrl'
                    },
                    'footer@store': {
                        templateUrl: 'store/components/footer/footer.html',
                        controller: 'FooterController',
                        controllerAs: 'footerCtrl'
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
                            items: resolveItems
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
            })
            .state('store.cart', {
                url: '/cart/',
                views: {
                    'content@store': {
                        templateUrl: 'store/cart/cart.html',
                        controller: 'CartController',
                        controllerAs: 'cartCtrl'
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