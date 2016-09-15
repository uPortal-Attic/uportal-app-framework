'use strict';

define(['angular', 'require'], function(angular, require) {
  var app = angular.module('portal.misc.directives', []);

    /**
     * Loading gif - show loading gif when the length of said array is 0 and empty is not set
     * REQUIRED attribute that isn't listed below:
     *   object : this is the scope array we are watching to show/hide gif
     *   empty  : this is the scope boolean flag that you set if the data came back and it was empty
     *   reuse  : (optional) set to true, it won't destroy the loading gif, just hide it
     *
     */
    app.directive('loadingGif', [function(){
        return {
            restrict : 'E',
            templateUrl: require.toUrl('./partials/loading-gif.html'),
            link: function(scope, elm, attrs) {
                scope.isLoading = function () {

                    if(typeof attrs.empty === undefined) {
                        attrs.empty = false;
                    }

                    return (!scope[attrs.object] || scope[attrs.object].length == 0) && ! scope[attrs.empty];
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                        if(!attrs.reuse) {
                          elm.css('margin','0')
                          elm.html(""); //removes content of div, so if it shows again later it doesn't make the page look funky
                        }
                    }
                });
            }
        }
    }]);
    app.directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                        elm.css('margin','0')
                        elm.html(""); //removes content of div, so if it shows again later it doesn't make the page look funky
                    }
                });
            }
        };

    }]);

    app.directive('hideWhileLoading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.hide();
                    }else{
                        elm.show();
                    }
                });
            }
        };

    }]);

    app.directive('selectOnPageLoad',function($timeout){
        return {
            restrict: 'A',
            link: function(scope,element){
                //wait until intial value is there, then select it, then clear the watch so doesn't keep doing it
                var clearWatch = scope.$watch(
                    function(){ return $(element[0]).val(); },
                    function(value){
                        if (value){
                            element[0].focus();
                            clearWatch();
                        }
                    }
                )
            }
        }
    });

    app.directive('focusMe', function($timeout) {
        return {
          link: function(scope, element, attrs) {
            scope.$watch(attrs.focusMe, function(value) {
              if(value === true) {
                console.log('value=',value);
                $timeout(function() {
                  element[0].focus();
                  scope[attrs.focusMe] = false;
                });
              }
            });
          }
        };
      });

    /**
     * Directive to render the div with the "app-header" class.
     * Supports 3 attributes:
     *
     * <ol>
     * <li>app-title: displayed in an h1 child element</li>
     * <li>app-icon: the font awesome icon you want (e.g.: fa-google) </li>
     * <li>app-action-link-*; url : the url you want, if not set action link hides.
                              icon: the icon you want for action, default fa-plus.
                              text : the text, default "add to home".</li>
     * <li>app-add-to-home: Replaces action link url with a function call to add to portal home
     * <li>app-option-template : The name of the template you want your option drop
                            down to use. if not set, option drop down hidden.
     * <li>app-fname : The functional name of the application, if not provided it'll use NAMES.fname

     * </ol>
     *
     * See ./partials/app-header.html.
     */
    app.directive('appHeader', function() {
      return {
        restrict: 'E',
        scope: {
          title: '@appTitle',
          icon: '@appIcon',
          actionLinkUrl: '@appActionLinkUrl',
          actionLinkIcon: '@appActionLinkIcon',
          actionLinkText: '@appActionLinkText',
          addToHome : '=appAddToHome',
          fname : '@appFname',
          optionTemplate: '@appOptionTemplate',
          isSingleOption: '@appSingleOption'
        },
        templateUrl: require.toUrl('./partials/app-header.html')
      };
    });

    app.directive('appHeaderTwoWayBind', function() {
      return {
        restrict: 'E',
        scope: {
          title: '=appTitle',
          icon: '=appIcon',
          actionLinkUrl: '=appActionLinkUrl',
          actionLinkIcon: '=appActionLinkIcon',
          actionLinkText: '=appActionLinkText',
          addToHome : '=appAddToHome',
          fname : '=appFname',
          optionTemplate: '=appOptionTemplate',
          isSingleOption: '=appSingleOption'
        },
        templateUrl: require.toUrl('./partials/app-header.html')
      };
    });

    /**
    <frame-page> is a directive that is your typical page. Header, body.

    The header items are routed to the <app-header> (see above)

    The body of the tag is then the body of the application
    
    Optional: whiteBackground : Adds in classes that do a white background with a border

    **/
    app.directive('framePage', function(){
      return {
          restrict : 'E',
          templateUrl : require.toUrl('./partials/frame-page.html'),
          transclude: true,
          scope : {
            appTitle: '@appTitle',
            appIcon: '@appIcon',
            appActionLinkUrl: '@appActionLinkUrl',
            appActionLinkIcon: '@appActionLinkIcon',
            appActionLinkText: '@appActionLinkText',
            appAddToHome : '=appAddToHome',
            appFname : '=appFname',
            appOptionTemplate: '@appOptionTemplate',
            appSingleOption: '@appSingleOption',
            whiteBackground: '='
          }
      }
    });

    /**
     * content-item is a directive that
     * displays a template with provided content
     *
     * Params:
     *  - template: the template to display (can have angular markup)
     */
    app.directive('contentItem', function ($compile) {

        var linker = function(scope, element, attrs) {
            element.html(scope.template).show();
            $compile(element.contents())(scope);
        };

        return {
            restrict: "E",
            link: linker
        };
    });


    /**
     * Circle Button Directive
     * Displays a button that looks like a circle with a fa-icon in the middle, and a title below
     * Template : <circle-button data-href='' data-target='' data-fa-icon='' data-disabled='false' data-title=''></circle-button>
     *
     * Params:
     * - href : where you want them to go
     * - target : open in new window
     * - fa-icon : the font awesome icon to use
     * - disabled : button disabled or not (can be a variable)
     * - title : (optional) title that is displayed under the circle
     * - truncLen : (optional) length to truncate the title
     */
    app.directive('circleButton', function() {
    	return {
    		restrict: 'E',
    		scope: {
    			href: '@href',
    			target: '@target',
    			faIcon: '@faIcon',
          cbDisabled : '=disabled',
          title : '@title',
          trunclen: '@trunclen'
    		},
    		templateUrl: require.toUrl('./partials/circle-button.html')
    	};
    });

  /**
   * Launch Button Directive
   * Displays a button that fits the width and visual style of a widget
   * Template: <launch-button data-href="" data-target="" data-button-text="" data-aria-label=""></launch-button>
   *
   * Params:
   * - href: where you want them to go
   * - target: open in new window, new tab, or same window
   * - button-text: the text to be displayed
   * - aria-label: (optional) text to provide additional context for screen readers, if necessary
   */
    app.directive('launchButton', function() {
      return {
        restrict: 'E',
        scope: {
          href: '@href',
          target: '@target',
          buttonText: '@buttonText',
          ariaLabel: '@ariaLabel'
        },
        templateUrl: require.toUrl('./partials/launch-button.html')
      }
    });

    app.directive('addToHome', function() {
      return {
        restrict : 'E',
        templateUrl : require.toUrl('./partials/add-to-home.html')
      };
    });


    return app;

});
