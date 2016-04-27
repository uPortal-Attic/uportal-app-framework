define(['require'], function(require){

    return {
      docHome : {templateUrl: require.toUrl('./partials/doc-home.html')},
      demo : {templateUrl: require.toUrl('./partials/demo.html')},
      md : {templateUrl: require.toUrl('./partials/md.html'), controller: 'MarkdownPageController'}
		}

});
