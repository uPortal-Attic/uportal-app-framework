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

define(['angular'], function(angular) {
  return angular.module('portal.widgets.filters', [])
    .filter('filterDateRange', function() {
      return function(start, end) {
        var today = new Date();
        var rangeStart = new Date(start);
        var rangeEnd = '';

        // Check if time is provided
        if (end.indexOf('T') >= 0) {
          rangeEnd = new Date(end);
        } else {
          // Have to compensate for lack of time by adding a day
          var rangeEndInitial = new Date(end);
          rangeEnd = new Date(rangeEndInitial.getTime());
          rangeEnd.setDate(rangeEnd.getDate() + 1);
        }
        return today >= rangeStart && today < rangeEnd;
      };
    })
    .filter('filterDifferenceFromDate', function() {
      return function(date) {
        var oneDay = 1000 * 60 * 60 * 24;
        var today = new Date();
        var relativeDate = '';

        // Check if time is provided
        if (date.indexOf('T') >= 0) {
          relativeDate = new Date(date);
        } else {
          // Have to compensate for lack of time by adding a day
          var relativeDateInitial = new Date(date);
          relativeDate = new Date(relativeDateInitial.getTime());
          relativeDate.setDate(relativeDate.getDate() + 1);
        }

        // If date is upcoming, get return days until
        // If date has past, return -1
        if (today < relativeDate) {
          return Math.round(Math.abs(
            (today.getTime() - relativeDate.getTime())/(oneDay)
          ));
        } else if (today > relativeDate) {
          return -1;
        }
      };
    })
    .filter('filterForDateWithYear', function() {
      return function(date) {
        var validWithYear = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        var validDayAndMonth = /(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/;
        if (date.match(validWithYear)) {
          // If date string includes year already, return it
          return date;
        } else if (date.match(validDayAndMonth)) {
          // If date string doesn't include year, add it then return
          return (new Date).getFullYear() + '-' + date;
        } else {
          return -1;
        }
      };
    });
});
