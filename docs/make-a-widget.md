# Widget types and configuration

Widgets are designed to be flexible - users can accomplish a single task or access a single piece of information, or they can access
a collection of related things that will help them accomplish their task.

Widgets can:

* Provide real-time, continuous info about accounts (e.g. list of pay statements in the Payroll Information widget, Wiscard balance in the Wiscard widget)
* Provide snapshots of information that may impact decisions to take action (e.g. adding money to my Wiscard)
* Support periodic user action (e.g. viewing pay statements)
* Allow users to quickly access pieces of the app to complete key or regular tasks (e.g. Course Services, My Professional Development, Course Guide)
* Provide users with at-a-glance information that represents the main use for the widget (e.g. Weather)

## Basic widgets

The barebones widget provides an app title, a large icon, and a launch button with configurable text. It's a simple link to an app or external URL.

![basic widget](./img/basic-widget.png)

### Basic widget entity files

This code block includes most of the fields needed to configure a widget, but there are additional XML tags (`<portlet-definition>`) you'll need
to create one from scratch. Widgets are app directory entries, so see also [documentation about the app directory][].

```xml
<title>Enrollment</title>
<name>Enrollment</name>
<fname>enrollment-experience</fname>
<desc>Try out the newly redesigned student enrollment experience</desc>
<parameter>
  <name>mdIcon</name>
  <value>fa-university</value>
</parameter>
<parameter>
  <name>alternativeMaximizedLink</name>
  <value>https://enroll.wisc.edu/</value>
</parameter>
<portlet-preference>
  <name>keywords</name>
  <value>enroll</value>
  <value>enrollment</value>
  <value>SOAR</value>
</portlet-preference>
<portlet-preference>
  <name>content</name>
  <readOnly>false</readOnly>
  <value>
    <![CDATA[
      <p>Access the
        <a href="https://enroll.wisc.edu" target="_blank" rel="noopener noreferrer">student enrollment app</a>.
      </p>
    ]]>
  </value>
</portlet-preference>
```

* **title**: The widget title
* **fname**: The technical name of the app entry (lowercase and hyphenated)
* **desc**: Description of the app
  (visible in the widget's contextual menu and on the details page for the app)
  (limit 255 characters)
* **mdIcon** parameter: The widget's icon
* **alternativeMaximizedLink** parameter: An optional parameter to use if your widget links to an external URL
* **keywords** portlet-preference: A list of keywords to expose your widget when users search the app directory
* **content** portlet-preference: A required snippet of static content. If your widget has an alternativeMaximizedLink, this content will never be visible, but it's still required.

The above attributes are all you need to configure a basic widget!

***Notes:***

* *DO NOT USE a `widgetType` portlet-preference if you want a basic widget*
* *Some of these parameters may not be required (ex. mdIcon) when using the predefined widget types described below*
* *The above descriptions are in the context of widgets only. Most entity file attributes have other functions within the portal. Ask your portal development team if you want to know more about entity files.*

# Predefined widget types

+ List of links
+ Search with links
+ RSS widget
+ Action items
+ Time-sensitive-content
+ Switch

## Advantages of widget types

Widget types provide a predefined standard template that can do a lot more than a basic widget while saving you the trouble of creating a custom design.

+ It is less development effort to compose configuration and data for an existing widget type than to develop a novel widget.
+ All defined types come with built-in accessibility features to ensure that screen reader users get the best experience possible.
+ Widget types are maintained as part of the uportal-home product, so usages of these types will less often need developer attention to keep them looking up-to-date and working well.
+ Widget types separate configuration (widgetConfig) and data (backing JSON web service) from the implementation of the markup for the widget (widget type).
+ Widget types are more amenable to automated unit testing than are ad-hoc custom widgets.

## How to use

Follow these steps for each of the predefined widget types described in this doc:

1. Follow the "when to use" guidance to select the widget type that will best suit your needs
2. Add the appropriate `widgetType` value to your app's entity file (see widget type's sample code)
3. Add a `widgetConfig` to your app's entity file (see widget type's sample code)

