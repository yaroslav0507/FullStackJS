(function(){
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($stateProvider){
        $stateProvider
            .state('dashboard.user', {
                url: '/',
                abstract: true,
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

    }
})();