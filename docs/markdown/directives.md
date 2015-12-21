## App Header

This directive should be used for all pages in a frame based page. You can either utilize the frame-page directive, or just this directive with custom code.

#### Template :

```
<app-header
  app-title="Hello World"
  app-icon="fa-google"
  app-action-link-url="/portal/web/layout?action=addPortlet&tabName=UW%20Bucky%20Home&fname=helloWorld"
  app-action-link-icon="fa-globe"
  app-action-link-text="add hello world to home"
  app-option-template="HeyWorldOptionTemplate"
></app-header>
```

#### Params :

**app-title** : The title of this page

**app-icon** : the font awesome icon you want (e.g.: fa-google)

**app-action-link-\*** :
+ url : the url you want, if not set action link hides. 
+ icon: the icon you want for action, default `fa-plus`. 
+ text : the text, default "add to home".

**app-option-template** : The name of the template you want your option drop down to use. if not set, option drop down hidden.

*Demo* : This page is using the app-header directive

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

## Frame Page

_Coming Soon_

