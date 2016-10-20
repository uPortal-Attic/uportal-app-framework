<!DOCTYPE html>
<html lang="en-US" class="respondr">
<head>
  <base href="<%=getServletContext().getContextPath() %>/">
  <link ng-if='portal.theme.name' ng-href="css/themes/{{portal.theme.name}}.css" rel="stylesheet" type="text/css"/>
  <jsp:include page="/head-static.html" />
</head>

<body>

  <jsp:include page="/static.html" />
  <!--The MyUW Body-->
  <uw-body></uw-body>

  <!--javascript-->
  <script type="text/javascript" src="js/config.js"></script>
  <script type="text/javascript" src="js/ga.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.2.0/require.min.js" data-main="main"></script>

</body>
</html>
