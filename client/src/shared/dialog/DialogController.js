(function(){
    'use strict';

    angular
        .module('app')
        .controller('ModalDemoCtrl', DialogController);

    function DialogController($uibModal, $log){

        var vm = this;

        angular.extend(vm, {
            items: ['item1', 'item2', 'item3'],
            open: open,
            animationsEnabled: true
        });

        function open(size){

            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return vm.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        vm.toggleAnimation = function () {
            vm.animationsEnabled = !vm.animationsEnabled;
        };
    }

})();