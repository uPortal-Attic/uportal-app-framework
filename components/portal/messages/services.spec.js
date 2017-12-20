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

    beforeEach(inject(function(_messagesService_, _$httpBackend_, SERVICE_LOC) {
      messagesService = _messagesService_;
      httpBackend = _$httpBackend_;
      SERVICE_LOC.messagesURL = 'messages';
      messagesUrl = SERVICE_LOC.messagesURL;
      loginSilentUrl = SERVICE_LOC.loginSilentURL;
      if (loginSilentUrl) {
        httpBackend.whenGET(loginSilentUrl).respond({'status': 'success',
          'username': 'admin'});
        }
    }));

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

    it('message should not have title from data if specified'+
      'but url is not used', function() {
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
      messagesService.getAllMessages().then(function(allMessages) {
        expect(allMessages).toBeTruthy();
        expect(allMessages.length).toEqual(2);
        return messagesService.getMessagesByData(allMessages);
      }).then(function(dataMessages) {
        expect(dataMessages).toBeTruthy();
        expect(dataMessages.length).toEqual(2);
        expect(dataMessages[1].title).toEqual('message 2');
      });
      httpBackend.flush();
    });

    it('message should have more info url from data if specified', function() {
      var url = 'exampleUrl';
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
                'dataUrl': testingDataUrl,
                'dataObject': 'id',
                'dataMessageMoreInfoUrl': [
                  'Learn More',
                  'url',
                ],
              },
              'moreInfoButton': {
                'label': 'Learn more',
                'url': 'to be replaced',
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
          'Learn More': {
            'url': url,
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
        expect(dataMessages[1].moreInfoButton.url).toEqual(url);
      });
      httpBackend.flush();
    });

    it('message should not have more info url from data if specified, but'+
      'learnMoreButton not configured', function() {
      var url = 'exampleUrl';
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
                'dataUrl': testingDataUrl,
                'dataObject': 'id',
                'dataMessageMoreInfoUrl': [
                  'Learn More',
                  'url',
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
          'Learn More': {
            'url': url,
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
        expect(dataMessages[1].moreInfoButton).toBeUndefined();
      });
      httpBackend.flush();
    });

    it('message should not have more info url from data if specified,'+
      'but no dataurl is configured', function() {
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
                'dataObject': 'id',
                'dataMessageMoreInfoUrl': ['Learn More', 'url'],
              },
              'moreInfoButton': {
                'label': 'Learn more',
                'url': 'to be replaced',
              },
            },
          ],
        }
      );
      messagesService.getAllMessages().then(function(allMessages) {
        expect(allMessages).toBeTruthy();
        expect(allMessages.length).toEqual(2);
        return messagesService.getMessagesByData(allMessages);
      }).then(function(dataMessages) {
        expect(dataMessages).toBeTruthy();
        expect(dataMessages.length).toEqual(2);
        expect(dataMessages[1].moreInfoButton.url).toEqual('to be replaced');
      });
      httpBackend.flush();
    });
  });
});
