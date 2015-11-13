(function(){
    //'use strict';

    angular
        .module('app')
        .directive('changeQuantity', changeQuantity);

    function changeQuantity(){
        return {
            restrict: 'EA',
            scope: {
                value: '=',
                change: '&'
            },
            controller: changeQuantityController,
            controllerAs: 'qtyCtrl',
            templateUrl: 'shared/directives/change-quantity/quantity-directive.html',
            link: function($scope){
                $scope.$watch('value', function(newValue, oldValue){
                    if(newValue !== oldValue){
                        if(typeof($scope.value) !== 'number'){
                            $scope.value = 1;
                        }

                        debounce(function(){
                            $scope.change();
                        }, 500);

                    }
                });
            }
        };
    }

    function debounce(func, delay){
        var timeout;
        clearTimeout(timeout);
        timeout = setTimeout(func(), delay);
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
            if($scope.value > 1){
                $scope.value -= 1;
            }
        }
    }


})();