### List of links

![list of links widget](./img/list-of-links.png)

```xml
<name>widgetType</name>
<value>list-of-links</value>
```

#### When to use `list-of-links`

Use `list-of-links` to present 2 to 6 links, dynamically sourced or statically
configured.

#### Additional `list-of-links` entity file configuration

```xml
<portlet-preference>
  <name>widgetType</name>
  <value>list-of-links</value>
</portlet-preference>
<portlet-preference>
  <name>widgetConfig</name>
  <value>
    <![CDATA[{
      "launchText":"Launch talent development",
      "links": [
        {
          "title":"All courses and events",
          "href":"https://www.ohrd.wisc.edu/home/",
          "icon":"fa-at",
          "target":"_blank"
        },
        {
          "title":"My transcript",
          "href":"https://www.ohrd.wisc.edu/ohrdcatalogportal/LearningTranscript/tabid/57/Default.aspx?ctl=login",
          "icon":"fa-envelope-o",
          "target":"_blank"
        }
      ]
    }]]>
  </value>
</portlet-preference>
```

#### `list-of-links` icons

Preferred: icons are Material Icons, referenced like `invert_colors` (lowercase,
no prefix, underscores in place of spaces. )

Deprecated: icons can be Font Awesome icons, referenced like `fa-envelope-o`
(lowercase, `fa-` prefix, dashes as is typical for Font Awesome references).

Using both Material and Font Awesome icons together can yield visual
misalignment of the link icons.

#### Sourcing `list-of-links` content from a URL

The `list-of-links` content can be stored directly in `widgetConfig`, as above.
This allows managing this data in the portlet registry as a
`portlet-preference`.

Alternatively, the portlet publication can declare a URL from which the actual
links content will be sourced. For dynamic link content:

1. Omit the "links" entry in the widgetConfig JSON.
2. Instead add `"getLinksURL": "true"` in the widgetConfig JSON.
3. Configure the `widgetURL` portlet-preference with the location of the dynamic
content.

Example of how the `widgetURL` should respond (note the `content.links` path):

```json
{
  "content": {
    "links": [
      {
        "href": "https://public.predev.my.wisc.edu",
        "icon": "fa-clock-o",
        "target": "_blank",
        "title": "predev"
      },
      {
        "href": "https://public.test.my.wisc.edu",
        "icon": "fa-calendar-times-o",
        "target": "_blank",
        "title": "Test"
      },
      {
        "href": "https://public.qa.my.wisc.edu",
        "icon": "fa-calendar-times-o",
        "target": "_blank",
        "title": "QA"
      },
      {
        "href": "https://public.my.wisc.edu",
        "icon": "fa-calendar-times-o",
        "target": "_blank",
        "title": "Production"
      },
      {
        "href": "https://it.wisc.edu/services/myuw",
        "icon": "fa-calendar-times-o",
        "target": "_blank",
        "title": "Learn more & make contact"
      }
    ]
  }
}
```

#### Guidance about `list-of-links`

* Setting `suppressLaunchButton` in widgetConfig to a truthy value suppresses
  the launch button at the bottom of the list-of-links widget. This is
  appropriate when there's nothing more to launch, that is, when the
  list-of-links widget presents all the intended links and that's all there is
  to it.
