define(['require'], function(require) {
  return {
    'notifications': {
      templateUrl: require.toUrl('./partials/view__notifications.html'),
      controller: 'MessagesController',
    },
    'features': {
      templateUrl: require.toUrl('./partials/view__features.html'),
      controller: 'FeaturesPageController',
      controllerAs: 'vm',
    },
  };
});
