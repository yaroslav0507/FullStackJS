(function(){
    'use strict';

    angular
        .module('app')
        .config(['cfpLoadingBarProvider', cfpLoadingBarProvider]);

    function cfpLoadingBarProvider(cfpLoadingBarProvider){
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 50;
    }

})();