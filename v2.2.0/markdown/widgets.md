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
  
### Widget Templates

Generally, widgets should follow one of the following template structures for consistency and maintainability.

#### List of Links Template
To use the list of links template, give the app's entity file a widgetType of 'list-of-links' and provide an object to the widgetConfig with the information for the links. You can provide 1-7 links and the template will display accordingly using the circle-button directive. Sample code for entity file:

```html
<portlet-preference>
      <name>widgetType</name>
      <value>list-of-links</value>
  </portlet-preference>
  <portlet-preference>
    <name>widgetConfig</name>
    <value><![CDATA[{
      "launchText":"Launch talent development",
      "links": [{
          "title":"All courses and events",
          "href":"https://www.ohrd.wisc.edu/home/", 
          icon":"fa-at",
          "target":"_blank"
        },
        {
          "title":"My transcript",
          "href":"https://www.ohrd.wisc.edu/ohrdcatalogportal/LearningTranscript/tabid/57/Default.aspx?ctl=login",
          "icon":"fa-envelope-o",
          "target":"_blank"}]
      }]]></value>
  </portlet-preference>
  
```

#### Search with Links Template
Display a search bar and two links. Here is the sample code:

```html
<portlet-preference>
      <name>widgetType</name>
      <value>search-with-links</value>
    </portlet-preference>
    <portlet-preference>
      <name>widgetConfig</name>
      <value><![CDATA[{
               "actionURL":"https://rprg.wisc.edu/search/",
               "actionTarget":"_blank",
               "actionParameter":"q",
               "launchText":"Go to resource guide",
               "links":[{
                     "title":"Get started",
                     "href":"https://rprg.wisc.edu/phases/initiate/",
                     "icon":"fa-map-o",
                     "target":"_blank"
                  },
                  {
                     "title":"Resources",
                     "href":"https://rprg.wisc.edu/category/resource/",
                     "icon":"fa-th-list",
                     "target":"_blank"
              }]
        }]]></value>
    </portlet-preference>
```

### Text guidelines for widgets
Text inside widgets, including the action button at the bottom, should always be in sentence case, i.e. "See all course services" rather than "See all Course Services". Widget titles should be in title case, i.e. "Course Services".

### Widgets with JSON

Widgets with a JSON service is a great way to have user focused content in your widgets. Here is the steps you have to take to create your custom JSON backed widget.

#### widgetURL

This is where we will get the data from (in a JSON format). If your JSON feed lives outside of the portal, you will need to setup a rest proxy for that. Please contact the MyUW team for details on that. 

```html
<portlet-preference>
  <name>widgetURL</name>
  <value>/portal/p/earnings-statement/max/earningStatements.resource.uP</value>
</portlet-preference>
```

When your widget is rendered, this service is called via a GET, the returned content is stored in the scope variable `content`.

#### widgetType

Setting this to `generic` will enable you to provide your own template. Be sure to evaluate the out of the box widget types before creating your own (documentation on those above).

```html
<portlet-preference>
    <name>widgetType</name>
    <value>generic</value>
</portlet-preference>
```

#### widgetTemplate
This is where the template goes. Suggest using a CDATA tag in here.
```html
<portlet-preference>
        <name>widgetTemplate</name>
        <value><![CDATA[
            <div style='margin : 0 10px 0 10px;'>
               <loading-gif data-object='content' data-empty='isEmpty'></loading-gif>
               <ul class='widget-list'><li ng-repeat=\"item in content.report |orderBy: ['-paid.substring(6)','-paid.substring(0,2)','-paid.substring(3,5)'] | limitTo:3\" class='center'><a href='/portal/p/earnings-statement/max/earning_statement.pdf.resource.uP?pP_docId={{item.docId}}' target='_blank'><i class='fa fa-bank fa-fw'></i> {{item.paid}} Statement</a></li></ul>
               <div ng-if='isEmpty' style='padding: 10px; font-size: 14px;'><i class='fa fa-exclamation-triangle fa-3x pull-left' style='color: #b70101;'></i><span style='color: #898989;'>We had a problem finding your statements (or you don't have any).</span></div>
               <div style='background-color: #EAEAEA; border-radius:4px;padding:10px; margin-top:10px;'>
                  <span class='bold display-block left' style='text-align: left; padding-left: 10px; font-size: 14px;'>See all payroll information for more options:</span> 
                  <ul style='text-align: left;list-style-type: disc; font-size: 12px;'>
                     <li>See all paystubs</li>
                     <li>Tax statements</li>
                     <li>Update direct deposit</li>
                  </ul>
               </div>
            </div>
            <a class='btn btn-default launch-app-button' href='/portal/p/earnings-statement'>See all payroll information</a>
        ]]></value>
    </portlet-preference>
```

#### widgetConfig

The widget config is a JSON object. Please note it has to be valid JSON. I used the <![CDATA[]]> tag so we didn't have to encode everything. Helpful.

Currently we only use the evalString to evaluate emptiness. We may add more in the future.

```html
<portlet-preference>
    <name>widgetConfig</name>
    <value><![CDATA[{ "evalString" : "!$scope.content.report || $scope.content.report.length === 0"}]]></value>
</portlet-preference>
```

By doing just this we were able to generate:

![https://cloud.githubusercontent.com/assets/3534544/6626304/a82c9e2e-c8c3-11e4-9bf0-acdc0fbdd2f5.png](https://cloud.githubusercontent.com/assets/3534544/6626304/a82c9e2e-c8c3-11e4-9bf0-acdc0fbdd2f5.png)
