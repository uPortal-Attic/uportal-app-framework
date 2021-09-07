/*
 * Licensed to Apereo under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Apereo licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License.  You may obtain a
 * copy of the License at the following location:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
'use strict';

define(['angular', 'jquery'], function(angular, $) {
  return angular.module('portal.misc.services', [])

  .factory('portalGroupService', function(
      $http, $log, miscService, SERVICE_LOC
    ) {
    var getGroups = function() {
      var groupPromise = $http.get(SERVICE_LOC.groupURL, {cache: true})
      .then(function(result) {
        return result.data.groups;
      }).catch(function(reason) {
        miscService.redirectUser(reason.status, 'group json feed call');
      });
      return groupPromise;
    };

    /**
     * Filter the array given the groups, with an optional groupFieldName
     * @param {Array} array - an array of objects to be filteredLayout
     * @param {Array} groups - The array of groups
     * @param {string} [arrayGroupFieldName=group] - The field in the array
     *    to filter upon.
     * @param {string} [groupsNameFieldName=name] - The field on the group
     *     object that is the group's name.
     * @return {*}
    */
    var filterArrayByGroups = function(
      array, groups, arrayGroupFieldName, groupsNameFieldName
    ) {
      // validation/setup
      if (!arrayGroupFieldName) {
        arrayGroupFieldName = 'group';
      }
      if (!groupsNameFieldName) {
        groupsNameFieldName = 'name';
      }
      if (
        !array || array.length === 0 || !groups ||
        groups.length === 0 || !angular.isArray(array)
      ) {
        if (!angular.isArray(array)) {
          $log.warn(
            'portalGroupService.filterArrayByGroups ' +
            'was called, but not an array');
        }
        return array;
      }

      var returnArray = [];
      // filtering magic
      $.each(array, function(index, cur) { // for each object
        if (angular.isArray(cur[arrayGroupFieldName])) {
          $.each(cur[arrayGroupFieldName], // for each group for that object
            function(index, group) {
            var inGroup = $.grep(groups, function(e) {
              return e[groupsNameFieldName] === group;
            }).length; // intersect, then get length
            if (inGroup > 0) {// are they in that group?
              returnArray.push(cur); // they should get this object
              return false; // break;
            }
          });
        } else {
          // single filter then
          var inGroup = $.grep(groups, function(e) {
            return e[groupsNameFieldName] === cur[arrayGroupFieldName];
          }).length; // intersect, then get length
          if (inGroup > 0) {
            returnArray.push(cur);
          }
        }
      });
      return returnArray;
    };

    var groupsServiceEnabled = function() {
      if (SERVICE_LOC.groupURL) {
        return true;
      } else {
        return false;
      }
    };

    return {
      getGroups: getGroups,
      filterArrayByGroups: filterArrayByGroups,
      groupsServiceEnabled: groupsServiceEnabled,
    };
  })

  .factory('PortalAddToHomeService',
  function($http, $log, $sessionStorage, filterFilter, NAMES, MISC_URLS) {
    var canAddToHome = function() {
      if (MISC_URLS.addToHomeURLS
        && MISC_URLS.addToHomeURLS.addToHomeActionURL) {
        return true;
      } else {
        return false;
      }
    };

    var inHome = function(fname) {
      return $http.get(MISC_URLS.addToHomeURLS.layoutURL)
      .then(function(result) {
        var layout = result.data.layout;
        if (layout) {
          var theFname = (fname ? fname : NAMES.fname);
          var filteredLayout = filterFilter(layout, {fname: theFname});
          return filteredLayout && filteredLayout.length > 0;
        } else {
          return false;
        }
      }, function() {
        // failed
        $log.warn('could not reach portal server to get layout, portal down?');
        return true; // it is in the layout by default since portal is down
      });
    };

    var addToHome = function(fname) {
      return $http.post(
        MISC_URLS.addToHomeURLS.addToHomeActionURL +
        (fname ? fname : NAMES.fname)
      );
    };

    var dismissForSession = function() {
      $sessionStorage.dismissedAddToHome = true;
    };

    var isDismissed = function() {
      return $sessionStorage.dismissedAddToHome;
    };

    return {
      canAddToHome: canAddToHome,
      inHome: inHome,
      addToHome: addToHome,
      dismissForSession: dismissForSession,
      isDismissed: isDismissed,
    };
  })

  .factory('miscService',
  function($analytics, $http, $window, $location, $log, MISC_URLS) {
    /**
     * Redirects users to uPortal server login
     *  if result code is
     *    undefined (Shibboleth weirdness?) or
     *    0 (Shibboleth weirdness?) or
     *    302 (a shib redirect?) or
     *    401 (Unauthorized, due to lack of authentication?)
     *  Requires MISC_URLS.loginURL in js/app-config.js
     *  Sets refUrl to current URL, so that uPortal will attempt to return the
     *  user to the current page after login.
     * @param {number} status
     * @param {string} caller
    **/
    var redirectUser = function(status, caller) {
      if (!status || status === 0 || status === 302 || status === 401) {

        if (MISC_URLS.loginURL) {
          var currentUrl = $window.location.href;
          var currentUrlEncoded = encodeURIComponent(currentUrl);
          var newUrl = MISC_URLS.loginURL + '?refUrl=' + currentUrlEncoded;
          $log.log('redirecting to ' + newUrl +
            ' on behalf of caller ' + caller +
            'which signaled status ' + status);
          $window.location.replace(newUrl);
        } else {
          $log.warn('MISC_URLS.loginURL was not set, cannot redirect');
        }
      } else {
        $log.warn(
          'Strange behavior from ' + caller +
          '. Returned status code : ' + status);
      }
    };

    /**
     * Google Analytics event push
     * See https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide for more info
     * @param {string} category - Context of the event
     * @param {string} action - Action taken
     * @param {string} label - Label/data pertinent to event
     * @param {string} value
     */
    var pushGAEvent = function(category, action, label, value) {
      // eslint-disable-next-line no-undef
      dataLayer.push({
        'event': 'MyUW Event',
        'event_action': action,
        'event_category': category,
        'event_label': label,
        'event_value': (value || label),
      });

      $log.log(
        'pushed event to tag manager: action: ' + action +
        ', category: ' + category + ', label: ' + label);
    };

    return {
      redirectUser: redirectUser,
      pushGAEvent: pushGAEvent,
    };
  });
});
