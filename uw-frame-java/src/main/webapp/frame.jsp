<!DOCTYPE html>
<html lang="en-US" class="respondr">
<head>
  <base href="<%=getServletContext().getContextPath() %>/">
  <link ng-if='portal.theme.name' ng-href="css/themes/{{portal.theme.name}}.${project.version}.css" rel="stylesheet" type="text/css"/>
  <jsp:include page="/head-static.html" />
</head>

<body>

  <jsp:include page="/static.html" />
  <!--The MyUW Body-->
  <uw-body></uw-body>

  <!--javascript-->
  <script type="text/javascript" src="js/config.js"></script>
  <script type="text/javascript" src="js/ga.js"></script>
  <script type="text/javascript" src="bower_components/requirejs/require.js" data-main="main"></script>

</body>
</html>
