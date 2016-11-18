define(['require'], function(require) {

    return {
      main : {
        templateUrl: require.toUrl('./partials/example-page.html')
      },

      accessDenied: {
        templateUrl: require.toUrl('./partials/access-denied.html')
      },

      serverError: {
          templateUrl: require.toUrl('./partials/server-error.html')
      },

      fileNotFound: {
        templateUrl: require.toUrl('./partials/file-not-found.html')
      },

      storageError: {
        templateUrl: require.toUrl('./partials/sorry-safari.html')
      }
    }

});
