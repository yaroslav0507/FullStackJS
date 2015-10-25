(function () {
    'use strict';

    angular
        .module('app')
        .controller('SingleItemController', SingleItemController);

    function SingleItemController(item, CartService) {

        var vm = this;

        angular.extend(vm, {
            item: item,
            addToCart: addToCart,
            selectImage: selectImage,
            nextImage: nextImage,
            prevImage: prevImage
        });

        var img = $('.zoomable');

        var zoomConfig = {
            zoomType: "lens",
            lensShape: "round",
            lensSize: 200,
            zoomWindowFadeIn: 200,
            zoomWindowFadeOut: 200,
            lensFadeIn: 200,
            lensFadeOut: 200,
            scrollZoom : true
        }

        vm.item.qty = 1;

        function addToCart(){
            CartService.addToCart(item);
        }

        angular.element(document).ready(function () {
            //Create
            img.elevateZoom(zoomConfig);
        });

        function selectImage(index){
            vm.item.mainImageIndex = index;
            img.attr('data-zoom-image', './images/items/origin/' + vm.item.images[index]);

            //Remove
            $('.zoomContainer').remove();

            img.removeData('elevateZoom');
            img.removeData('zoomImage');
            //Re-create
            img.elevateZoom(zoomConfig);

        }

        var index = vm.item.mainImageIndex;
        function nextImage(){
            if(index < vm.item.images.length-1){
                index += 1;
                selectImage(index);
            } else {
                return;
            }
        }

        function prevImage(){
            if(index > 0){
                index -= 1;
                selectImage(index);
            } else {
                return;
            }
        }

    }
})();