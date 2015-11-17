(function(){
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($stateProvider){
        $stateProvider
            .state('user', {
                url: '/user',
                abstract: true,
                views:{
                    '':{
                        templateUrl: 'dashboard/user/user-base.html',
                        controller: 'UserDashboardController',
                        controllerAs: 'userDashboardCtrl'
                    },
                    'navigation@user': {
                        templateUrl: 'dashboard/user/components/user-navigation.html'
                    },
                    'sidebar@user': {
                        templateUrl: 'dashboard/user/components/user-sidebar.html'
                    }
                },
                resolve: {
                    checkUserAccessRights: checkUserAccessRights
                }
            })
            .state('user.profile', {
                url: '/profile',
                views: {
                    'content@user': {
                        templateUrl: 'dashboard/admin/templates/user-management/edit-profile/profile.html',
                        controller: 'ProfileController',
                        controllerAs: 'profileCtrl',
                        resolve: {
                            user: resolveUserData
                        }
                    }
                }
            })
            .state('user.contactInfo', {
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
            .state('user.orders', {
                url: '/orders',
                views: {
                    'content@user': {
                        templateUrl: 'dashboard/user/templates/orders/user-orders.html',
                        controller: 'UserOrdersController',
                        controllerAs: 'userOrdersCtrl',
                        resolve: {
                            orders: resolveOrders
                        }
                    }
                }
            });

        function resolveOrders(OrdersService){
            return OrdersService.getUserOrders();
        }

        function checkUserAccessRights($q, UsersService){
            var payload = UsersService.getUserPayload();

            return payload.accessLevel === 0 ? $q.resolve() : $q.reject() ;
        }

        function resolveUserData(UsersService){
            var payload = UsersService.getUserPayload();

            return UsersService.getUserData(payload._id).then(function(response){
                return response.data;
            });
        }


    }

})();