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
              },
              'data': {
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
              },
              'data': {
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
              },
              'data': {
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
              },
              'data': {
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

    it('message should not appear if dataURL is'+
        'present but incorrect', function() {
        httpBackend.whenGET(messagesUrl).respond(
          {
            'messages': [
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
                },
              },
            ],
          }
        );
        httpBackend.whenGET(testingDataUrl).respond(400, {});
        messagesService.getAllMessages().then(function(allMessages) {
          expect(allMessages).toBeTruthy();
          expect(allMessages.length).toEqual(2);
          return messagesService.getMessagesByData(allMessages);
        }).then(function(dataMessages) {
          expect(dataMessages).toBeTruthy();
          expect(dataMessages.length).toEqual(1);
        });
        httpBackend.flush();
      });

      it('message should appear if dataURL is present'+
        'and returns data', function() {
        httpBackend.whenGET(messagesUrl).respond(
          {
            'messages': [
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
                },
              },
            ],
          }
        );
        httpBackend.whenGET(testingDataUrl).respond(200, 'foo');
        messagesService.getAllMessages().then(function(allMessages) {
          expect(allMessages).toBeTruthy();
          expect(allMessages.length).toEqual(2);
          return messagesService.getMessagesByData(allMessages);
        }).then(function(dataMessages) {
          expect(dataMessages).toBeTruthy();
          expect(dataMessages.length).toEqual(2);
        });
        httpBackend.flush();
      });

      it('message should appear if dataURL is present and returns data ' +
        'specifically asked for by dataObject', function() {
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
                  'dataObject': 'developers',
                },
              },
            ],
          }
        );
        httpBackend.whenGET(testingDataUrl).respond(200,
          {
            'developers': [
              'foo',
              'bar',
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
        });
        httpBackend.flush();
      });

      it('message should not appear if dataURL is present and cannot'+
        'return data specifically asked for by dataObject', function() {
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
                  'dataObject': 'data',
                },
              },
            ],
          }
        );
        httpBackend.whenGET(testingDataUrl).respond(200,
          {
            'developers': [
              'foo',
              'bar',
            ],
          }
        );
        messagesService.getAllMessages().then(function(allMessages) {
          expect(allMessages).toBeTruthy();
          expect(allMessages.length).toEqual(2);
          return messagesService.getMessagesByData(allMessages);
        }).then(function(dataMessages) {
          expect(dataMessages).toBeTruthy();
          expect(dataMessages.length).toEqual(1);
        });
        httpBackend.flush();
      });

      it('message should appear if dataURL is not present and dataObject'+
        'is mistakenly present', function() {
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
                  'dataObject': 'data',
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
        });
        httpBackend.flush();
      });

      it('message should appear if dataURL is present and'+
        'return data specifically asked for by dataArray'+
        'and searched by object', function() {
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
                  'dataObject': 'developers',
                  'dataArrayFilter': {
                    'name': 'baz',
                  },
                },
              },
            ],
          }
        );
        httpBackend.whenGET(testingDataUrl).respond(200,
          {
            'developers': [
              {'name': 'foo'},
              {'name': 'bar'},
              {'name': 'baz'},
            ],
            'fruit': ['apples, oranges'],
          }
        );
        messagesService.getAllMessages().then(function(allMessages) {
          expect(allMessages).toBeTruthy();
          expect(allMessages.length).toEqual(2);
          return messagesService.getMessagesByData(allMessages);
        }).then(function(dataMessages) {
          expect(dataMessages).toBeTruthy();
          expect(dataMessages.length).toEqual(2);
        });
        httpBackend.flush();
      });

      it('message should appear if dataURL is present and returns data'+
        'specifically asked for by dataArray with two filters and searched'+
        'by object', function() {
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
                  'dataObject': 'developers',
                  'dataArrayFilter': {
                    'name': 'foo',
                    'id': 4,
                  },
                },
              },
            ],
          }
        );
        httpBackend.whenGET(testingDataUrl).respond(200,
          {
          'developers': [
              {'name': 'foo', 'id': 4},
              {'name': 'baz'},
              {'name': 'bar'},
            ],
            'fruit': [
              'apples, oranges',
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
        });
        httpBackend.flush();
      });

      it('message should not appear if dataURL is present and returns data'+
        'specifically asked for by dataArray with two filters and searched by'+
        'object when filter does not match', function() {
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
                  'dataObject': 'developers',
                  'dataArrayFilter': {
                    'name': 'foo',
                    'id': 3,
                  },
                },
              },
            ],
          }
        );
        httpBackend.whenGET(testingDataUrl).respond(200,
          {
            'developers': [
              {'name': 'foo', 'id': 4},
              {'name': 'bar'},
              {'name': 'baz'},
            ],
            'fruit': [
              'apples, oranges',
            ],
          }
        );
        messagesService.getAllMessages().then(function(allMessages) {
          expect(allMessages).toBeTruthy();
          expect(allMessages.length).toEqual(2);
          return messagesService.getMessagesByData(allMessages);
        }).then(function(dataMessages) {
          expect(dataMessages).toBeTruthy();
          expect(dataMessages.length).toEqual(1);
        });
        httpBackend.flush();
      });

      it('message should not appear if dataURL is present and attempts to'+
        'arrayFilter on non-array', function() {
        httpBackend.whenGET(messagesUrl).respond(
          {
            'messages': [
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
                'groups': ['Everyone'],
                'title': 'message 2',
                'audienceFilter': {
                  'groups': [
                    'Everyone',
                  ],
                },
                'data': {
                  'dataUrl': testingDataUrl,
                  'dataArrayFilter': {
                    'name': 'baz',
                  },
                },
              },
            ],
          }
        );
        httpBackend.whenGET(testingDataUrl).respond(200,
          {
            'developers': [
              {'name': 'foo'},
              {'name': 'bar'},
              {'name': 'baz'},
            ],
            'fruit': [
              'apples, oranges',
            ],
          }
        );
        messagesService.getAllMessages().then(function(allMessages) {
          expect(allMessages).toBeTruthy();
          expect(allMessages.length).toEqual(2);
          return messagesService.getMessagesByData(allMessages);
        }).then(function(dataMessages) {
          expect(dataMessages).toBeTruthy();
          expect(dataMessages.length).toEqual(1);
        });
        httpBackend.flush();
      });

      it('message should appear when dataObject is present and'+
        'not an array', function() {
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
          }
        );
        messagesService.getAllMessages().then(function(allMessages) {
          expect(allMessages).toBeTruthy();
          expect(allMessages.length).toEqual(2);
          return messagesService.getMessagesByData(allMessages);
        }).then(function(dataMessages) {
          expect(dataMessages).toBeTruthy();
          expect(dataMessages.length).toEqual(2);
        });
        httpBackend.flush();
      });
  });
});
