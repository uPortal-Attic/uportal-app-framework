MyUW displays a grid of smart widgets on the home page in smart widget mode. You can easily create widgets using the [Widget Creator](https://github.com/UW-Madison-DoIT/myuw-smart-widget-creator). Each widget follows approximately this structure, but widget developers only need to worry about the code inside the widget-body div.

```html
<div class="widget-frame">
    <div class="widget-header">
      <div class='widget-info'>
        <i class="fa fa-info-circle" ... ></i>
      </div>
      <div class='widget-remove'>
        <i class="fa fa-times" ... ></i>
      </div>
      <div class="widget-title">
        <h4>My Course Services</h4>
      </div>
    </div>
    <div class="widget-body">
      <!-- Your widget content here -->
      <a class="btn btn-default launch-app-button">See all</a>
    </div>
  </div>
```

### When to use
Widget template content is a great way to get some content right on the homepage. You can show static content that is the same for all users or show data that is supplied via a json feed from the portal. It is not useful to use widget content to only show a link that directly links to the app. Reserve the widget template for richer displays of content. Also most web proxy portlets are not a good candidate for widget templating. Constructing specific urls for specific users without a json feed is not what the template can do.

<div class="row">
    <div class="col-xs-4">
      <div class="widget-frame" id="portlet-id-">
        <div class="widget-header">
          <div class="widget-info">
            <i title="Info" class="fa fa-info-circle" tooltip="" tooltip-trigger="mouseenter" tooltip-placement="top" tooltip-popup-delay="200"></i>
          </div>
          <div class="widget-remove">
            <i title="Remove" class="fa fa-times portlet-options" ng-click="widgetCtrl.removePortlet(portlet.nodeId, portlet.title)"></i>
          </div>
          <div class="widget-title">
            <h4>My Courses (6)</h4>
          </div>
          <ul class="widget-list">
            <li>
              <p class="bold">General Physics</p>
              <p>M 10:30 ECCR 1203</p>
            </li>
            <li>
              <p class="bold">Introduction to Pottery</p>
              <p>TR 2:30 CS 3223</p>
            </li>
            <li>
              <p class="bold">European Intellectual History</p>
              <p>TR 12:10 BIO 143</p>
            </li>
            <li>
              <p class="bold">Molecular Mechanics</p>
              <p>MWF 8:30 ECCR 1302</p>
            </li>
            <li>
              <p class="bold">Biochemistry</p>
              <p>F 10:15 CHEM 405</p>
            </li>
          </ul>
          <a class="btn btn-default launch-app-button" href="" target="">See all</a>
        </div>
      </div>
      <p>List Template example</p>
    </div>
    <div class="col-xs-4">
      <div class="widget-frame" id="portlet-id-">
        <div class="widget-header">
          <div class="widget-info">
            <i title="Info" class="fa fa-info-circle" tooltip="" tooltip-trigger="mouseenter" tooltip-placement="top" tooltip-popup-delay="200"></i>
          </div>
          <div class="widget-remove">
            <i title="Remove" class="fa fa-times portlet-options" ng-click="widgetCtrl.removePortlet(portlet.nodeId, portlet.title)"></i>
          </div>
          <div class="widget-title">
            <h4>My Courses (6)</h4>
          </div>    
        </div>
        <div class="widget-body widget-grid">
          <div class="row">
            <div class="col-xs-6 center icon-button-div">
               <div class="btn btn-primary rounded icon-button">
                  <a href=""><i class="fa fa-calendar"></i></a>
               </div>
               <p>Link 1</p>
            </div>
            <div class="col-xs-6 center icon-button-div">
               <div class="btn btn-primary rounded icon-button">
                  <a href=""><i class="fa fa-book"></i></a>
               </div>
               <p>Link 2</p>
            </div>
            <div class="col-xs-6 center icon-button-div">
               <div class="btn btn-primary rounded icon-button">
                  <a href=""><i class="fa fa-filter"></i></a>
               </div>
               <p>Link 3</p>
            </div>
            <div class="col-xs-6 center icon-button-div">
               <div class="btn btn-primary rounded icon-button">
                  <a href=""><i class="fa fa-list"></i></a>
               </div>
               <p>Link 4</p>
            </div>
          </div>
        </div>
        <a class="btn btn-default launch-app-button ng-scope" href="/portal/p/course-services">Launch full app</a>
      </div>
      <p>List of Links example</p>
    </div>
    <div class="col-xs-4">
      <div class="widget-frame" id="portlet-id-u29l1n11">
        <div class="widget-header">
          <!-- Widget Chrome -->
          <div class="widget-info">
            <i title="Info" class="fa fa-info-circle" tooltip="View professional development opportunities for faculty and staff on the UW-Madison campus." tooltip-trigger="mouseenter" tooltip-placement="top" tooltip-popup-delay="200"></i>
          </div>
          <div class="widget-remove">
            <i title="Remove" class="fa fa-times portlet-options" ng-click="widgetCtrl.removePortlet(portlet.nodeId, portlet.title)"></i>
          </div>
          <div class="widget-title">
            <h4 class="ng-binding">My Professional Development</h4>
          </div>
        </div>
        <div ng-if="'GENERIC' === widgetCtrl.portletType(portlet)" class="ng-scope">
          <div ng-controller="GenericWidgetController as genericWidgetCtrl" class="ng-scope">
              <content-item><div id="portlet-id-u29l1n11" class="ng-scope"><div><div class="widget-body widget-grid"><form action="http://www.myprofdev.wisc.edu/portal/portal_login.asp" class="ng-pristine ng-valid"><div class="input-group"><input type="text" name="searchtext" class="form-control" placeholder="Search courses and events"><span class="input-group-btn"><button class="btn btn-primary" type="button"><i class="fa fa-search"></i></button></span></div></form><div class="row"><div class="col-xs-6 icon-button-div"><div class="btn btn-primary rounded icon-button"><a href="http://www.myprofdev.wisc.edu/default.asp"><i class="fa fa-book"></i></a></div><p>All courses and events</p></div><div class="col-xs-6 icon-button-div"><div class="btn btn-primary rounded icon-button"><a href="http://www.ohrd.wisc.edu/ohrdcatalogportal/LearningTranscript/tabid/57/Default.aspx?ctl=login"><i class="fa fa-envelope-o"></i></a></div><p>My transcript</p></div></div></div><a class="btn btn-default launch-app-button" href="/portal/f/u29l1s4/p/my-professional-development.u29l1n11/max/render.uP" target="">Launch full app</a></div></div></content-item>
          </div>
        </div>
      </div>
      <p>Search with links example</p>
    </div>

  </div>

### Text guidelines for widgets
Text inside widgets, including the action button at the bottom, should always be in sentence case, i.e. "See all course services" rather than "See all Course Services". Widget titles should be in title case, i.e. "Course Services".
