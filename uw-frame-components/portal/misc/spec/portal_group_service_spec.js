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
    describe('portalGroupService', function() {
        var service;
        var httpBackend;
        var URLS = {};
        var loginSilentURL;

        beforeEach(function() {
          module('portal');
        });

        beforeEach(inject(function(
          _portalGroupService_, _$httpBackend_,
          SERVICE_LOC, MESSAGES, APP_FLAGS
        ) {
          service = _portalGroupService_;
          httpBackend = _$httpBackend_;
          URLS.group = SERVICE_LOC.groupURL;
          URLS.feature = SERVICE_LOC.messagesURL;
          loginSilentURL = APP_FLAGS.loginOnLoad;
          if (loginSilentURL) {
            httpBackend.whenGET(loginSilentURL)
            .respond({'status': 'success', 'username': 'admin'});
          }
        }));

        it('should properly handle filtering nothing', function() {
          // setup
          var array = [];
          var groups = [];
          // test
          var results = service.filterArrayByGroups(array, groups);

          expect(results).toBeTruthy();

          expect(results.length).toEqual(0);
        });

        it('should properly handle filtering with a string ' +
          'or an array with default attribute of group', function() {
          // setup
          var array = [
            {title: 'in crowd', group: 'in'},
            {title: 'out crowd', group: ['out']},
            {title: 'everyone', group: ['in', 'out']},
          ];
          var groups = [{name: 'in'}];
          // test
          var results = service.filterArrayByGroups(array, groups);

          expect(results).toBeTruthy();

          expect(results.length).toEqual(2);
        });

        it('should properly handle filtering ' +
          'with an alternate group field name', function() {
          // setup
          var array = [
            {title: 'in crowd', group: 'in'},
            {title: 'out crowd', group: ['out']},
            {title: 'everyone', group: ['in', 'out']},
          ];
          var groups = [{title: 'in'}];// uPortal inside joke
          // test
          var results =
            service.filterArrayByGroups(array, groups, null, 'title');

            expect(results).toBeTruthy();

            expect(results.length).toEqual(2);
        });

        it('should properly handle filtering ' +
          'with an alternate array field name', function() {
          // setup
          var array = [
            {title: 'in crowd', theGroup: 'in'},
            {title: 'out crowd', theGroup: ['out']},
            {title: 'everyone', theGroup: ['in', 'out']},
          ];
          var groups = [{name: 'in'}];
          // test
          var results = service.filterArrayByGroups(array, groups, 'theGroup');

          expect(results).toBeTruthy();

          expect(results.length).toEqual(2);
        });
    });
});
