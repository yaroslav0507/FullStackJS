(function(){
    'use strict';

    angular
        .module('app')
        .directive('promoBanner', promoBanner);

    function promoBanner(){
        return {
            restrict: 'EA',
            controller: promoBannerController,
            controllerAs: 'bannerCtrl',
            templateUrl: 'shared/directives/promo-banner/promo-banner.html'
        };
    }

    function promoBannerController(){

    }

})();