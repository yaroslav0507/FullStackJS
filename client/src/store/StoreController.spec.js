'use strict';

describe('StoreController', function(){

   var sut,
       cart,
       categories,
       CartService,
       $state;

   beforeEach(function(){
      module('app');

      $state = {
          go: env.stub()
      };

      CartService = {
          addToCart : env.stub()
      };

      cart = {}
   });

   beforeEach(inject(function(_$controller_,
                              _cart_,
                              _categories_,
                              _CartService_,
                              _$state_){

       cart = _cart_;
       categories = _categories_;
       CartService = _CartService_;
       $state = _$state_;

       sut = _$controller_('StoreController', {
           cart: cart,
           categories: categories,
           CartService: CartService,
           $state: $state
       })
   }));

   describe('@addToCart', function(){
        beforeEach(function(){
            var item = {};
        });

        it('should call CartService.addToCart with item', function(){
            CartService.addToCart.should.have.been.calledWith(item);
        });
   });

});