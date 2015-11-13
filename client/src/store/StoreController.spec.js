describe('StoreController', function () {

    var sut,
        cart,
        categories,
        CartService,
        cartDeferred,
        $controller,
        $timeout,
        $state,
        $q;

    beforeEach(function () {
        CartService = {
            addToCart: env.stub(),
            getCart: env.stub()
        };

        module('app');

        cart = {};
        categories = {};

        $state = {
            go: env.stub()
        };

        inject(function (_$controller_, _$q_, _$timeout_) {
            $q = _$q_;
            $controller = _$controller_;
            $timeout = _$timeout_;
        });
    });

    describe('performed add to cart action', function(){
        describe('@addToCart', function () {
            var item;

            beforeEach(function () {
                item = {};
                cart = {};
                cartDeferred = $q.defer();
                CartService.addToCart.returns(cartDeferred.promise);
                initController();
            });

            it('should call CartService.addToCart with item', function () {
                sut.addToCart(item);
                CartService.addToCart.should.have.been.calledWith(item);
            });

            it('should change local cart model', function () {
                sut.addToCart(item);
                cartDeferred.reject(cart);
                $timeout.flush();
                sut.cart.should.equal(cart);
            });
        });
    });

    function initController() {
        sut = $controller('StoreController', {
            cart: cart,
            categories: categories,
            CartService: CartService,
            $state: $state
        });
    }


});