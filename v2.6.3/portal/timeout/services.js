'use strict';

define(['angular', 'jquery'], function(angular, $) {

    var app = angular.module('portal.timeout.services', []);

    /**
    Shibboleth Service

    Public Methods
    * getSession() - Gets the shib session from SERVICE_LOC.shibbolethSessionURL
    * getTimeout() - Gets the shib session, but returns just the timeout
                     and the time of that timeout.
    **/
    app.factory('PortalShibbolethService', ['$http', 'miscService', 'SERVICE_LOC',
        function($http, miscService,SERVICE_LOC) {

          function onError(response){
            miscService.redirectUser(response.status, "Shibboleth Service");
            return response.data;
          }

          function onGetSessionSuccess(response){
            return response.data;
          }

          function onGetTimeoutSuccess(session){
            if(session) {
              var timeout = {};
              timeout.expirationMinutes = session.expiration;
              var now = new Date();
              timeout.expirationTime = now.setMinutes(now.getMinutes() + session.expiration);
              timeout.expirationMills = session.expiration * 60000;
              return timeout;
            } else {
              return null;
            }
          }

          function getSession(){
            return $http.get(SERVICE_LOC.shibbolethSessionURL)
                        .then(onGetSessionSuccess, onError);
          };

          function getTimeout(){
            return getSession().then(onGetTimeoutSuccess);
          }

          function shibServiceActivated() {
            if(SERVICE_LOC.shibbolethSessionURL) {
              return true;
            } else {
              return false;
            }
          }

          return {
            getSession : getSession,
            getTimeout : getTimeout,
            shibServiceActivated : shibServiceActivated
          };
        }]);
});
