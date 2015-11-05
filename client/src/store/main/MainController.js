(function(){
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController(items, $scope, ItemsLocalService){

        var vm = this;

        angular.extend(vm, {
            items: items.map(ItemsLocalService.makeShortDescriptions.bind(null, 120)),
            predicate: 'price',
            reverse: true,
            order: order
        });

        function order(predicate){
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        }

        $scope.$on('$viewContentLoaded', function() {
            $('#myCarousel').carousel({
                interval: 4000
            });
        });
    }

})();
