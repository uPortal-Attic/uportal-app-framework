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

        it("should have one notDismissed result", function() {
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

        it("should have one dismissed result", function() {
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
            httpBackend.whenGET(kvURL + "/" + kvKeys.DISMISSED_NOTIFICATION_IDS).respond([1]);

            //begin test
            notificationsService.getAllNotifications().then(function(results){
                console.log(results);
                expect(results).toBeTruthy();
                expect(results.notDismissed).toBeTruthy();
                expect(results.dismissed).toBeTruthy();
                expect(results.notDismissed.length).toEqual(0);
                expect(results.dismissed.length).toEqual(1);
            });
            httpBackend.flush();
        });

        it("should have one group filtered notification that is not dismissed", function() {
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
            httpBackend.whenGET(groupURL).respond({"groups" :[{"name" : "Portal Administrators"}]});
            httpBackend.whenGET(kvURL + "/" + kvKeys.DISMISSED_NOTIFICATION_IDS).respond([2]);

            //begin test
            notificationsService.getFilteredNotifications().then(function(results){
                console.log(results);
                expect(results).toBeTruthy();
                expect(results.notDismissed).toBeTruthy();
                expect(results.dismissed).toBeTruthy();
                expect(results.notDismissed.length).toEqual(1);
                expect(results.dismissed.length).toEqual(0);
            });
            httpBackend.flush();
        });

        it("should filter out one of the notDismissed notifications because of group membership", function() {
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
                   },
                   {
                     "id"     : 2,
                     "groups" : ["Developers"],
                     "title"  : "Oh Nos!",
                     "actionURL" : "http://www.google.com",
                     "actionAlt" : "Google"
                   }
                 ]
               }
            );
            httpBackend.whenGET(groupURL).respond({"groups" :[{"name" : "Portal Administrators"}]});
            httpBackend.whenGET(kvURL + "/" + kvKeys.DISMISSED_NOTIFICATION_IDS).respond([1]);

            //begin test
            notificationsService.getFilteredNotifications().then(function(results){
                expect(results).toBeTruthy();
                expect(results.notDismissed).toBeTruthy();
                expect(results.dismissed).toBeTruthy();
                //since the test user is not in Developers this should filter out notification 2
                expect(results.notDismissed.length).toEqual(0);
                expect(results.dismissed.length).toEqual(1);
            });
            httpBackend.flush();
        });
        
        it("notification should not appear if dataURL is present but incorrect", function(){
          //setup
          //setup
          httpBackend.whenGET(backendURL).respond(
              {"notifications" :
                [
                 {
                   "id"     : 1,
                   "groups" : ["Everyone"],
                   "title"  : "Notification 1",
                   "actionURL" : "http://www.google.com",
                   "actionAlt" : "Google"
                 },
                 {
                   "id"     : 2,
                   "groups" : ["Everyone"],
                   "title"  : "Notification 2",
                   "actionURL" : "http://www.google.com",
                   "actionAlt" : "Google",
                   "dataURL" : "http://www.google.com"
                 }
                 ]
              }
          );
          httpBackend.whenGET(groupURL).respond({"groups" :[{"name" : "Everyone"}]});
          httpBackend.whenGET("http://www.google.com").respond(400, {});
          httpBackend.whenGET(kvURL + "/" + kvKeys.DISMISSED_NOTIFICATION_IDS).respond([]);
          notificationsService.getFilteredNotifications().then(function(results){
            expect(results).toBeTruthy();
            //Expect notification 1 to be good, but not 2
            expect(results.notDismissed.length).toEqual(1);
            expect(results.notDismissed[0].id).toEqual(1);
          });
          httpBackend.flush();
        });
        
        it("notification should appear if dataURL is present and returns data", function(){
          //setup
          //setup
          httpBackend.whenGET(backendURL).respond(
              {"notifications" :
                [
                 {
                   "id"     : 1,
                   "groups" : ["Everyone"],
                   "title"  : "Notification 1",
                   "actionURL" : "http://www.google.com",
                   "actionAlt" : "Google"
                 },
                 {
                   "id"     : 2,
                   "groups" : ["Everyone"],
                   "title"  : "Notification 2",
                   "actionURL" : "http://www.google.com",
                   "actionAlt" : "Google",
                   "dataURL" : "http://www.google.com"
                 }
                 ]
              }
          );
          httpBackend.whenGET(groupURL).respond({"groups" :[{"name" : "Everyone"}]});
          httpBackend.whenGET("http://www.google.com").respond(200, "something");
          httpBackend.whenGET(kvURL + "/" + kvKeys.DISMISSED_NOTIFICATION_IDS).respond([]);
          notificationsService.getFilteredNotifications().then(function(results){
            expect(results).toBeTruthy();
            expect(results.notDismissed.length).toEqual(2);
          });
          httpBackend.flush();
        });
        
        it("notification should appear if dataURL is present and returns data specifically asked for by dataObject", function(){
          //setup
          //setup
          httpBackend.whenGET(backendURL).respond(
              {"notifications" :
                [
                 {
                   "id"     : 1,
                   "groups" : ["Everyone"],
                   "title"  : "Notification 1",
                   "actionURL" : "http://www.google.com",
                   "actionAlt" : "Google"
                 },
                 {
                   "id"     : 2,
                   "groups" : ["Everyone"],
                   "title"  : "Notification 2",
                   "actionURL" : "http://www.google.com",
                   "actionAlt" : "Google",
                   "dataURL" : "http://www.google.com",
                   "dataObject" : "developers"
                 }
                 ]
              }
          );
          httpBackend.whenGET(groupURL).respond({"groups" :[{"name" : "Everyone"}]});
          httpBackend.whenGET("http://www.google.com").respond(200, "{\"developers\": [\"foo\", \"bar\"], \"favorite foods\":\"chicken\"}");
          httpBackend.whenGET(kvURL + "/" + kvKeys.DISMISSED_NOTIFICATION_IDS).respond([]);
          notificationsService.getFilteredNotifications().then(function(results){
            expect(results).toBeTruthy();
            expect(results.notDismissed.length).toEqual(2);
          });
          httpBackend.flush();
        });
        
        it("notification should not appear if dataURL is present and can't return data specifically asked for by dataObject", function(){
          //setup
          //setup
          httpBackend.whenGET(backendURL).respond(
              {"notifications" :
                [
                 {
                   "id"     : 1,
                   "groups" : ["Everyone"],
                   "title"  : "Notification 1",
                   "actionURL" : "http://www.google.com",
                   "actionAlt" : "Google"
                 },
                 {
                   "id"     : 2,
                   "groups" : ["Everyone"],
                   "title"  : "Notification 2",
                   "actionURL" : "http://www.google.com",
                   "actionAlt" : "Google",
                   "dataURL" : "http://www.google.com",
                   "dataObject" : "data"
                 }
                 ]
              }
          );
          httpBackend.whenGET(groupURL).respond({"groups" :[{"name" : "Everyone"}]});
          httpBackend.whenGET("http://www.google.com").respond(200, "{\"developers\": [\"foo\", \"bar\"], \"favorite foods\":\"chicken\"}");
          httpBackend.whenGET(kvURL + "/" + kvKeys.DISMISSED_NOTIFICATION_IDS).respond([]);
          notificationsService.getFilteredNotifications().then(function(results){
            expect(results).toBeTruthy();
            expect(results.notDismissed.length).toEqual(1);
            expect(results.notDismissed[0].id).toEqual(1);
          });
          httpBackend.flush();
        });
        
        it("notification should appear if dataURL is not present and dataObject is mistakenly present", function(){
          //setup
          //setup
          httpBackend.whenGET(backendURL).respond(
              {"notifications" :
                [
                 {
                   "id"     : 1,
                   "groups" : ["Everyone"],
                   "title"  : "Notification 1",
                   "actionURL" : "http://www.google.com",
                   "actionAlt" : "Google"
                 },
                 {
                   "id"     : 2,
                   "groups" : ["Everyone"],
                   "title"  : "Notification 2",
                   "actionURL" : "http://www.google.com",
                   "actionAlt" : "Google",
                   "dataObject" : "data"
                 }
                 ]
              }
          );
          httpBackend.whenGET(groupURL).respond({"groups" :[{"name" : "Everyone"}]});
          httpBackend.whenGET(kvURL + "/" + kvKeys.DISMISSED_NOTIFICATION_IDS).respond([]);
          notificationsService.getFilteredNotifications().then(function(results){
            expect(results).toBeTruthy();
            expect(results.notDismissed.length).toEqual(2);
          });
          httpBackend.flush();
        });
        
        it("notification should appear if dataURL is present and returns data specifically asked for by dataArray and searched by object", function(){
          //setup
          //setup
          httpBackend.whenGET(backendURL).respond(
            {"notifications" :
              [
                {
                  "id"     : 1,
                  "groups" : ["Everyone"],
                  "title"  : "Notification 1",
                  "actionURL" : "http://www.google.com",
                  "actionAlt" : "Google"
                },
                {
                  "id"     : 2,
                  "groups" : ["Everyone"],
                  "title"  : "Notification 2",
                  "actionURL" : "http://www.google.com",
                  "actionAlt" : "Google",
                  "dataURL" : "http://www.google.com",
                  "dataObject" : "developers",
                  "dataArrayFilter" : "{\"name\": \"baz\"}"
                }
              ]
            }
          );
          httpBackend.whenGET(groupURL).respond({"groups" :[{"name" : "Everyone"}]});
          httpBackend.whenGET("http://www.google.com").respond(200, {"developers":[{"name":"foo"}, {"name":"bar"}, {"name":"baz"}], 
            "fruit":["apples, oranges"]});
          httpBackend.whenGET(kvURL + "/" + kvKeys.DISMISSED_NOTIFICATION_IDS).respond([]);
          notificationsService.getFilteredNotifications().then(function(results){
            expect(results).toBeTruthy();
            expect(results.notDismissed.length).toEqual(2);
          });
          httpBackend.flush();
        });
        
        it("notification should appear if dataURL is present and returns data specifically asked for by dataArray with two filters and searched by object", function(){
          //setup
          //setup
          httpBackend.whenGET(backendURL).respond(
            {"notifications" :
              [
                {
                  "id"     : 1,
                  "groups" : ["Everyone"],
                  "title"  : "Notification 1",
                  "actionURL" : "http://www.google.com",
                  "actionAlt" : "Google"
                },
                {
                  "id"     : 2,
                  "groups" : ["Everyone"],
                  "title"  : "Notification 2",
                  "actionURL" : "http://www.google.com",
                  "actionAlt" : "Google",
                  "dataURL" : "http://www.google.com",
                  "dataObject" : "developers",
                  "dataArrayFilter" : "{\"name\": \"foo\", \"id\" : 4}"
                }
              ]
            }
          );
          httpBackend.whenGET(groupURL).respond({"groups" :[{"name" : "Everyone"}]});
          httpBackend.whenGET("http://www.google.com").respond(200, {"developers":[{"name":"foo", "id":4}, {"name":"foo"}, {"name":"foo"}], 
            "fruit":["apples, oranges"]});
          httpBackend.whenGET(kvURL + "/" + kvKeys.DISMISSED_NOTIFICATION_IDS).respond([]);
          notificationsService.getFilteredNotifications().then(function(results){
            expect(results).toBeTruthy();
            expect(results.notDismissed.length).toEqual(2);
          });
          httpBackend.flush();
        });
        
        it("notification should not appear if dataURL is present and returns data specifically asked for by dataArray with two filters and searched by object when filter does not match", function(){
          //setup
          //setup
          httpBackend.whenGET(backendURL).respond(
            {"notifications" :
              [
                {
                  "id"     : 1,
                  "groups" : ["Everyone"],
                  "title"  : "Notification 1",
                  "actionURL" : "http://www.google.com",
                  "actionAlt" : "Google"
                },
                {
                  "id"     : 2,
                  "groups" : ["Everyone"],
                  "title"  : "Notification 2",
                  "actionURL" : "http://www.google.com",
                  "actionAlt" : "Google",
                  "dataURL" : "http://www.google.com",
                  "dataObject" : "developers",
                  "dataArrayFilter" : "{\"name\": \"foo\", \"id\" : 3}"
                }
              ]
            }
          );
          httpBackend.whenGET(groupURL).respond({"groups" :[{"name" : "Everyone"}]});
          httpBackend.whenGET("http://www.google.com").respond(200, {"developers":[{"name":"foo", "id":4}, {"name":"foo"}, {"name":"foo"}], 
            "fruit":["apples, oranges"]});
          httpBackend.whenGET(kvURL + "/" + kvKeys.DISMISSED_NOTIFICATION_IDS).respond([]);
          notificationsService.getFilteredNotifications().then(function(results){
            expect(results).toBeTruthy();
            expect(results.notDismissed.length).toEqual(1);
          });
          httpBackend.flush();
        });
        
        it("notification should not appear if dataURL is present and attempts to arrayFilter on non-array", function(){
          //setup
          //setup
          httpBackend.whenGET(backendURL).respond(
            {"notifications" :
              [
                {
                  "id"     : 1,
                  "groups" : ["Everyone"],
                  "title"  : "Notification 1",
                  "actionURL" : "http://www.google.com",
                  "actionAlt" : "Google"
                },
                {
                  "id"     : 2,
                  "groups" : ["Everyone"],
                  "title"  : "Notification 2",
                  "actionURL" : "http://www.google.com",
                  "actionAlt" : "Google",
                  "dataURL" : "http://www.google.com",
                  "dataArrayFilter" : "{\"name\": \"baz\"}"
                }
              ]
            }
          );
          httpBackend.whenGET(groupURL).respond({"groups" :[{"name" : "Everyone"}]});
          httpBackend.whenGET("http://www.google.com").respond(200, {"developers":[{"name":"foo"}, {"name":"bar"}, {"name":"baz"}], 
            "fruit":["apples, oranges"]});
          httpBackend.whenGET(kvURL + "/" + kvKeys.DISMISSED_NOTIFICATION_IDS).respond([]);
          notificationsService.getFilteredNotifications().then(function(results){
            expect(results).toBeTruthy();
            expect(results.notDismissed.length).toEqual(1);
          });
          httpBackend.flush();
        });
        
        it("notification should appear in dismissed even when data feed doesn't apply anymore", function(){
          //setup
          //setup
          httpBackend.whenGET(backendURL).respond(
            {"notifications" :
              [
                {
                  "id"     : 1,
                  "groups" : ["Everyone"],
                  "title"  : "Notification 1",
                  "actionURL" : "http://www.google.com",
                  "actionAlt" : "Google"
                },
                {
                  "id"     : 2,
                  "groups" : ["Everyone"],
                  "title"  : "Notification 2",
                  "actionURL" : "http://www.google.com",
                  "actionAlt" : "Google",
                  "dataURL" : "http://www.google.com",
                  "dataArrayFilter" : "{\"name\": \"baz\"}"
                }
              ]
            }
          );
          httpBackend.whenGET(groupURL).respond({"groups" :[{"name" : "Everyone"}]});
          httpBackend.whenGET("http://www.google.com").respond(200, {"developers":[{"name":"foo"}, {"name":"bar"}, {"name":"baz"}], 
            "fruit":["apples, oranges"]});
          httpBackend.whenGET(kvURL + "/" + kvKeys.DISMISSED_NOTIFICATION_IDS).respond([2]);
          notificationsService.getFilteredNotifications().then(function(results){
            expect(results).toBeTruthy();
            expect(results.dismissed.length).toEqual(1);
          });
          httpBackend.flush();
        });
        
    });
});
