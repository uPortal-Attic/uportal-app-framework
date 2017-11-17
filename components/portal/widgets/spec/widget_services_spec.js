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
    var widget = {
      'fname': 'widget',
      'widgetExternalMessageUrl': externalMessageUrl,
      'widgetExtneralMessageTextObjectLocation':
        extneralMessageTextObjectLocation,
      'widgetExternalMessageLearnMoreUrl':
        externalLearnMoreUrlLocation,
    };
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
       httpBackend.whenGET(externalMessageUrl).respond(
           externalMessageResponseObjectSuccess);
       widgetService.getWidgetExternalMessage(widget).then(function(result) {
         expect(result.messageText).toEqual(externalMessageText);
         expect(result.learnMoreUrl).toEqual(externalLearnMoreUrl);
       });
       httpBackend.flush();
     });
   });
  });
});
