'use strict';

define(['angular', 'jquery'], function(angular, $) {

    var app = angular.module('portal.settings.services', []);

    app.factory('portalSkinService', ['$q', '$http', 'miscService', 'SERVICE_LOC',
        function($q, $http, miscService,SERVICE_LOC) {

          function setPortalSkin(skinKey){
            if(SERVICE_LOC.portalLayoutRestEndpoint) {
              var params = {
                "action" : 'chooseSkin',
                "skinName" : skinKey
              }
              return $http.post(
                SERVICE_LOC.portalLayoutRestEndpoint,
                {
                  "params": params
                });
            } else {
              return $q.resolve();
            }
          }

          return {
            setPortalSkin : setPortalSkin
          };
        }]);
});
