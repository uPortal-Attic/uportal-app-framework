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
  describe('WidgetService', function() {
    var widgetService;
    var httpBackend;
    var externalMessageUrl = 'externalMessageUrl';
    var extneralMessageTextObjectLocation = ['result', 0, 'shortMessage'];
    var externalLearnMoreUrlLocation = ['learnMoreUrl'];
    var externalLearnMoreUrl = 'https://apereo.org';

    var externalMessageText =
      'Your account will be deactivated soon after some time.';
    var externalMessageResponseObjectSuccess = {
      'mesg': 'Success',
      'result': [
        {
          'longMessage': externalMessageText,
          'shortMessage': externalMessageText,
        },
      ],
      'learnMoreUrl': externalLearnMoreUrl,
    };

    beforeEach(function() {
      module('portal');
    });

    beforeEach(inject(function(_widgetService_, _$httpBackend_) {
      widgetService = _widgetService_;
      httpBackend = _$httpBackend_;
    }));

   describe('WidgetExternalMessageService', function() {
     it('If configured properly, should return message and url', function() {
       var widget = {
         'fname': 'widget',
         'widgetExternalMessageUrl': externalMessageUrl,
         'widgetExtneralMessageTextObjectLocation':
           extneralMessageTextObjectLocation,
         'widgetExternalMessageLearnMoreUrl':
           externalLearnMoreUrlLocation,
       };

       httpBackend.whenGET(externalMessageUrl).respond(
           externalMessageResponseObjectSuccess);

       widgetService.getWidgetExternalMessage(widget).then(function(result) {
         expect(result.messageText).toEqual(externalMessageText);
         expect(result.learnMoreUrl).toEqual(externalLearnMoreUrl);
       });
       httpBackend.flush();
     });

     it('If extneralMessageTextObjectLocation points to a non-existent '+
         'location, shoud return an empty object', function() {
       var widget = {
         'fname': 'widget',
         'widgetExternalMessageUrl': externalMessageUrl,
         'widgetExtneralMessageTextObjectLocation':
           ['foo'],
         'widgetExternalMessageLearnMoreUrl':
           externalLearnMoreUrlLocation,
       };

       httpBackend.whenGET(externalMessageUrl).respond(
           externalMessageResponseObjectSuccess);

       widgetService.getWidgetExternalMessage(widget).then(function(result) {
         expect(result.messageText).toBeUndefined();
         expect(result.learnMoreUrl).toEqual(externalLearnMoreUrl);
       });
       httpBackend.flush();
     });

     it('If external message text object is not present, '+
       'text should be undefined', function() {
       var widget = {
         'fname': 'widget',
         'widgetExternalMessageUrl': externalMessageUrl,
         'widgetExtneralMessageTextObjectLocation':
           extneralMessageTextObjectLocation,
         'widgetExternalMessageLearnMoreUrl':
           externalLearnMoreUrlLocation,
       };

       httpBackend.whenGET(externalMessageUrl).respond(
         {
           'mesg': 'Success',
           'result': [
             {
               'longMessage': externalMessageText,
             },
           ],
           'learnMoreUrl': externalLearnMoreUrl,
         });

       widgetService.getWidgetExternalMessage(widget).then(function(result) {
         expect(result.messageText).toBeUndefined();
         expect(result.learnMoreUrl).toEqual(externalLearnMoreUrl);
       });
       httpBackend.flush();
     });

     it('If learn more url is present, '+
         'learn more url should be undefined', function() {
         var widget = {
           'fname': 'widget',
           'widgetExternalMessageUrl': externalMessageUrl,
           'widgetExtneralMessageTextObjectLocation':
             extneralMessageTextObjectLocation,
           'widgetExternalMessageLearnMoreUrl':
             externalLearnMoreUrlLocation,
         };

         httpBackend.whenGET(externalMessageUrl).respond(
           {
             'mesg': 'Success',
             'result': [
               {
                 'longMessage': externalMessageText,
               },
             ],
             'learnMoreUrl': externalLearnMoreUrl,
           });

         widgetService.getWidgetExternalMessage(widget).then(function(result) {
           expect(result.messageText).toBeUndefined();
           expect(result.learnMoreUrl).toEqual(externalLearnMoreUrl);
         });
         httpBackend.flush();
       });
   });
  });
});
