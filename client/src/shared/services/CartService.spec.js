describe('service: CartService', function(){

    var sut,
        CartService,
        $httpBackend,
        $timeout,
        mockCart;

    beforeEach(module('app'));

    beforeEach(inject(function(_CartService_, _$httpBackend_, _$timeout_){
        sut = _CartService_;
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;


    }));
});