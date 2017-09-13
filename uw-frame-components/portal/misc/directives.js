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

define(['angular', 'require'], function(angular, require) {
  return angular.module('portal.misc.directives', [])

    /**
     * Loading gif - show loading gif when the
     * length of array is 0 and empty is not set
     * REQUIRED attribute that isn't listed below:
     *   object : this is the scope array we are watching to show/hide gif
     *   empty  : this is the scope boolean flag that
     *    you set if the data came back and it was empty
     *   reuse  : (optional) set to true, it won't
     *    destroy the loading gif, just hide it
     */
    .directive('loadingGif', [function() {
      return {
        restrict: 'E',
        templateUrl: require.toUrl('./partials/loading-gif.html'),
        link: function(scope, elm, attrs) {
          scope.isLoading = function() {
            if (angular.isUndefined(attrs.empty)) {
              attrs.empty = false;
            }
            return (!scope[attrs.object] || scope[attrs.object].length == 0)
              && ! scope[attrs.empty];
          };

          scope.$watch(scope.isLoading, function(v) {
            if (v) {
              elm.show();
            } else {
              elm.hide();
              if (!attrs.reuse) {
                elm.css('margin', '0');
                // remove content of div, so if it shows again later
                // it doesn't make the page look funky
                elm.html('');
              }
            }
          });
        },
      };
    }])
    .directive('loading', ['$http', function($http) {
        return {
            restrict: 'A',
            link: function(scope, elm, attrs) {
                scope.isLoading = function() {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function(v) {
                    if (v) {
                        elm.show();
                    } else {
                        elm.hide();
                        elm.css('margin', '0');
                        // remove content of div, so if it shows again later
                        // it doesn't make the page look funky
                        elm.html('');
                    }
                });
            },
        };
    }])

    .directive('hideWhileLoading', ['$http', function($http) {
        return {
            restrict: 'A',
            link: function(scope, elm, attrs) {
                scope.$watch(scope.isLoading, function(v) {
                    if (v) {
                        elm.hide();
                    } else {
                        elm.show();
                    }
                });
            },
        };
    }])

    .directive('selectOnPageLoad', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                // wait until intial value is there, select it,
                // then clear the watch so doesn't keep doing it
                var clearWatch = scope.$watch(
                    function() {
                      return angular.element(element[0]).val();
                    },
                    function(value) {
                        if (value) {
                            element[0].focus();
                            clearWatch();
                        }
                    }
                );
            },
        };
    })

    .directive('focusMe', function($log, $timeout) {
        return {
          link: function(scope, element, attrs) {
            scope.$watch(attrs.focusMe, function(value) {
              if (value === true) {
                $log.log('value=', value);
                $timeout(function() {
                  element[0].focus();
                  scope[attrs.focusMe] = false;
                });
              }
            });
          },
        };
      })

    /**
     * Directive to render the div with the "app-header" class.
     * Supports 3 attributes:
     *
     * <ol>
     * <li>app-title: displayed in an h1 child element</li>
     * <li>app-icon: the font awesome icon you want (e.g.: fa-google) </li>
     * <li>app-action-link-*;
     *    url: the url you want, if not set action link hides.
     *    icon: the icon you want for action, default fa-plus.
     *    text: the text, default "add to home".</li>
     * <li>app-add-to-home: Replaces action link url
     *    with a function call to add to portal home</li>
     * <li>app-option-template :
     *    The name of the template you want your option drop
     *    down to use. if not set, option drop down hidden.</li>
     * <li>app-fname :
     *    The functional name of the application,
     *    if not provided it'll use NAMES.fname</li>

     * </ol>
     *
     * See ./partials/app-header.html.
     */
    .directive('appHeader', function() {
      return {
        restrict: 'E',
        scope: {
          title: '@appTitle',
          icon: '@appIcon',
          fname: '@appFname',
          showAddToHome: '@appShowAddToHome',
        },
        templateUrl: require.toUrl('./partials/app-header.html'),
      };
    })

    .directive('appHeaderTwoWayBind', function() {
      return {
        restrict: 'E',
        scope: {
          title: '=appTitle',
          icon: '=appIcon',
          fname: '=appFname',
          showAddToHome: '=appShowAddToHome',
        },
        templateUrl: require.toUrl('./partials/app-header.html'),
      };
    })

    /**
    <frame-page> is a directive that is your typical page. Header, body.
    The header items are routed to the <app-header> (see above)
    The body of the tag is then the body of the application
    Optional: whiteBackground :
      Adds in classes that do a white background with a border
    */
    .directive('framePage', function() {
      return {
          restrict: 'E',
          templateUrl: require.toUrl('./partials/frame-page.html'),
          transclude: true,
          scope: {
            appTitle: '@appTitle',
            appIcon: '@appIcon',
            appFname: '=appFname',
            appShowAddToHome: '=appShowAddToHome',
            whiteBackground: '=',
          },
      };
    })

    /**
     * content-item is a directive that
     * displays a template with provided content
     *
     * Params:
     *  - template: the template to display (can have angular markup)
     */
    .directive('contentItem', function($compile) {
        var linker = function(scope, element, attrs) {
            element.html(scope.template).show();
            $compile(element.contents())(scope);
        };

        return {
            restrict: 'E',
            link: linker,
        };
    })


    /**
     * Circle Button Directive
     * Displays a button that looks like a circle with a
     * fa-icon in the middle, and a title below
     * Template :
     *  <circle-button data-href='' data-target=''
     *    data-fa-icon='' data-disabled='false' data-title=''></circle-button>
     *
     * Params:
     * - href : where you want them to go
     * - target : open in new window
     * - fa-icon : the font awesome icon to use
     * - md-icon : the material icon to use (preferred to fa-icon if available)
     * - disabled : button disabled or not (can be a variable)
     * - title : (optional) title that is displayed under the circle
     * - truncLen : (optional) length to truncate the title
     */
    .directive('circleButton', function() {
      return {
        restrict: 'E',
        scope: {
          href: '@href',
          target: '@target',
          faIcon: '@faIcon',
          mdIcon: '@mdIcon',
          cbDisabled: '=disabled',
          title: '@title',
          trunclen: '@trunclen',
        },
        templateUrl: require.toUrl('./partials/circle-button.html'),
      };
    })

  /**
   * Launch Button Directive
   * Displays a button that fits the width and visual style of a widget
   * Template:
   *  <launch-button data-href="" data-target=""
   *    data-button-text="" data-aria-label=""></launch-button>
   *
   * Params:
   * - href: where you want them to go
   * - target: open in new window, new tab, or same window
   * - button-text: the text to be displayed
   * - aria-label: (optional) text to provide additional
   *    context for screen readers, if necessary
   */
    .directive('launchButton', function() {
      return {
        restrict: 'E',
        scope: {
          href: '@href',
          target: '@target',
          buttonText: '@buttonText',
          ariaLabel: '@ariaLabel',
        },
        templateUrl: require.toUrl('./partials/launch-button.html'),
      };
    })

    .directive('addToHome', function() {
      return {
        restrict: 'E',
        templateUrl: require.toUrl('./partials/add-to-home.html'),
      };
    });
});
