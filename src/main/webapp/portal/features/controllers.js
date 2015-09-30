'use strict';

define(['angular','require'], function(angular, require) {
  var app = angular.module('portal.features.controllers', []);
	
	
	app.controller('PortalFeaturesController', ['$localStorage', '$sessionStorage','$scope', '$document', 'APP_FLAGS', '$modal', 'portalFeaturesService', '$sanitize', 'MISC_URLS', function($localStorage, $sessionStorage, $scope, $document, APP_FLAGS, $modal, portalFeaturesService, $sanitize, MISC_URLS) {
    $scope.features = [];
    $scope.MISC_URLS = MISC_URLS;

		if (APP_FLAGS.features) {
			portalFeaturesService.getFeatures().then(function(data) {
				var features = data;
				if (features.data.length > 0) {
					$scope.features = features.data;
				}
			});
		}
  }]);
	return app;
});