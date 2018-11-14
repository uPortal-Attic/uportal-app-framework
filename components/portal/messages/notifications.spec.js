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
/* eslint promise/always-return: 'off', promise/catch-or-return: 'off'*/
define(['angular-mocks', 'portal'], function() {
  describe('MessagesService', function() {
    var messagesService;
    var httpBackend;
    var messagesUrl;
    var loginSilentUrl;
    var testingDataUrl = 'urlForTesting';

    beforeEach(function() {
      module('portal');
    });
    it('message should have title from data if specified', function() {
        var title = 'Use this as a title';
        httpBackend.whenGET(messagesUrl).respond(
          {'messages':
            [
              {
                'id': 1,
                'title': 'message 1',
                'audienceFilter': {
                  'groups': [
                    'Everyone',
                  ],
                },
              },
              {
                'id': 2,
                'title': 'message 2',
                'audienceFilter': {
                  'groups': [
                    'Everyone',
                  ],
                },
                'data': {
                  'dataUrl': testingDataUrl,
                  'dataObject': 'id',
                  'dataMessageTitle': [
                    'title',
                    'Supplied Title',
                  ],
                },
              },
            ],
          }
        );
        httpBackend.whenGET(testingDataUrl).respond(200,
          {
            'name': 'foo',
            'id': 'bar',
            'favorite food': 'baz',
            'title': {
              'Supplied Title': title,
            },
          }
        );
        messagesService.getAllMessages().then(function(allMessages) {
          expect(allMessages).toBeTruthy();
          expect(allMessages.length).toEqual(2);
          return messagesService.getMessagesByData(allMessages);
        }).then(function(dataMessages) {
          expect(dataMessages).toBeTruthy();
          expect(dataMessages.length).toEqual(2);
          expect(dataMessages[1].title).toEqual(title);
        });
        httpBackend.flush();
      });
  