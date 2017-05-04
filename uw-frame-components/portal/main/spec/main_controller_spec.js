'use strict';
/* eslint-env node */
/* global inject */
define(['angular-mocks', 'portal'], function() {
    describe('PortalMainController', function() {
        var scope;
        var $localStorage;
        // eslint-disable-next-line no-unused-vars
        var controller;

        beforeEach(function() {
          module('portal');
        });

        beforeEach(inject(function($rootScope, $controller, _$localStorage_) {
          scope = $rootScope.$new();
          $localStorage = _$localStorage_;
          controller = $controller('PortalMainController', {
            '$localStorage': $localStorage,
            '$scope': scope,
          });
        }));

        it('should set storage in scope', function() {
            expect(scope.$storage).not.toBeNull();
        });

        it('should have an app name defined', function() {
            expect(scope.NAMES.title).not.toBeNull();
        });
    });
});
