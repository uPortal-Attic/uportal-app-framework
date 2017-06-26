'use strict';

define(['angular', 'jquery'], function(angular, $) {
    return angular.module('portal.settings.services', [])

    .factory('portalSkinService', ['$q', '$http', 'miscService', 'SERVICE_LOC',
        function($q, $http, miscService, SERVICE_LOC) {
          /**
           * Sets the skin on the backend layout manager
           */
          function setPortalSkin(skinKey) {
            if(SERVICE_LOC.portalLayoutRestEndpoint) {
              var params = {
                'action': 'chooseSkin',
                'skinName': skinKey,
              };
              return $http.post(
                SERVICE_LOC.portalLayoutRestEndpoint,
                {
                  'params': params,
                });
            } else {
              return $q.resolve();
            }
          }

          return {
            setPortalSkin: setPortalSkin,
          };
        }]);
});
