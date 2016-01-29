## App Header

`app-header` directive should be used for all pages in a frame based page. You can either utilize the frame-page directive, or just this directive with custom code.

There is also a directive called `app-header-two-way-bind`. This has all the same features as `app-header` except all the scope attributes are passed in via `=` instead of `@`. This provides 2 way binding for your header. Research angular directives for more details.

#### Template :

```
<app-header
  app-title="Hello World"
  app-icon="fa-google"
  app-action-link-url="/go/to/this/url/when/you/click/me"
  app-action-link-icon="fa-globe"
  app-action-link-text="add hello world to home"
  app-option-template="HeyWorldOptionTemplate.html"
  app-fname='hey-world-fname'
  app-add-to-home='false'
></app-header>
```

#### Params :

All params are prefixed with `app-`.

**title** : The title that will be displayed in the header

**icon** : the fa icon that will be used as a prefix to the title (e.g.: fa-github)

**action-link-url** : A URL that you want to goto when the action is clicked (alt to add to home feature)

**action-link-text** : The text for the action link

**action-link-icon** : The fa icon for prefixing the action-link-text. `fa-plus` by default. (e.g.: fa-plus)

**add-to-home** : If set to true, will use the add to home controller instead of the action-link-url. False by default.

**fname** : if provided, it'll use that in the add to home feature. if not, it'll try to use NAMES.fname constant.

**option-template** : the name of the template to inject in the options dropdown. See the `example-page.html` for a good example of it's usage.

## Frame Page

Frame page is basically the app header directive but with a transclude for the body. It **Inherits** all of the app-header directive parameters.

Option Attributes:
**white-background** : A boolean when set to true with give you a white background with 98% width, with a 1% `left-margin`.

#### Template :

```
<frame-page
  app-title="Hello World"
  app-icon="fa-google"
  app-action-link-url="/portal/web/layout?action=addPortlet&tabName=UW%20Bucky%20Home&fname=helloWorld"
  app-action-link-icon="fa-globe"
  app-action-link-text="add hello world to home"
  app-option-template="HeyWorldOptionTemplate.html"
  app-fname="hey-world-fname"
  app-add-to-home='false'
  white-background='true'
>
This part is included via ng-transclude
</frame-page>
```

**Example page** : see `/portal/main/partials/example-page.html`

#### Params :

_See `app-header`_

## Circle Button

Displays a button that looks like a circle with a fa-icon in the middle, and a title below

#### Template :

```html
<circle-button
  data-href=''
  data-target=''
  data-fa-icon=''
  data-disabled='false' data-title=''></circle-button>
```
#### Params:
* **href** : where you want them to go
* **target** : open in new window
* **fa-icon** : the font awesome icon to use
* **disabled** : button disabled or not (can be a variable)
* **title** : (optional) title that is displayed under the circle
* **truncLen** : (optional) length to truncate the title

<a href='#/demo' class='btn btn-flat btn-sm'>See Demo here</a>

## Loading Gif

Shows loading gif when the length of said array is 0 and empty is not set

#### Params:
+ **object** : this is the scope array we are watching to show/hide gif
+ **empty**  : this is the scope boolean flag that you set if the data came back and it was empty
+ **reuse**  : (optional) set to true, it won't destroy the loading gif, just hide it

<a href='#/demo' class='btn btn-flat btn-sm'>See Demo here</a>
