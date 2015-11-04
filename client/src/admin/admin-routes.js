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
                        $state.go('store.main');
                    }
                }],
                views:{
                    '':{
                        templateUrl: 'admin/admin-base.html',
                        controller: 'DashboardController',
                        controllerAs: 'dashboardCtrl',
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
                        templateUrl: 'admin/templates/manage-items/items.html',
                        controller: 'ItemsController',
                        controllerAs: 'itemsCtrl',
                        resolve: {
                            items: resolveItems,
                            categories: resolveCategories
                        }
                    }
                }
            })
            .state('admin.item', {
                url: '/items/{id}',
                views: {
                    'content@admin': {
                        templateUrl: 'admin/templates/manage-items/edit-item/edit-item.html',
                        controller: 'EditItemsController',
                        controllerAs: 'editCtrl',
                        resolve: {
                            item: resolveItem,
                            categories: resolveCategories
                        }
                    }
                }
            })
            .state('admin.users', {
                url: '/users',
                views: {
                    'content@admin': {
                        templateUrl: 'admin/templates/user-management/edit-users/users.html',
                        controller: 'UsersController',
                        controllerAs: 'usersCtrl',
                        resolve: {
                            users: resolveUsers
                        }
                    }
                }
            })
            .state('admin.profile', {
                url: '/profile',
                views: {
                    'content@admin': {
                        templateUrl: 'admin/templates/user-management/edit-profile/profile.html',
                        controller: 'ProfileController',
                        controllerAs: 'profileCtrl',
                        resolve: {
                            user: resolveUserData
                        }
                    }
                }
            })
            .state('admin.categories', {
                url: '/categories',
                views: {
                    'content@admin': {
                        templateUrl: 'admin/templates/categories/edit-category.html',
                        controller: 'EditCategoriesController',
                        controllerAs: 'categoriesCtrl',
                        resolve: {
                            categories: resolveCategories
                        }
                    }
                }
            })
            .state('admin.orders', {
                url: '/orders',
                views: {
                    'content@admin': {
                        templateUrl: 'admin/templates/orders/orders.html',
                        controller: 'OrdersController',
                        controllerAs: 'ordersCtrl',
                        resolve: {
                            orders: resolveOrders
                        }
                    }
                }
            });


        function resolveItems(ItemsService){
            return ItemsService.getAll();
        }

        function resolveCategories(CategoriesService){
            return CategoriesService.getAll();
        }

        function resolveItem($stateParams, ItemsService){
            return ItemsService.getItem($stateParams.id);
        }

        function resolveUsers(UsersService){
            return UsersService.getUsers();
        }

        function resolveOrders(OrdersService){
            return OrdersService.getAll();
        }

        function resolveUserData(UsersService){
            var payload = UsersService.getUserPayload();

            return UsersService.getUserData(payload._id).then(function(response){
                return response.data;
            });
        }
    }
})();