* Avoid using a `list-of-links` widget to display one link.
  Instead, use the name and `alternativeMaximizedLink` of
  [the app directory entry](http://uportal-project.github.io/uportal-home/app-directory)
  to represent the link. This provides a more usable click surface, a simpler
  and cleaner user experience, and achieves better consistency with other
  just-a-link widgets in the portal. The `list-of-links` widget will
  automatically collapse trivial just-one-link widgets to become `basic` widgets
  when it detects the single link and the launch button would link to the same
  place.
* `list-of-links` presents different quantities of links differently. 1 to 4
  links present as `circle-button`s. 5 to 6 links present as a more
  traditional-style list. Zero links presents as a basic widget.
* Use brief sentence-case link titles. `list-of-links` truncates link titles to
  24 characters.

### `search-with-links` widget type

![search with links widget](./img/search-with-links.png)

```xml
<name>widgetType</name>
<value>search-with-links</value>
```

#### When to use `search-with-links`

* Your app has built-in search
* (optional) and you want to display up to 2 links

#### Additional `search-with-links` entity file configuration

```xml
<portlet-preference>
  <name>widgetType</name>
  <value>search-with-links</value>
</portlet-preference>
<portlet-preference>
  <name>widgetConfig</name>
  <value>
    <![CDATA[{
      "actionURL":"https://rprg.wisc.edu/search/",
      "actionTarget":"_blank",
      "actionParameter":"q",
      "launchText":"Go to resource guide",
      "links":[
        {
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
        }
      ]
    }]]>
  </value>
</portlet-preference>
```

#### Guidance about `search-with-links`

+ Use sentence case in the titles of the links.

### `rss` widget type

![rss widget](./img/rss.png)

```xml
<name>widgetType</name>
<value>rss</value>
```

#### When to use `rss`

* You want to display an RSS feed right on your MyUW home page

#### `rss` widget entity file configuration

```xml
<portlet-preference>
    <name>widgetType</name>
    <value>rss</value>
</portlet-preference>
<portlet-preference>
    <name>widgetURL</name>
    <value>/rss-to-json/rssTransform/prop/campus-news</value>
</portlet-preference>
<portlet-preference>
    <name>widgetConfig</name>
    <value>
      <![CDATA[{
        "lim": 4,
        "titleLim": 30,
        "showdate": true,
        "showShowing": true
      }]]>
    </value>
</portlet-preference>
```

* **lim**: The number of items to show. Any number greater than 6 will default to 6 (due to space limitations). Use a smaller number for feeds that are infrequently updated.
* **titleLim**: Limit the length (in characters, including spaces) of feed titles. This number should be between 30 and 60 (depending on whether you're showing dates or not).
When this limit results in truncation, `rss` adds an `md-tooltip` with the full
title.
* **showdate**: T/F show each feed item's published date. The date format is "M/d/yy" (localizable) due to space consideration.
* **showShowing**: T/F Show the "Showing \[x] out of \[y]" message (to communicate that there is more to see). Set this to true if your feed has frequent updates.

#### Guidance about `rss`

Note the additional required value in the entity file:

* **widgetUrl**: The URL of the *JSON representation of the* RSS feed you want to display

The [rssToJson][] microservice is a fine way to convert desired RSS feeds into the required JSON representation.

### `action-items` widget type

![action items widget](./img/action-items.png)

```xml
<name>widgetType</name>
<value>action-items</value>
```

#### When to use `action-items`

Use `action-items` to tell the user how many of specific kinds of things need
their action.

For example, a manager who approves time off could see "5 leave requests" in an
"Approve time and absences" widget.

#### Additional `action-items` entity file configuration

```xml
<portlet-preference>
    <name>widgetType</name>
    <value>action-items</value>
</portlet-preference>
<portlet-preference>
    <name>widgetConfig</name>
    <value>
      <![CDATA[{
        "actionItems": [
          {
            "textSingular": "absence request to approve",
            "textPlural": "absence requests to approve",
            "feedUrl": "example/path/to/absence-request-quantity-feed",
            "actionUrl": "example/path/to/approve/absences"
          }
        ]
      }]]>
    </value>
</portlet-preference>
```

`widgetConfig` for this widget type contains a single key **actionItems** keying
to an array of objects. Each object in the array should have values for each of
four keys.

* **textSingular**: Label shown when the quantity is 1
* **textPlural**: Label shown when the quantity is other than 1. The widget will
  also use this label to describe the problem if there's an error getting the
  quantity, as in "Unable to count {textPlural}." This reads better when
  {textPlural} is a noun phrase, as in "approvals awaiting your attention"
  rather than "approvals await your attention".
* **feedUrl**: The URL to fetch the *JSON representation* of the quantity of
  items needing attention.
* **actionUrl**: The URL where the user can take action for this specific item.
  If no such URL exists, use the same URL as you use for the "See all" launch
  button.

#### Guidance about `action-items`

* If `action-items` is configured with just one indicator and that one indicator
  is failing, `action-items` silently degrades to be a `basic` widget. This is
  to avoid distracting and taunting the user with broken functionality -- in the
  case where the best it can do is offer a single hyperlink, the best it can do
  is offer that single hyperlink as simply and clearly as possible.
* If there are succeeding and failing indicators, `action-items` shows the first
  up to 2 succeding indicators, and an error message telling the user what it
  couldn't count.
* If there are only succeeding indicators, `action-items` shows the first up to
  3 indicators.
* If there are more indicators configured than it can display, it will
  acknowledge it is not showing everything with "Showing {x} of {y}".

The **feedUrl** should return a simple JSON object containing a "quantity" key
with an integer for a value. For example:

```json
  {
    "quantity": 5
  }
```

### `time-sensitive-content` widget type

![benefits enrollment widget](./img/benefits-enrollment-widget.png)

```xml
<name>widgetType</name>
<value>time-sensitive-content</value>
```

#### When to use `time-sensitve-content`

* You want to display a call to action during a defined period of time, and a basic widget the rest of the time.

*Note: This is an experimental widget type and is subject to change*

#### Additional `time-sensitive-content` entity file configuration

```xml
<portlet-preference>
    <name>widgetType</name>
    <value>time-sensitive-content</value>
</portlet-preference>
<portlet-preference>
    <name>widgetConfig</name>
    <value>
      <![CDATA[{
        "callsToAction": [
          {
            "activeDateRange": {
              "templateLiveDate": "09-09",
              "takeActionStartDate": "09-11",
              "takeActionEndDate": "09-18T12:00",
              "templateRetireDate": "09-20T10:00"
             },
             "actionName": "Annual benefits enrollment",
             "daysLeftMessage": "to change benefits",
             "lastDayMessage": "Today is the last day to enroll!",
             "actionButton": {
               "url": "https://www.hrs.wisconsin.edu/psp/hrs-fd/EMPLOYEE/HRMS/c/W3EB_MENU.W3EB_ENR_SELECT.GBL",
               "label": "Enroll now"
             },
             "learnMoreUrl": "https://www.wisconsin.edu/abe/",
             "feedbackUrl": ""
           },
           {
             "activeDateRange": {
               "templateLiveDate": "2017-03-09",
               "takeActionStartDate": null,
               "takeActionEndDate": null,
               "templateRetireDate": "2017-03-19"
             },
             "actionName": "Some other call to action",
             "actionButton": {
               "url": "https://www.google.com",
               "label": "Do the thing"
             },
             "learnMoreUrl": "www.google.com",
             "feedbackUrl": "www.google.com"
           }
         ]
      }]]>
    </value>
</portlet-preference>
```

#### About `time-sensitive-content` entity file values

* **callsToAction**: The containing array for one or more objects with attributes related to making a call to action.
* **activeDateRange**: An object used to determine when to switch to the time-sensitive content, with the following attributes:
  * **templateLiveDate**: The date when the widget should switch from basic content to time-sensitive content. See "Guidance" heading below for suggested formats and options.
  * **takeActionStartDate**: *(optional)* The date when action can be taken. Provide a value if you want the widget to communicate when taking action will be possible (e.g. "Begins September 11th, 2018"). See "Guidance" heading below for suggested formats and options.
  * **takeActionEndDate**: *(optional)* The moment when the action can no longer
    be taken. Required if `takeActionStartDate` is present. After this moment
    and before `templateRetireDate`, the widget communicates when the action
    stopped being available (e.g "Ended September 20th, 2018"). See "Guidance"
    below for suggested formats and options. Works like SAML `NotOnOrAfter`. If
    only a date (and not a time) are provided, interprets this as 00:00, i.e.
    as soon as that date starts. So if for example the last day to execute an
    Annual Benefits Enrollment opportunity is October 26th, `takeActionEndDate`
    should be set to October 27th.
  * **templateRetireDate**: *(optional)* The date when the widget should switch back to displaying basic content. See "Guidance" heading below for suggested formats and options.
* **actionName**: The name of the action users can take (e.g. "Annual benefits enrollment").
* **daysLeftMessage**: *(optional)* The language to display during the countdown of remaining days. The widget will always display "# days left". Provide a value if you want to add text after the default text (e.g. A `daysLeftMessage` with the value "to change benefits" would result in the message: "# days left to change benefits").
* **lastDayMessage**: *(optional)* A special message to display on the last day that taking action is possible. If no value is provided, the widget will show "1 day left" on the last day.
* **actionButton**: An object to configure how the action button appears, with the following required attributes:
  * **url**: The url where a user can take action
  * **label**: The text the button should display
* **learnMoreUrl**: *(optional)* Provide a url if you want the widget to display a link for users to get more information.
* **feedbackUrl**: *(optional)* If set, widget shows a "Give feedback" link
  after `takeActionEndDate` but before `templateRetireDate`.

#### Guidance about `time-sensitive-content`

##### Date formatting  in `time-sensitive-content`

Configured dates **MUST** match one of the following formats:

+ `'YYYY-MM-DD'` (ex. '2017-09-18'): This format specifies 00:00 on a
  year-specific one-time-only date.
+ `'MM-DD'` (ex. '09-18'): This format specifies a recurring date every year,
  again with 00:00 implied. Useful for creating recurring annual cycles in
  `time-sensitive-content` widgets.
+ `'...THH:MM'` (ex. 09-18T10:00): Append the time in hours and minutes to
  either the once-only or the recurring date format to specify a time other than
  00:00

##### How to configure the active date range in `time-sensitive-content`

+ If you want your widget to warn users that they'll be able to take an action in the near future, you must provide dates for both `templateLiveDate` and `takeActionStartDate`. The former date must be *BEFORE* the latter one. If you only want the template to switch content when users can take action, you only need to provide `templateLiveDate`. During the days between the two dates, the widget will display "Begins `takeActionStartDate`".
+ Similarly, if you want the widget to tell users that a period to take action recently ended, you must provide dates for both `takeActionEndDate` (the date when taking the action stopped being possible) and `templateRetireDate` (the date the widget should go back to showing basic content). The former date must be *BEFORE* the latter one. During the days between the two dates, the widget will display "Ended `takeActionEndDate`".
+ If you only want the widget to show time-sensitive content when that content is actionable, you only have to provide dates for `templateLiveDate` and `templateRetireDate`. During the days between the two dates, the widget will display a countdown of days remaining to take action.

### `switch` widget type

```xml
<portlet-preference>
  <name>widgetType</name>
  <value>switch</value>
</portlet-preference>
```

### When to use `switch` widget type

Use the `switch` widget type to dynamically switch between other widget types depending upon the value from an expression on the value read from `widgetUrl`.

For example, suppose there's a flag that indicates an employee's benefits enrollment opportunity status. One value indicates an annual open benefits enrollment group opportunity, another indicates an event-driven personal opportunity, etc. The `switch` widget type could present a `time-sensitive-content` widget to employees eligible for the group annual benefit enrollment opportunity and a `custom` widget to employees with a personal event-driven enrollment opportunity and a `basic` widget to employees with neither opportunity.

#### `switch` widget entity file configuration

In this example, the `switch` reads JSON from a resource URL out of a staff
benefits information portlet. From that JSON it extracts an enrollment flag.
Depending upon the enrollment flag, it switches between a `custom` widget
highlighting the employee's personal benefit enrollment opportunity signalled by
the `H` value of that flag,
a `time-sensitive-content` widget that encourages participation in the annual
benefits enrollment opportunity signalled by the `O` value of that flag,
or it becomes a `list-of-links` widget linking general information about
benefits.

```xml
<portlet-preference>
    <name>widgetType</name>
    <value>switch</value>
</portlet-preference>
<portlet-preference>
    <name>widgetURL</name>
    <value>/portal/p/university-staff-benefits-statement/exclusive/enrollmentFlag.resource.uP</value>
</portlet-preference>
<portlet-preference>
    <name>widgetConfig</name>
    <value>
      <![CDATA[{
        "path": "report[0].enrollmentFlag",
        "cases": [
          {
            "matchValue": "H",
            "widgetType": "custom"
          },
          {
            "matchValue": "O",
            "widgetType": "time-sensitive-content",
            "widgetConfig": {
              "callsToAction": [
                {
                  "activeDateRange": {
                    "templateLiveDate": "09-09",
                    "takeActionStartDate": "09-11",
                    "takeActionEndDate": "09-18T12:00",
                    "templateRetireDate": "09-20T10:00"
                  },
                  "actionName": "Annual benefits enrollment",
                  "daysLeftMessage": "to change benefits",
                  "lastDayMessage": "Today is the last day to enroll!",
                  "actionButton": {
                    "url":
                      "https://www.hrs.wisconsin.edu/psp/hrs-fd/EMPLOYEE/HRMS/c/W3EB_MENU.W3EB_ENR_SELECT.GBL",
                    "label": "Enroll now"
                  },
                  "learnMoreUrl": "https://www.wisconsin.edu/abe/",
                  "feedbackUrl": ""
                },
                {
                  "activeDateRange": {
                    "templateLiveDate": "2017-03-09",
                    "takeActionStartDate": null,
                    "takeActionEndDate": null,
                    "templateRetireDate": "2017-03-19"
                  },
                  "actionName": "Some other call to action",
                  "actionButton": {
                    "url": "https://www.google.com",
                    "label": "Do the thing"
                  },
                  "learnMoreUrl": "www.google.com",
                  "feedbackUrl": "www.google.com"
                }
              ]
            }
          }
        ],
        "defaultCase": {
          "widgetType": "list-of-links",
          "widgetConfig": {
            "links": [
              {
                "title":"Health benefits",
                "href":"https://www.ohrd.wisc.edu/home/",
                "icon":"fa-at",
                "target":"_blank"
              },
              {
                "title":"Other benefits",
                "href":"https://www.ohrd.wisc.edu/ohrdcatalogportal/LearningTranscript/tabid/57/Default.aspx?ctl=login",
                "icon":"fa-envelope-o",
                "target":"_blank"
              }
            ]
          }
        }
      }]]>
    </value>
</portlet-preference>
<portlet-preference>
  <name>widgetTemplate</name> <!-- used in the `custom` case -->
  <value>
    <![CDATA[
      <div style='margin : 0 10px 0 10px;'>
        <div style='background-color: #EAEAEA; border-radius:4px;padding:10px; margin-top:10px;'>
          <span class='bold display-block left' style='text-align: left; padding-left: 10px; font-size: 14px;'>
            You have a personal event-driven benefit enrollment opportunity.
            <a
              href="https://www.hrs.wisconsin.edu/psp/hrs-fd/EMPLOYEE/HRMS/c/W3EB_MENU.W3EB_ENR_SELECT.GBL"
              target="_blank" rel="noopener noreferrer">Exercise it.</a>
          </span>
        </div>
      </div>
      <launch-button
        data-aria-label='Launch benefit information app'
        data-href='/web/exclusive/university-staff-benefits-statement'
        data-target='_self'
        data-button-text='Launch full app'>
      </launch-button>
    ]]>
  </value>
</portlet-preference>
```

The keys in `widgetConfig` for a `switch` widget are

+ `expression`: the expression to evaluate on the returned JSON. The result of
  evaluating the expression should be a value, which value the `switch` widget
  will attempt to match against the `matchValue` of the cases to find a matching
  case.
+ `cases`: cases, an array of objects where in each object the key `matchValue`
  keys to the value that would activate that case
+ `defaultCase`: `switch` will activate this case if the expression did not
  match any of the `matchValue`s of the cases in the `cases[]` array. Optional.
  If not set, defaults to a `basic` widget type with no additional
  `widgetConfig`.
+ {other keys}: The `launchText` key generally honored in `widgetConfig` is
  honored here.

The `defaultCase` object is

+ `widgetType`: the type the widget should become. Any value that would have
  been valid for the `widgetType` `portlet-preference` is valid here. Optional.
  If not set, defaults to a `basic` widget.
+ `widgetConfig`: the configuration for that widget type. Any value that would
  have been valid for the `widgetConfig` `portlet-preference` for that widget
  type is valid here. Overrides {other keys} from the `widgetConfig` for the
  `switch` widget type. So if `launchText` was set at the `switch` level but
  then was also set in a specific activated case, the configuration for the case
  is controlling. Optional. If not set, defaults to no additional widget
  configuration.
+ `widgetUrl`: the URL to call back for some JSON. What widgets use this JSON
  for varies by widget type. Optional. If not set, makes no additional callback
  for dynamic content to feed the activated widget.

When a `switch` widget activates a `custom` type widget, that `custom` widget
reads its `widgetTemplate` as per normal. This means that a `switch` widget can meaningfully support activation of at most one `custom` type widget.

## Other configuration common across widget types

### Launch button text

If you provide a `widgetConfig` with any defined widget type (i.e. not a custom widget) with a value for `launchText`, it will replace the text of the
launch button with the provided value, even for non-widgets. Use sentence case in launch button text.

Read more about the [launch button best practices](widget-launch-button.md).

### Launch button URL

Likewise, `launchUrl` in `widgetConfig` will customize the URL that the launch
bar links to, but *only in the context of the expanded mode widget*. This
overrides the widget `alternativeMaximizedLink`, only in the context of
rendering the expanded-mode widget.

Therefore specifying both `alternativeMaximizedLink` and
`widgetConfig.launchUrl` is a way to configure the app directory entry to launch
to either of two URLs, the `launchUrl` in the context of the expanded mode widget
and the `alternativeMaximizedLink` in all other contexts. The
`alternativeMaximizedLink` could even link to the expanded mode widget.

Like `launchText`, this doesn't automatically work for `custom`-type widgets. A
custom widget template could implement this feature but is not guaranteed to
have done so.

`config.launchUrlTarget` overrides widget `target` like how `config.launchUrl`
overrides widget `alternativeMaximizedLink`.

Neither `launchUrl` nor `launchUrlTarget` have effect in option-link type widgets,
because such widgets dynamically set the launch URL depending upon the option
the user selects.

### Widget messaging

See [documentation about displaying messages over top of widgets](messaging.md#widget-messaging).

### Maintenance mode

Widgets in maintenance mode will display
a message communicating that the app is unavailable and the widget will be disabled (unclickable).

Place widgets into or out of Maintenance mode live via Portlet Administration.
(Edit --> set lifecycle state to Maintenance --> Save).
Only Portal Administrators can do this.

However. Entity import will clobber this live change unless the entity also reflects the change, via

Example:

```xml
<parameter>
  <name>PortletLifecycleState.inMaintenanceMode</name>
  <value>true</value>
</parameter>
```

Widgets in maintenance mode will show a default maintenance message

![widget showing default maintenance message](./img/default-maint-message.png)

unless a custom message is configured in `widgetConfig` as `maintenanceMessage`,

```xml
<portlet-preference>
  <name>widgetConfig</name>
  <value>
    <![CDATA[{
      "maintenanceMessage" : "Entropy has claimed this app."
    }]]>
  </value>
</portlet-preference>
```

![widget showing custom maintenance message](./img/custom-maint-message.png)

## Custom widgets
Using a JSON service is a great way to have user-focused content in your widgets. Here are the steps you have to take to create your custom JSON-backed widget:

### 1. widgetURL
This is where we will get the data from (in a JSON format). If your JSON feed lives outside of the portal, you will need to setup
a rest proxy for that. Please contact the MyUW team for details and assistance.

```xml
<portlet-preference>
  <name>widgetURL</name>
  <value>/portal/p/earnings-statement/max/earningStatements.resource.uP</value>
</portlet-preference>
```

When your widget is rendered, this service is called via a `GET`. The returned content is stored in the scope variable `content`.

### 2. widgetType
Setting this to `custom` will enable you to provide your own custom template. Be sure to evaluate the out of the box widget types
before creating your own (documentation on those above).

```xml
<portlet-preference>
    <name>widgetType</name>
    <value>custom</value>
</portlet-preference>
```

### 3. widgetTemplate
This is where the template goes. We suggest using a CDATA tag here.

```xml
<portlet-preference>
  <name>widgetTemplate</name>
  <value>
    <![CDATA[
      <div style='margin : 0 10px 0 10px;'>
        <loading-gif data-object='content' data-empty='isEmpty'></loading-gif>
        <ul class='widget-list'>
          <li ng-repeat=\"item in content.report |orderBy: ['-paid.substring(6)','-paid.substring(0,2)'] | limitTo:3\"
              class='center'>
            <a href='/portal/p/earnings-statement/max/earning_statement.pdf.resource.uP?pP_docId={{item.docId}}' target='_blank'>
              <i class='fa fa-bank fa-fw'></i> {{item.paid}} Statement</a>
          </li>
        </ul>
        <div ng-if='isEmpty' style='padding: 10px; font-size: 14px;'>
          <i class='fa fa-exclamation-triangle fa-3x pull-left' style='color: #b70101;'></i>
          <span style='color: #898989;'>We had a problem finding your statements (or you don't have any).</span>
        </div>
        <div style='background-color: #EAEAEA; border-radius:4px;padding:10px; margin-top:10px;'>
          <span class='bold display-block left' style='text-align: left; padding-left: 10px; font-size: 14px;'>
            See all payroll information for more options:
          </span>
          <ul style='text-align: left;list-style-type: disc; font-size: 12px;'>
            <li>See all pay stubs</li>
            <li>Tax statements</li>
            <li>Update direct deposit</li>
          </ul>
        </div>
      </div>
      <launch-button data-href='/portal/p/earnings-statement'
                     data-target='_self'
                     data-button-text='Launch full app'
                     data-aria-label='Launch payroll information'></launch-button>
    ]]>
  </value>
</portlet-preference>
```

#### Accessibility guidance

Creating a custom widget means you'll miss out on built-in accessibility features, like aria-labels for screen reader users. We recommend using the `<launch-button>` directive for
you widget launch button, and providing a simple but meaningful value for the `data-aria-label` attribute.

Read more about the [launch button best practices](widget-launch-button.md).

*Note: If you do not use the launch-button directive, please give your launch button a class of "launch-app-button" to ensure it matches other widgets.*

### 4. widgetConfig

The widget config is a JSON object. Please note it has to be valid JSON. We used the <![CDATA[]]> tag so we didn't have to encode everything.

Currently we only use the evalString to evaluate emptiness. We may add more in the future.

```xml
<portlet-preference>
  <name>widgetConfig</name>
  <value><![CDATA[{ "evalString" : "!$scope.content.report || $scope.content.report.length === 0"}]]></value>
</portlet-preference>
```

By doing just this we were able to generate:

![custom widget](./img/custom-widget.png)

## remote-content widgets

The `remote-content` widget type sources a URL for the widget content, allowing
generating the widget content server-side.

```xml
<portlet-preference>
    <name>widgetType</name>
    <value>remote-content</value>
</portlet-preference>
```

```xml
<portlet-preference>
  <name>widgetURL</name>
  <value>/hrs-integration/widgets/benefit-information.html</value>
</portlet-preference>
```

While waiting for the asynchronous request to the `widgetURL`, the
remote-content widget type shows a loading indicator.

The remote content should include the widget launch button if appropriate. The
`remote-content` widget template will not provide a launch button except in the
error case. The widget will use literally the markup responded from the
`widgetURL` as the widget markup.

If the asynchronous request receives an error response, `remote-content` falls
back on rendering as if it were at `basic` widget.

[rssToJson]: https://github.com/UW-Madison-DoIT/rssToJson
[documentation about the app directory]: http://uportal-project.github.io/uportal-home/app-directory.html
