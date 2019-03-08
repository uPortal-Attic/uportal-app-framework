# Messages (notifications)

This application framework offers messages (notifications) to users.

## Notifications

Notifications are messages about **you** (i.e. the user).

cf.

+ [MyUW Notifications Overview][]
+ [MyUW Notifications Guidelines][]

### Notification bell

On medium and large screens, the top app bar shows a bell icon button. If the
user has unseen notifications, the bell displays a number and shows a preview
window when clicked. "See all" links to the notifications page for a detailed
view.

[![notification bell in top bar](./img/notifications/top-bar-bell.png)](img/notifications/top-bar-bell.png)

On small screens, the mobile menu button shows a small bell icon without a
count.

[![notification bell on mobile](./img/notifications/mobile-bell.png)](img/notifications/mobile-bell.png)

### Mobile menu link

In addition to the bell icon, the mobile menu contains a link to the
notifications page that also displays the number of unseen notifications.

[![mobile menu notifications link](./img/notifications/mobile-link.png)](img/notifications/mobile-link.png)

### Priority notifications

Critical notifications designated "high priority" will appear more prominently,
fixed above the application top bar. When the user has more than one priority
notification, the framework displays a generic message featuring the priority
notifications count and a link to the notifications page.

[![priority notification](./img/notifications/priority.png)](img/notifications/priority.png)

### Notifications page

On the notifications page, users can view, follow calls to action on, and
dismiss their notifications. They can also click the "Dismissed" tab to view
notifications they've previously dismissed. High priority notifications
float to the top of the lists.

## Widget messaging

Widget messaging can be used to give the user a message in a way that interrupts
a user's interaction with a widget.  A dialog appears over the widget allowing
the user to continue after reading the message.  An optional `Learn more` button
 is an opportunity to link to a learn more page.

![widget messaging](./img/notifications/widget-overlay-messaging.png)

[MyUW Notifications Overview]: https://kb.wisc.edu/myuw/71187
[MyUW Notifications Guidelines]: https://docs.google.com/document/d/1xa3t5gibaSgYGtGBKeIt0EGMC9XSMaOwVlgJtMCZ-Vg/edit
