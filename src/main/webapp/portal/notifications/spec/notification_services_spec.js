'use strict';
define(['angular-mocks', 'portal'], function() {
    describe('NotificationsService', function() {
        var notificationsService, httpBackend, backendURL, groupURL, kvURL;

        beforeEach(function() {
          module('portal');
        });

        beforeEach(inject(function(_notificationsService_, _$httpBackend_, SERVICE_LOC) {
            notificationsService = _notificationsService_;
            httpBackend = _$httpBackend_;
            backendURL = SERVICE_LOC.notificationsURL;
            groupURL   = SERVICE_LOC.groupURL;
            kvURL = SERVICE_LOC.kvURL;
        }));
        
        it("should return an empty array when you get an empty string as a value", function(){
          //setup
          httpBackend.whenGET(backendURL).respond({"notifications" :[]});
          httpBackend.whenGET(kvURL + "getValue?key=notification:dismiss").respond({value : ""});
          
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
            //begin test
            notificationsService.getAllNotifications().then(function(results){
                expect(results).toBeTruthy();
                expect(results.length).toEqual(0);
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

            //begin test
            notificationsService.getAllNotifications().then(function(results){
                console.log(results);
                expect(results).toBeTruthy();
                expect(results.length).toEqual(1);
            });
            httpBackend.flush();
        });
    });
});
