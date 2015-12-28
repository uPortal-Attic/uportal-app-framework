'use strict';

define(['angular'], function(angular) {
  var app = angular.module('portal.misc.controllers', []);

  /* AddToHomeController */
  app.controller('AddToHomeController', [ '$scope', 'PortalAddToHomeService',
                 function($scope, PortalAddToHomeService) {
    $scope.addToHome = function() {
      if(!$scope.inHome && PortalAddToHomeService.canAddToHome($scope.fname)) {
        PortalAddToHomeService.addToHome(data).then(
          function(){
            //success
            $scope.inHome = true;
            $scope.actionLinkIcon = 'fa-check-square';
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
          $scope.inHome = data.inHome;
        });
      }
    };

    init();

  } ]);

  return app;

 });
