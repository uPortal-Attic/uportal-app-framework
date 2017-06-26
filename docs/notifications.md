# Notifications in uw-frame

## User-facing content

When you create a notification for uw-frame, its content will be displayed to users in a number of ways.

### Notification bell

On medium and large screens, a bell icon button containing the number of unseen notifications appears in the application's top bar. Clicking the button
brings users to the notifications page for a more detailed view.

[![notification bell in top bar](./img/notifications/top-bar-bell.png)](img/notifications/top-bar-bell.png)

On small screens, a small bell icon without the notification count appears on top of the mobile menu button.

[![notification bell on mobile](./img/notifications/mobile-bell.png)](img/notifications/mobile-bell.png)

### Mobile menu link

In addition to the bell icon, the mobile menu contains a link to the notifications page that also displays the number of unseen notifications.

[![mobile menu notifications link](./img/notifications/mobile-link.png)](img/notifications/mobile-link.png)

### Priority notifications

For critical notifications that require a higher degree of visibility, notifications can be designated as "priority" and will appear more prominently, fixed above the
application top bar. In cases when the user has more than one priority notification to view, a generic message will be displayed, featuring the priority notifications
count and a link to the notifications page.

[![priority notification](./img/notifications/priority.png)](img/notifications/priority.png)

### Notifications page

On the notifications page, users can view their notifications, dismiss them, and follow calls to action. They can also click the
'Dismissed' tab to view notifications they've previously dismissed.

Priority notification float to the top of the list and appear with a small icon to the left of the notification's content.

[![notifications page](./img/notifications/notifications-page.png)](img/notifications/notifications-page.png)

## Technical implementation

Notifications depend on a JSON feed containing certain attributes and flags. See the [configuraton](configuration.md) doc for information about how to
point uw-frame to your desired feed.

### Example notification

*Note: All notifications must be contained within the `notifications` array.*

```json
{
  "notifications": [
    {
      "id": 1,
      "groups" : ["Users - Service Activation Required"],
      "title"  : "You need to modify your NetID account to activate essential UW Services.",
      "actionURL" : "https://www.mynetid.wisc.edu/modify",
      "actionAlt" : "Activate Services",
      "dismissable" : true,
      "priority" : false,
      "dataURL" : "/restProxyURL/unactivatedServices",
      "dataObject" : "services",
      "dataArrayFilter" : {"priority":"essential", "type":"netid"}
    }
  ]
}
```

**Attribute breakdown**

- **id**: A unique number to identify the notification. This is used for tracking dismissed/un-dismissed state as well as the sort order on the notifications page.
- **groups**: An attribute to optionally show notifications only to specific groups (ex. Manifest groups, uPortal groups). **Must contain at least one value**. Using the "Everyone" group will make
your notification visible to all users. Contact your portal development team for more information about group filtering.
- **title**: The text to be displayed as the notification's main content. **Best practices:**
    - Be concise! Try to limit your notification's title to ~140 characters. Shorter titles improve click-through and are less likely to cause display issues on smaller screens.
    - Use general language and avoid pronouns for broadly visible notifications that don't pertain to specific users' needs (ex. "City of Madison - Declared Snow Emergency").
    - Use the word "You" when the group filtering for a notification is somewhat specific (i.e. Users with unactivated accounts).
- **actionURL**: A URL where users can get more information or respond to calls to action.
- **actionAlt** (*optional*): Applies an aria-label to the notification title. Use this if vision-impaired users might need additional context to understand your notification.
- **dismissable**: Set to true if users should be able to dismiss the notification from their list. This also works for dismissing priority notifications from their fixed position above the top bar.
This should almost always be true.
    - **Example "false" use case**: In some cases, following through on a notification's call to action could result in that notification going away on its own. For example, you may have a notification only visible to a group called
    "Users - Account Activation Required," which calls on those users to activate their accounts. Upon following through, a user would be removed from that group and the notification would be no longer visible. In this example, the call
     to action is reasonably important, and the notification should stick around until the user takes the desired action.
- **priority**: Set to true if the notification is of critical importance. The visibility of the notification will be amplified throughout the UI. **This feature should be used sparingly.**
- **dataURL** (*optional*) : Will retrieve the data from the dataURL.  If data exists, will show notification to user, if data does not exist, will not show notification.  Only supports JSON.  You would use this feature if you want to only show the notification if the user has data.  For example, only show user if they have a certain document.
- **dataObject** (*optional*) : Will only be looked at if `dataURL` is present, otherwise ignored.  Used as an optional further refinement from dataURL, if you want the notification to show only if the specific object is in the data.
- **dataArrayFilter** (*optional*) : Will only be looked at if `dataURL` is present, otherwise ignored.  Used as an optional further refinement from dataURL.  If your object return is an array, you can filter on the array.  Does support multiple filtering criteria as shown in the example.  If used in conjunction with `dataObject`, will filter to `dataObject` first.  [AngularJS array filtering documentation] (https://docs.angularjs.org/api/ng/filter/filter)

### Action buttons

If your notification would lead to a page with more links or calls to action, you can save your users some clicks by adding the `actionButtons` attribute to its configuration.
Action buttons can also be used to call more attention to the `actionURL`.


```json
{
  "id": 1,
  ...
  ...
  "actionButtons" : [
    {"label": "Take survey", "url": "/example/survey", "target": ""},
    {"label": "Learn more", "url": "/example/learnMore", "target": "_blank"}
  ]
}

```

**Action button attributes**

- **label**: Text to display. This should be limited to a maximum of three words.
- **url**: A url for the action
- **target** (*optional*): The `target` attribute for the button's `<a>` tag (ex. "_blank", "_self", etc)

### Notification Exercise
Follow these steps to create a notification.

1. Add a notification to
[uw-frame-components/staticFeeds/notifications.json](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/staticFeeds/notifications.json)

you can use this json

```json
{
  "id": 1,
  "groups" : ["Everyone"],
  "title"  : "Learn how to create a notification",
  "actionURL" : "http://uw-madison-doit.github.io/uw-frame/notifications.html",
  "actionAlt" : "notification documentation",
  "dismissable" : true,
  "priority" : false
}
```

the file will look similar to this

```json
{"notifications" :
    [
        {
          "id": 1,
          "groups" : ["Everyone"],
          "title"  : "Learn how to create a notification",
          "actionURL" : "http://uw-madison-doit.github.io/uw-frame/notifications.html",
          "actionAlt" : "notification documentation",
          "dismissable" : true,
          "priority" : false
        }
    ]
}
```
2. [Start frame](quickstart.md)

3. Try changing some of the options like making it a priority notification
or undismissable