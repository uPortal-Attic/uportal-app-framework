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
/* eslint-env node */
/* global inject */
/* eslint promise/always-return: "off", promise/catch-or-return: "off"*/
define(['angular-mocks', 'portal'], function() {
  describe('SkipToContentController', function() {
    var scope;
    var elementToFocus;
    var elementNotToFocus;
    var $location;

    beforeEach(function() {
      module('portal');
      elementToFocus = angular.element('<div id="focus">');
      elementNotToFocus = angular.element('<div id="noFocus">');
    });

    beforeEach(inject(
     function($rootScope, $controller, _$location_, _$anchorScroll_) {
      scope = $rootScope.$new();
      $location = _$location_;
      $controller('SkipToContentController', {
        $scope: scope,
        $location: $location,
        $anchorScroll: _$anchorScroll_,
      });
    }));

    afterEach(function() {
      elementToFocus.remove();
      elementNotToFocus.remove();
    });

    it('should set focus to specified element', inject(function($document) {
      $document.find('body').eq(0).append(elementToFocus);
      $document.find('body').eq(0).append(elementNotToFocus);
      spyOn(elementToFocus[0], 'focus');
      spyOn(elementNotToFocus[0], 'focus');
      spyOn($location, 'hash');
      spyOn(elementToFocus[0], 'scrollIntoView');
      scope.skipToHere('focus');

      expect(elementToFocus[0].focus).toHaveBeenCalled();
      expect($location.hash).toHaveBeenCalledWith('focus');
      expect(elementNotToFocus[0].focus).not.toHaveBeenCalled();
      expect($location.hash).not.toHaveBeenCalledWith('noFocus');
    }));

    it('should fail set focus to non existent element', function() {
      spyOn($location, 'hash');

      expect(scope.skipToHere.bind('focus')).toThrowError(TypeError);
      expect($location.hash).not.toHaveBeenCalledWith('focus');
    });

    it('should fail set focus to an element referenced by null', function() {
      spyOn($location, 'hash');

      expect(scope.skipToHere.bind(null)).toThrowError(TypeError);
      expect($location.hash).not.toHaveBeenCalledWith('focus');
    });
  });
});
