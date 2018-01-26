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
    describe('mainService', function() {
        var service;

        var loginSilentUrl;
        var httpBackend;

        var $document;
        var $scope;
        var NAMES;

        beforeEach(function() {
          module('portal');
        });

        beforeEach(inject(function(
          _mainService_, _$httpBackend_,
          _$document_, _$rootScope_,
          SERVICE_LOC, MESSAGES, APP_FLAGS, _NAMES_
        ) {
          $scope = _$rootScope_.$new();
          service = _mainService_;
          $document = _$document_;
          httpBackend = _$httpBackend_;
          NAMES = _NAMES_;
          loginSilentUrl = APP_FLAGS.loginOnLoad;

          if (loginSilentUrl) {
            httpBackend.whenGET(loginSilentUrl)
            .respond({'status': 'success', 'username': 'admin'});
          }

          httpBackend.whenGET(SERVICE_LOC.sessionInfo).respond();
        }));

        it('should set title to include page, app, and portal name when '
           + 'all of these are present and non-redundant.', function() {
          // setup
          NAMES.title = 'STAR Time Entry';
          $scope.portal.theme.title = 'MyUW';

          // test
          service.setTitle('Timesheets');

          expect($document[0].title)
            .toEqual('Timesheets | STAR Time Entry | MyUW');

          httpBackend.flush();
        });

        it('should set title to omit app name when redundant with portal name',
          function() {
          // setup
          NAMES.title = 'MyUW';
          $scope.portal.theme.title = 'MyUW';

          // test
          service.setTitle('Notifications');

          expect($document[0].title).toEqual('Notifications | MyUW');

          httpBackend.flush();
        });

        it('should set title to omit app name when null', function() {
          // setup
          NAMES.title = null;
          $scope.portal.theme.title = 'MyUW';

          // test
          service.setTitle('Notifications');

          expect($document[0].title).toEqual('Notifications | MyUW');

          httpBackend.flush();
        });

        it('should set title to omit app name when it is empty', function() {
          // setup
          NAMES.title = '';
          $scope.portal.theme.title = 'MyUW';

          // test
          service.setTitle('Notifications');

          expect($document[0].title).toEqual('Notifications | MyUW');

          httpBackend.flush();
        });

        it('should set title to omit page name when it is not provided',
          function() {
          // setup
          NAMES.title = 'STAR Time Entry';
          $scope.portal.theme.title = 'MyUW';

          // test
          service.setTitle();

          expect($document[0].title).toEqual('STAR Time Entry | MyUW');

          httpBackend.flush();
        });

        it('should set title to only the portal name when the app name is '
          + 'redundant and the page name is not provided.', function() {
          // setup
          NAMES.title = 'MyUW';
          $scope.portal.theme.title = 'MyUW';

          // test
          service.setTitle();

          expect($document[0].title).toEqual('MyUW');

          httpBackend.flush();
        });
    });
});
