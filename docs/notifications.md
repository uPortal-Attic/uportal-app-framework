The notifications are a pretty complicated topic. The basics are a bell with unread count, priority notification banner, mobile notification bell on the hamburger menu,
and in the mobile menu a notification link with unread count.

# Notifications in uw-frame

## User-facing content

When you create a notification for uw-frame, its content will be displayed to users in a number of ways.

### Notification bell

On medium and large screens, a bell icon button containing the number of unseen notifications appears in the application's top bar. Clicking the button
brings users to the notifications page for a more detailed view.

[screenshot]

On small screens, a small bell icon without the notification count appears on top of the mobile menu button

[screenshot]

### Mobile menu link

In addition to the bell icon, the mobile menu contains a link to the notifications page that also displays the number of unseen notifications.

[screenshot]

### Priority notifications

For critical notifications that require a higher degree of visibility, notifications can be designated as "priority" and will appear more prominently, fixed above the
application top bar.

[screenshot]

### Notifications page

On the notifications page, users can view their notifications, dismiss them, and follow calls to action. They can also click the
'Dismissed' tab to view notifications they've previously dismissed.

Priority notification float to the top of the list and appear with a small icon to the left of the notification's content.

[screenshot]

## Technical implementation

Notifications depend on a JSON feed containing certain attributes and flags. See the [configuraton]() doc for information about how to
point uw-frame to your desired feed.

### Example notification

```JSON

```

### Priority notifications

For a notification to appear

### Action buttons


```JSON

```




