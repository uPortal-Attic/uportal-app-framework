<%--

    Licensed to Apereo under one or more contributor license
    agreements. See the NOTICE file distributed with this work
    for additional information regarding copyright ownership.
    Apereo licenses this file to you under the Apache License,
    Version 2.0 (the "License"); you may not use this file
    except in compliance with the License.  You may obtain a
    copy of the License at the following location:

      http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.

--%>
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
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.2.0/require.min.js" data-main="main"></script>

</body>
</html>
