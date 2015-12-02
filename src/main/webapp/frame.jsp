<!DOCTYPE html>
<html lang="en-US" class="respondr">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
  <meta name="description" content="MyUW"/>
  <meta name="keywords" content="portal, uPortal, academic, higher education, open source, enterprise, JA-SIG, JASIG, Jasig"/>
  <base href="<%=getServletContext().getContextPath() %>/">
  <!-- CSS links -->
  <!-- Latest compiled and minified CSS -->
  <!-- <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css"/> -->
  <link ng-href="css/loading.css" rel="stylesheet" type="text/css"/>
  <link ng-href="css/themes/uw-{{portal.theme.name}}.${project.version}.css" rel="stylesheet" type="text/css"/>
  <link href="my-app/my-app.css" rel="stylesheet" type="text/css"/>
  <link rel="shortcut icon" href="bower_components/uw-ui-toolkit/dist/img/favicon.ico" type="image/x-icon"/>
</head>

<body>
  <!-- Loading state -->
  <div ng-hide="portal.loading.hidden" ng-class="{slowfade: portal.loading.startFade}" style="
          position : fixed;
          top: 0;
          z-index: 2000;
          color: darkgrey;
          background: #EAE8DF;
          height: 100vh;
          width: 100vw;
          text-align: center;
          padding-top: 45vh;
          font-size: xx-large;
          margin: -8px;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
          Loading...</div>
  <!--Bad browser error message-->
  <!--[if lt IE 10]>
  <div class="browserupgrade">
    <span class="fa fa-frown-o"></span>
    <p>Sorry, MyUW beta does not support your browser.<br/><a href="https://kb.wisc.edu/myuw/page.php?id=51345">Learn how to upgrade your browser.</a><br/>Can't upgrade? <a href="http://my.wisc.edu/portal/Login?profile=default">Switch back to MyUW classic.</a></p>
  </div>
  <![endif]-->

  <!--No javascript enabled-->
  <noscript>
      <div class="alert alert-warning alert-dismissible" role="alert" style="margin-bottom:0;">
      <div class="container">
        <i class="fa fa-2x fw fa-exclamation-triangle pull-left"></i>
        <strong>
          Please <a href="http://enable-javascript.com" target="_blank">enable Javascript</a> to interact with all forms and features on our website.  For further assistance, contact the <a href="https://kb.wisc.edu/helpdesk/" target="_blank">DoIT Help Desk</a>.
        </strong>
      </div>
    </div>
  </noscript>

  <!--The MyUW Body-->
  <uw-body></uw-body>

  <!--javascript-->
  <script type="text/javascript" src="js/config.js"></script>
  <script type="text/javascript" src="js/ga.js"></script>
  <script type="text/javascript" src="bower_components/requirejs/require.js" data-main="main"></script>

</body>
</html>
