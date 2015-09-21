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
                        templateUrl: 'admin/admin-base.html'
                    },
                    'navigation@admin': {
                        templateUrl: 'admin/components/navigation.html'
                    },
                    'sidebar@admin': {
                        templateUrl: 'admin/components/sidebar.html',
                        controller: 'DashboardController',
                        controllerAs: 'dashboardCtrl'
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
                        controller: 'EditItemsController',
                        controllerAs: 'editCtrl',
                        resolve: {
                            item: resolveItem
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
                            user: resolveUserPayload
                        }
                    }
                }
            });


        function resolveItems(ItemsService){
            return ItemsService.getAll();
        }

        function resolveItem($stateParams, ItemsService){
            return ItemsService.getItem($stateParams.id);
        }

        function resolveUsers(UsersService){
            return UsersService.getUsers();
        }

        function resolveUserPayload(UsersService){
            return UsersService.getUserPayload();
        }

        function resolveUserData(UsersService){
            return UsersService.getUserData();
        }
    }
})();