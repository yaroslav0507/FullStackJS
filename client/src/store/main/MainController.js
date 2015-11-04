(function(){
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController(items, $scope){

        var vm = this;

        angular.extend(vm, {
            items: items.map(makeShortDescriptions.bind(null, 120)),
            predicate: 'price',
            reverse: true,
            order: order
        });

        function makeShortDescriptions(length, item) {
            if (item.description.length > length) {
                item.shortDescription = item.description.substr(0, length) + '..';
            } else {
                item.shortDescription = item.description;
            }
            return item;
        }

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
