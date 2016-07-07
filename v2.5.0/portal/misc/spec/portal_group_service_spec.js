'use strict';
define(['angular-mocks', 'portal'], function() {
    describe('PortalGroupService', function() {
        var service, httpBackend, mockMiscService, URLS = {}, loginSilentURL;

        beforeEach(function() {
          module('portal');
        });

        beforeEach(inject(function(_PortalGroupService_, _$httpBackend_, SERVICE_LOC, FEATURES, APP_FLAGS) {
            service = _PortalGroupService_;
            httpBackend = _$httpBackend_;
            URLS.group = SERVICE_LOC.groupURL;
            URLS.feature = FEATURES.serviceURL;
            loginSilentURL = APP_FLAGS.loginOnLoad;
            if(loginSilentURL) {
              httpBackend.whenGET(loginSilentURL).respond({"status" : "success", "username" : "admin"});
            }
        }));

        it("should properly handle filtering nothing", function(){
          //setup
          var array = [];
          var groups = [];
          //test
          var results = service.filterArrayByGroups(array, groups);
          expect(results).toBeTruthy();
          expect(results.length).toEqual(0);
        });

        it("should properly handle filtering with a string or an array with default attribute of group", function(){
          //setup
          var array = [{title: 'in crowd', group : 'in'}, {title: 'out crowd', group: ['out']}, {title: 'everyone', group: ['in','out']}];
          var groups = [{name: "in"}];
          //test
          var results = service.filterArrayByGroups(array, groups);
          expect(results).toBeTruthy();
          expect(results.length).toEqual(2);
        });

        it("should properly handle filtering with an alternate group field name", function(){
          //setup
          var array = [{title: 'in crowd', group : 'in'}, {title: 'out crowd', group: ['out']}, {title: 'everyone', group: ['in','out']}];
          var groups = [{title: "in"}];//uPortal inside joke
          //test
          var results = service.filterArrayByGroups(array, groups, null, 'title');
          expect(results).toBeTruthy();
          expect(results.length).toEqual(2);
        });

        it("should properly handle filtering with an alternate array field name", function(){
          //setup
          var array = [{title: 'in crowd', theGroup : 'in'}, {title: 'out crowd', theGroup: ['out']}, {title: 'everyone', theGroup: ['in','out']}];
          var groups = [{name: "in"}];
          //test
          var results = service.filterArrayByGroups(array, groups, 'theGroup');
          expect(results).toBeTruthy();
          expect(results.length).toEqual(2);
        });
    });
});
