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

        beforeEach(function() {
          module('portal');
        });

        beforeEach(inject(function(
          _mainService_, _$httpBackend_,
          SERVICE_LOC, MESSAGES, APP_FLAGS
        ) {
          service = _mainService_;
          httpBackend = _$httpBackend_;
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
          var pageTitle = 'Timesheets';
          var appTitle = 'STAR Time Entry';
          var portalTitle = 'MyUW';

          // test
          var windowTitle =
            service.computeWindowTitle(pageTitle, appTitle, portalTitle);

          expect(windowTitle)
            .toEqual('Timesheets | STAR Time Entry | MyUW');

          httpBackend.flush();
        });

        it('should set title to omit app name when redundant with portal name',
          function() {
          // setup
          var pageTitle = 'Notifications';
          var appTitle = 'MyUW';
          var portalTitle = 'MyUW';

          // test
          var windowTitle =
            service.computeWindowTitle(pageTitle, appTitle, portalTitle);

          expect(windowTitle).toEqual('Notifications | MyUW');

          httpBackend.flush();
        });

        it('should set title to omit app name when null', function() {
          // setup
          var pageTitle = 'Notifications';
          var appTitle = null;
          var portalTitle = 'MyUW';

          // test
          var windowTitle =
            service.computeWindowTitle(pageTitle, appTitle, portalTitle);

          expect(windowTitle).toEqual('Notifications | MyUW');

          httpBackend.flush();
        });

        it('should set title to omit app name when it is empty', function() {
          // setup
          var pageTitle = 'Notifications';
          var appTitle = '';
          var portalTitle = 'MyUW';

          // test
          var windowTitle =
            service.computeWindowTitle(pageTitle, appTitle, portalTitle);

          expect(windowTitle).toEqual('Notifications | MyUW');

          httpBackend.flush();
        });

        it('should set title to omit page name when it is null',
          function() {
          // setup
          var appTitle = 'STAR Time Entry';
          var portalTitle = 'MyUW';

          // test
          var windowTitle =
            service.computeWindowTitle(null, appTitle, portalTitle);

          expect(windowTitle).toEqual('STAR Time Entry | MyUW');

          httpBackend.flush();
        });

        it('should set title to omit page name when it is empty string',
          function() {
          // setup
          var pageTitle = '';
          var appTitle = 'STAR Time Entry';
          var portalTitle = 'MyUW';

          // test
          var windowTitle =
            service.computeWindowTitle(pageTitle, appTitle, portalTitle);

          expect(windowTitle).toEqual('STAR Time Entry | MyUW');

          httpBackend.flush();
        });

        it('should set title to only the portal name when the app name is '
          + 'redundant and the page name is not provided.', function() {
          // setup
          var pageTitle = '';
          var appTitle = 'MyUW';
          var portalTitle = 'MyUW';

          // test
          var windowTitle =
            service.computeWindowTitle(pageTitle, appTitle, portalTitle);

          expect(windowTitle).toEqual('MyUW');

          httpBackend.flush();
        });

        it('should set title to only the portal name when redundant with both '
          + 'the app name and the page name.', function() {
          // setup
          var pageTitle = 'MyUW';
          var appTitle = 'MyUW';
          var portalTitle = 'MyUW';

          // test
          var windowTitle =
            service.computeWindowTitle(pageTitle, appTitle, portalTitle);

          expect(windowTitle).toEqual('MyUW');

          httpBackend.flush();
        });

        it('should set title to only the app name when portal name and page '
          + 'name are null', function() {
          // setup
          var pageTitle = null;
          var appTitle = 'STAR Time and Leave';
          var portalTitle = null;

          // test
          var windowTitle =
            service.computeWindowTitle(pageTitle, appTitle, portalTitle);

          expect(windowTitle).toEqual('STAR Time and Leave');

          httpBackend.flush();
        });

        it('should set title to only the page name when portal name and app '
          + 'name are null', function() {
          // setup
          var pageTitle = 'SomePage';
          var appTitle = null;
          var portalTitle = null;

          // test
          var windowTitle =
            service.computeWindowTitle(pageTitle, appTitle, portalTitle);

          expect(windowTitle).toEqual('SomePage');

          httpBackend.flush();
        });

        it('should gracefully handle missing theme.', function() {
          // setup
          var pageTitle = 'SomePage';
          var appTitle = 'SomeApp';
          var portalTitle = null;

          // test
          var windowTitle =
            service.computeWindowTitle(pageTitle, appTitle, portalTitle);

          expect(windowTitle).toEqual('SomePage | SomeApp');

          httpBackend.flush();
        });
    });
});
