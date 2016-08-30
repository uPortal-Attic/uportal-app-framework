'use strict';

define(['angular'], function(angular) {
  var app = angular.module('portal.timeout.controllers', []);

  app.controller('PortalTimeoutController', ['$sessionStorage', '$log', '$location', '$timeout', '$mdDialog', 'MISC_URLS', 'PortalShibbolethService',
  function($sessionStorage, $log, $location, $timeout, $mdDialog, MISC_URLS, PortalShibbolethService){
    function init(){
      if(PortalShibbolethService.shibServiceActivated()) {
        //initialize timeout and dialog
        PortalShibbolethService.getTimeout().then(
          function(timeoutData) {
            if(timeoutData && timeoutData.expirationMills) {
              $timeout(triggerDialog, timeoutData.expirationMills);
            } else {
              $log.info("Timeout data could not be found");
              if($sessionStorage.portal
                 && $sessionStorage.portal.username
                 && $sessionStorage.portal.username !== 'guest'){
                   //we know its not a guest session
                   triggerDialog();
                 }
            }
          }
        );
      }
    };

    function triggerDialog(){
      var alert = $mdDialog.alert({
        title: 'Session Expired',
        textContent: 'Your session has expired. Please click below to login, or close this window to logout.',
        ok: 'Login'
      });
      $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
          window.location.replace(MISC_URLS.loginURL);
        });
    };

    init();
  }]);
});
