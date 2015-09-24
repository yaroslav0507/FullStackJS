(function(){
    'use strict';

    angular
        .module('app')
        .controller('DialogController', DialogController);

    function DialogController($modal, $scope, ItemsService){

        var vm = this;

        angular.extend(vm, {
            open: open,
            animationsEnabled: true
        });

        function open(size){
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'shared/dialog/base-dialog.html',
                controller: 'DialogController',
                controllerAs: 'dialogCtrl',
                size: size
            });

            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

    }
})();