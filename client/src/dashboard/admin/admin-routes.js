(function(){
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($stateProvider){
        $stateProvider
            .state('dashboard.admin', {
                url: '/admin',
                abstract: true,
                resolve: {
                    isAdmin: resolveIsAdmin
                },
                views:{
                    '':{
                        templateUrl: 'dashboard/admin/admin-base.html',
                        controller: 'DashboardController',
                        controllerAs: 'dashboardCtrl'
                    },
                    'navigation@dashboard': {
                        templateUrl: 'dashboard/admin/components/navigation.html'
                    },
                    'sidebar@dashboard': {
                        templateUrl: 'dashboard/admin/components/sidebar.html'
                    }
                }
            })
            .state('dashboard.admin.main', {
                url: '/main',
                views: {
                    'content@dashboard': {
                        templateUrl: 'dashboard/admin/templates/manage-items/items.html',
                        controller: 'ItemsController',
                        controllerAs: 'itemsCtrl',
                        resolve: {
                            items: resolveItems,
                            categories: resolveCategories
                        }
                    }
                }
            })
            .state('dashboard.admin.item', {
                url: '/items/{id}',
                views: {
                    'content@dashboard': {
                        templateUrl: 'dashboard/admin/templates/manage-items/edit-item/edit-item.html',
                        controller: 'EditItemsController',
                        controllerAs: 'editCtrl',
                        resolve: {
                            item: resolveItem,
                            categories: resolveCategories
                        }
                    }
                }
            })
            .state('dashboard.admin.users', {
                url: '/users',
                views: {
                    'content@dashboard': {
                        templateUrl: 'dashboard/admin/templates/user-management/edit-users/users.html',
                        controller: 'UsersController',
                        controllerAs: 'usersCtrl',
                        resolve: {
                            users: resolveUsers
                        }
                    }
                }
            })
            .state('dashboard.admin.profile', {
                url: '/profile',
                views: {
                    'content@dashboard': {
                        templateUrl: 'dashboard/admin/templates/user-management/edit-profile/profile.html',
                        controller: 'ProfileController',
                        controllerAs: 'profileCtrl',
                        resolve: {
                            user: resolveUserData
                        }
                    }
                }
            })
            .state('dashboard.admin.categories', {
                url: '/categories',
                views: {
                    'content@dashboard': {
                        templateUrl: 'dashboard/admin/templates/categories/edit-category.html',
                        controller: 'EditCategoriesController',
                        controllerAs: 'categoriesCtrl',
                        resolve: {
                            categories: resolveCategories
                        }
                    }
                }
            })
            .state('dashboard.admin.orders', {
                url: '/orders',
                views: {
                    'content@dashboard': {
                        templateUrl: 'dashboard/admin/templates/orders/orders.html',
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

        function resolveIsAdmin($q, UsersService){
            var payload = UsersService.getUserPayload();
            return payload.accessLevel === 2 ? true : $q.reject();
        }

    }
})();