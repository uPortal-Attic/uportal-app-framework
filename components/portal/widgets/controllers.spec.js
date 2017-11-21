/*
 * Licensed to Apereo under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Apereo licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License.  You may obtain a
 * copy of the License at the following location:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
'use strict';
/* eslint-env node */
/* global inject */
/* eslint promise/always-return: "off", promise/catch-or-return: "off"*/
define(['angular-mocks', 'portal'], function() {
  describe('WidgetController', function() {
    var scope;
    var mockWidgetService;

    beforeEach(function() {
      module('portal');
    });

    beforeEach(inject(function(
      $controller, _widgetService_, $log, $q, $rootScope) {
      scope = $rootScope.$new();
      scope.widget = {};
    }));

    describe('WidgetExternalMessageService', function() {
      beforeEach(inject(function(
        $controller, _widgetService_, $log, $q, $rootScope) {
        mockWidgetService= jasmine.createSpyObj(
          'mockWidgetService', ['getWidgetExternalMessage']);
      }));

      it('should handle happy case',
        inject(function($controller, $log, $q, $rootScope) {
        mockWidgetService.getWidgetExternalMessage.and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve({
            'messageText': 'foo',
            'learnMoreUrl': 'bar',
          });
          return deferred.promise;
        });
        $controller('WidgetExternalMessageController', {
          $scope: scope,
          $log: $log,
          widgetService: mockWidgetService,
        });
        scope.$digest();

        expect(scope.widget.externalMessageText).toEqual('foo');
        expect(scope.widget.externalMessageLearnMoreUrl).toEqual('bar');
      }));

      it('should handle null',
        inject(function($controller, $log, $q, $rootScope) {
        mockWidgetService.getWidgetExternalMessage.and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve(null);
          return deferred.promise;
        });
        $controller('WidgetExternalMessageController', {
          $scope: scope,
          $log: $log,
          widgetService: mockWidgetService,
        });
        scope.$digest();

        expect(scope.widget.externalMessageText).toBeUndefined();
        expect(scope.widget.externalMessageLearnMoreUrl).toBeUndefined();
      }));

      it('should handle message text but no learn more url',
          inject(function($controller, $log, $q, $rootScope) {
          mockWidgetService.getWidgetExternalMessage.and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve({
              'messageText': 'foo',
            });
            return deferred.promise;
          });
          $controller('WidgetExternalMessageController', {
            $scope: scope,
            $log: $log,
            widgetService: mockWidgetService,
          });
          scope.$digest();

          expect(scope.widget.externalMessageText).toEqual('foo');
          expect(scope.widget.externalMessageLearnMoreUrl).toBeUndefined();
      }));

      it('should handle learn more url but no message text',
        inject(function($controller, $log, $q, $rootScope) {
        mockWidgetService.getWidgetExternalMessage.and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve({
            'learnMoreUrl': 'bar',
          });
          return deferred.promise;
        });
        $controller('WidgetExternalMessageController', {
          $scope: scope,
          $log: $log,
          widgetService: mockWidgetService,
        });
        scope.$digest();

        expect(scope.widget.externalMessageText).toBeUndefined();
        expect(scope.widget.externalMessageLearnMoreUrl).toBeUndefined();
      }));

      it('should handle errors from service',
          inject(function($controller, $log, $q, $rootScope) {
          mockWidgetService.getWidgetExternalMessage.and.callFake(function() {
            var deferred = $q.defer();
            deferred.reject('Some error being simulated');
            return deferred.promise;
          });
          $controller('WidgetExternalMessageController', {
            $scope: scope,
            $log: $log,
            widgetService: mockWidgetService,
          });
          scope.$digest();

          expect(scope.widget.externalMessageText).toBeUndefined();
          expect(scope.widget.externalMessageLearnMoreUrl).toBeUndefined();
        }));
    });
  });
});
