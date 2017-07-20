'use strict';

define(['angular', 'jquery'], function(angular, $) {
    return angular.module('portal.timeout.services', [])

    /**
    Shibboleth Service

    Public Methods
    * getSession() - Gets the shib session from SERVICE_LOC.shibbolethSessionURL
    * getTimeout() - Gets the shib session, but returns just the timeout
                     and the time of that timeout.
    **/
    .factory('portalShibbolethService', ['$http', '$log',
      'miscService', 'SERVICE_LOC',
        function($http, $log, miscService, SERVICE_LOC) {
          var onError = function(response) {
            miscService.redirectUser(response.status, 'Shibboleth Service');
            return response.data;
          };

          var onGetSessionSuccess = function(response) {
            return response.data;
          };

          var onGetTimeoutSuccess = function(session) {
            if(session && angular.isObject(session)) {
              var timeout = {};
              timeout.expirationMinutes = session.expiration;
              var now = new Date();
              timeout.expirationTime =
                now.setMinutes(now.getMinutes() + session.expiration);
              timeout.expirationMills = session.expiration * 60000;
              return timeout;
            } else {
              return null;
            }
          };

          /**
           * Retrieves the session from shibboleth
           * @return {*|Function|any|Promise}
           */
          function getSession() {
            return $http.get(SERVICE_LOC.shibbolethSessionURL)
                        .then(onGetSessionSuccess, onError);
          }

          /**
           * Retrieves the timeout for the current session
           * from shibboleth
           * @return {*}
           */
          function getTimeout() {
            return getSession().then(onGetTimeoutSuccess);
          }

          /**
           * Checks whether the shibboleth endpoint is configured
           * @return {boolean}
           */
          function shibServiceActivated() {
            return SERVICE_LOC.shibbolethSessionURL ? true : false;
          }

          /**
           * Gets the user's shibboleth attributes
           * @return {*} An array of Shib attribute objects
           */
          function getUserAttributes() {
            return $http.get(SERVICE_LOC.shibbolethSessionURL, {cache: true})
              .then(function(result) {
                if (result.data) {
                  return result.data.attributes;
                } else {
                  return result;
                }
              })
              .catch(function(error) {
                $log.warn('Could\'t get Shibboleth session info');
                $log.error(error);
                miscService.redirectUser(status, 'Get User Info');
              });
          }

          return {
            getSession: getSession,
            getTimeout: getTimeout,
            shibServiceActivated: shibServiceActivated,
            getUserAttributes: getUserAttributes,
          };
        }]);
});
