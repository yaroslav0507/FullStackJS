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
                views:{
                    '':{
                        templateUrl: 'dashboard/admin/admin-base.html',
                        controller: 'DashboardController',
                        controllerAs: 'dashboardCtrl'
                    },
                    'navigation@admin': {
                        templateUrl: 'dashboard/admin/components/admin-navigation.html'
                    },
                    'sidebar@admin': {
                        templateUrl: 'dashboard/admin/components/admin-sidebar.html'
                    }
                },
                resolve: {
                    checkAdminAccessRights: checkAdminAccessRights
                }
            })
            .state('admin.main', {
                url: '/main',
                views: {
                    'content@admin': {
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
            .state('admin.item', {
                url: '/items/{id}',
                views: {
                    'content@admin': {
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
            .state('admin.users', {
                url: '/users',
                views: {
                    'content@admin': {
                        templateUrl: 'dashboard/admin/templates/user-management/edit-users/users.html',
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
                        templateUrl: 'dashboard/admin/templates/user-management/edit-profile/profile.html',
                        controller: 'ProfileController',
                        controllerAs: 'profileCtrl',
                        resolve: {
                            user: resolveUserData
                        }
                    }
                }
            })
            .state('admin.contactInfo', {
                url: '/contacts',
                views: {
                    'content@user': {
                        templateUrl: 'dashboard/admin/templates/user-management/edit-contact-info/edit-contact-info.html',
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
                        templateUrl: 'dashboard/admin/templates/categories/edit-category.html',
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

        function checkAdminAccessRights($q, UsersService){
            var payload = UsersService.getUserPayload();

            return payload.accessLevel === 2 ? $q.resolve() : $q.reject() ;
        }
    }
})();