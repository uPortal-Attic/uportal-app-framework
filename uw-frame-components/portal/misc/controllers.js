'use strict';

define(['angular'], function(angular) {
  var app = angular.module('portal.misc.controllers', []);

  /* AddToHomeController */
  app.controller('AddToHomeController', [ '$scope', '$timeout', 'PortalAddToHomeService',
                 function($scope, $timeout, PortalAddToHomeService) {
    $scope.addToHome = function() {
      if(!$scope.inHome && PortalAddToHomeService.canAddToHome($scope.fname)) {
        $scope.savingAddToHome = true;
        $timeout(function(){
          $scope.actionLinkIconTemp = $scope.actionLinkIcon;
          $scope.actionLinkIcon = 'fa-circle-o-notch';
        }, 500);
        PortalAddToHomeService.addToHome($scope.fname).then(
          function(){
            //success
            $scope.inHome = true;
            $scope.successfullyAdded = true;
            $scope.actionLinkIcon = $scope.actionLinkIconTemp;
          },
          function(){
            //failed
            $scope.addToHomeFailed = true;
          }
        );
      }
    }

    var init = function() {
      //default it to being in your home to avoid service loading lag
      $scope.inHome = true;
      if(PortalAddToHomeService.canAddToHome($scope.fname)) {
        //check if in home layout
        PortalAddToHomeService.inHome().then(function(data){
          $scope.inHome = data;
        });
      }
    };

    init();

  } ]);

  return app;

 });
