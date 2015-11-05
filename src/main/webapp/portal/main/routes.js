define(['require'], function(require) {

    return {
      main : {
        templateUrl: require.toUrl('./partials/main.html')
      },
      
      accessDenied: {
        templateUrl: require.toUrl('./partials/access-denied.html')
      }
      
    }

});

