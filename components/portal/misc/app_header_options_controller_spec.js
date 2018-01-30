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
define(['angular-mocks', 'portal'], function() {
    describe('AppHeaderOptionsController', function() {
        var $scope;
        var $document;
        var mainService;
        var NAMES;

        var controller;

        beforeEach(function() {
          module('portal');
        });

        beforeEach(inject(function(
          _$rootScope_, $controller, _$document_,
          _mainService_, _NAMES_) {
          $scope = _$rootScope_.$new();
          $document = _$document_;
          mainService = _mainService_;
          NAMES = _NAMES_;

          NAMES.title = 'AppName';
          $scope.portal.theme.title = 'PortalName';

          controller = $controller('AppHeaderOptionsController', {
            '$rootScope': _$rootScope_,
            '$document': $document,
            'mainService': mainService,
            'NAMES': NAMES,
          });
        }));

        it('should expose an updateTitle function',
            function() {
               expect(controller.updateTitle).not.toBeNull();
        });

        it('should set document title reflecting page title',
            function() {
            controller.updateTitle('SpecificPageName');
            // this test is problematic in that it relies on too much
            // knowledge of what mainService will tell
            // AppHeaderOptionsController the window title ought to be. It
            // would be better if this tested
            // 1. that the controller called mainService with the correct
            // arguments, and
            // 2. that the controller set the window title to whatever
            // mainService told it the title ought to be.
            // that is, mock mainService both to monitor arguments
            // the controller calls it with and to fake its response to
            // see that the controller honors it
            expect($document[0].title)
              .toEqual('SpecificPageName | AppName | PortalName');
        });
    });
});
