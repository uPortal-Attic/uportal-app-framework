'use strict';
define(['angular-mocks', 'portal'], function() {
    describe('NotificationsService', function() {
        var notificationsService, httpBackend, backendURL, groupURL, kvURL, loginSilentURL, kvKeys;

        beforeEach(function() {
          module('portal');
        });

        beforeEach(inject(function(_notificationsService_, _$httpBackend_, SERVICE_LOC, KV_KEYS) {
            notificationsService = _notificationsService_;
            httpBackend = _$httpBackend_;
            backendURL = SERVICE_LOC.notificationsURL;
            groupURL   = SERVICE_LOC.groupURL;
            loginSilentURL = SERVICE_LOC.loginSilentURL;
            kvURL = SERVICE_LOC.kvURL;
            kvKeys = KV_KEYS;
            if(loginSilentURL) {
              httpBackend.whenGET(loginSilentURL).respond({"status" : "success", "username" : "admin"});
            }
        }));

        it("should return an empty array when you get an empty string as a value", function(){
          //setup
          httpBackend.whenGET(backendURL).respond({"notifications" :[]});
          httpBackend.whenGET(kvURL + "/" + kvKeys.DISMISSED_NOTIFICATION_IDS).respond([]);
          httpBackend.whenGET(groupURL).respond([]);

          //test
          notificationsService.getDismissedNotificationIds().then(function(results){
            expect(results).toBeTruthy();
          });
          httpBackend.flush();
        });

        it("should return an empty set", function() {

            //setup
            httpBackend.whenGET(backendURL).respond({"notifications" :[]});
            httpBackend.whenGET(groupURL).respond({"groups" :[]});
            httpBackend.whenGET(kvURL + "/" + kvKeys.DISMISSED_NOTIFICATION_IDS).respond([]);
            //begin test
            notificationsService.getAllNotifications().then(function(results){
              console.log(results);
              expect(results).toBeTruthy();
              expect(results.dismissed).toBeTruthy();
              expect(results.notDismissed).toBeTruthy();
            });
            httpBackend.flush();
        });

        it("should have one result", function() {
            //setup
            httpBackend.whenGET(backendURL).respond(
              {"notifications" :
                  [
                   {
                     "id"     : 1,
                     "groups" : ["Portal Administrators"],
                     "title"  : "This is an admin notification smoke test",
                     "actionURL" : "http://www.google.com",
                     "actionAlt" : "Google"
                   }
                 ]
               }
            );
            httpBackend.whenGET(groupURL).respond({"groups" :[]});
            httpBackend.whenGET(kvURL + "/" + kvKeys.DISMISSED_NOTIFICATION_IDS).respond([]);

            //begin test
            notificationsService.getAllNotifications().then(function(results){
                console.log(results);
                expect(results).toBeTruthy();
                expect(results.notDismissed).toBeTruthy();
                expect(results.dismissed).toBeTruthy();
                expect(results.notDismissed.length).toEqual(1);
            });
            httpBackend.flush();
        });
    });
});
