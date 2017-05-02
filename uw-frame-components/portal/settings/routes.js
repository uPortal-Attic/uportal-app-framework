define(['require'], function(require) {

    return {
      'betaSettings' : {
          templateUrl: require.toUrl('./partials/settings.html'),
          controller: 'PortalBetaSettingsController'
      },
      'userSettings' : {
          templateUrl: require.toUrl('./partials/user-settings.html'),
          controller: 'PortalUserSettingsController'
      }
    }
});
