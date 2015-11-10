'use strict';

describe('service: ItemsLocalService', function(){
    var ItemsLocalService;

    beforeEach(function(){
        module('app');

        inject(function(_ItemsLocalService_){
            ItemsLocalService =  _ItemsLocalService_;
        })
    });

    context('Generate short descriptions', function(){
        var mockItem = {
            description: "Lorem Ipsum is simply dummy text of the printing " +
            "and typesetting industry. Lorem Ipsum has been the industry's standard " +
            "dummy text ever since the 1500s, when an unknown printer took a galley " +
            "of type and scrambled it to make a type specimen book. It has survived " +
            "not only five centuries, but also the leap into electronic typesetting"
        };

        it('should generate 100 chars length short description', function(){
            mockItem = ItemsLocalService.makeShortDescriptions(100, mockItem);
            assert.equal(mockItem.shortDescription.length, 100);
        });

        it('should add ".." if content length > 100', function(){
            mockItem = ItemsLocalService.makeShortDescriptions(100, mockItem);
            var dots = mockItem.shortDescription.slice(-2);
            assert.equal(dots, "..");
        });

        it('should return the same string if content length < 100', function(){
            /*Make description with 50 characters*/
            mockItem.description = mockItem.description.slice(0, 50);

            /*Generate short description with 100 characters*/
            mockItem = ItemsLocalService.makeShortDescriptions(100, mockItem);
            assert.equal(mockItem.description, mockItem.shortDescription);
        })
    })

});