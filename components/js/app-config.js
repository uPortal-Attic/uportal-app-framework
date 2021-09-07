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
define(['angular'], function(angular) {
  /* Keep in sync with docs/markdown/configuration.md*/
  return angular.module('app-config', [])
        .value('APP_FLAGS', {
            'showSearch': true,
            'isWeb': false,
            'defaultTheme': 0,
            'showUserSettingsPage': false,
            'showFeedbackComponent': false,
            'debug': false,
            'campusIdAttribute': null,
        })
        .value('APP_OPTIONS', {
            'appMenuTemplateURL': null,
            'appMenuItems': [],
            'enablePushContentMenu': false,
        })
        .value('SERVICE_LOC', {
            'aboutURL': null,
            'aboutPageURL': null,
            'groupURL': '/portal/api/groups',
            'kvURL': '/storage',
            'loginSilentURL': '/portal/Login', // deprecated
            'messagesURL': '', // staticFeeds/sample-messages.json
            'sessionInfo': 'staticFeeds/session.json',
            'portalLayoutRestEndpoint': null, // '/portal/api/layout',
            'widgetApi': {
              'entry': '/portal/api/marketplace/entry/', // 'staticFeeds/'
              'entrySuffix': '.json',
              'entries': '/portal/api/marketplace/entries.json',
            },
        })
        .value('NAMES', {
          // you can name your app whatever you want
            'title': 'Frame app',
            'guestUserName': 'guest',
            'fname': 'sample-fname',
        })
        .value('SEARCH', {
            'searchURL': '/web/apps/search/',
        })
        .value('MESSAGES', {
            'notificationsPageURL': '/web/notifications',
        })
        .value('MISC_URLS', {
            'feedbackURL': 'https://my.wisc.edu/portal/p/feedback',
            'helpdeskURL': 'https://kb.wisc.edu/helpdesk/',
            'loginURL': '/portal/Login',
            'logoutURL': '/portal/Logout',
            'myuwHome': 'https://my.wisc.edu',
            'resetLayoutURL': '/portal/p/reset-my-layout',
            'rootURL': '/web',
            'addToHomeURLS': {
              'layoutURL': '/portal/web/layoutDoc?tab=UW Bucky Home',
              'addToHomeActionURL':
                '/portal/web/layout?tabName=UW Bucky Home' +
                '&action=addPortlet&fname=',
            },
        })
        .value('FOOTER_URLS', [])
        .value('APP_BETA_FEATURES', [
          {
            'id': 'toggleSomething',
            'title': 'Sample Toggle',
            'description':
              'This is just an example of a toggle. ' +
              'Look at your localStorage after you ' +
              'switch this on for the first time.',
          },
        ]);
});
