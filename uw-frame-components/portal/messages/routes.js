define(['require'], function(require) {
  return {
    'notifications': {
      templateUrl: require.toUrl('./partials/view__notifications.html'),
    },
    'features': {
      templateUrl: require.toUrl('./partials/view__features.html'),
      // controller: 'PortalFeaturesController',
    },
  };
});
