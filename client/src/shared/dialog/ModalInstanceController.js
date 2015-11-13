(function(){
    'use strict';

    angular
        .module('app')
        .controller('ModalInstanceCtrl', ModalInstanceCtrl);

    function ModalInstanceCtrl($uibModalInstance, items){

        var vm = this;

        angular.extend(vm, {
            items: items,
            selected: {
                item: this.items[0]
            },
            ok: ok,
            cancel: cancel
        });
        console.log(vm.items);

        function ok(){
            $uibModalInstance.close(vm.selected.item);
        }

        function cancel (){
            $uibModalInstance.dismiss('cancel');
        }
    }

})();