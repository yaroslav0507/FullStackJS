(function(){
    'use strict';

    angular
        .module('app')
        .directive('changeQuantity', changeQuantity);

    function changeQuantity(){
        return {
            restrict: 'EA',
            scope: {
                value: "="
            },
            controller: changeQuantityController,
            controllerAs: 'qtyCtrl',
            templateUrl: 'shared/directives/changeQuantity/quantity-directive.html',
            link: function(scope, CartService){

            }
        }

    }

    function changeQuantityController($scope){
        var vm = this;

        angular.extend(vm, {
            increase: increase,
            decrease: decrease
        });

        function increase(){
            $scope.value += 1;
        }

        function decrease(){
            $scope.value -= 1;
        }
    }


})();