'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.misc.services', []);

  app.factory('miscService', function($http, $window, $location, MISC_URLS) {

    /**
     Used to redirect users to login screen iff result code is 0 (yay shib) or 302
     
     Setup MISC_URLS.loginURL in js/app-config.js to have redirects happen
    **/
    var redirectUser = function(status, caller) {
      if(status === 0 || status === 302) {
        console.log("redirect happening due to " + status);
        if(MISC_URLS.loginURL) {
          window.location.replace(MISC_URLS.loginURL);
        } else {
          console.warn("MISC_URLS.loginURL was not set, cannot redirect");
        }
      } else {
        console.warn("Strange behavior from " + caller +". Returned status code : " + status);
      }
    };
    
    /**
     Google Analytics page view
     - searchTerm : Optional parameter to say "this is a search page". 
                    This is the actual search term used. 
    **/
    var pushPageview = function (searchTerm) {
      var path = $location.path();
      if(searchTerm) {
        path += "?q=" + searchTerm;
      }
      console.log('ga pageview logged ' + path);
      $window._gaq.push(['_trackPageview', path]);
    };

    /**
     Google Analytics event push
     - category : e.g.: beta header
     - action   : e.g.: beta buttons
     - label    : e.g.: back to classic
     
     See https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide for more info
    **/
    var pushGAEvent = function(category, action, label) {
      console.log('ga event logged c:' + category + " a:" + action + " l:" + label);
      $window._gaq.push(['_trackEvent', category, action, label]);
    };

    return {
      redirectUser: redirectUser,
      pushPageview: pushPageview,
      pushGAEvent : pushGAEvent
    };

  });

  return app;

});

