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
          return '';
        }
      };
    });
});
