There are a lot of frame features that we will highlight in this document.

### Header

![image of header](img/header.png)

#### Crest
The crest is specified as part of the theme. Checkout [theming](#/md/theming) for more details
#### Search Bar
The search bar is enabled by default but can be turned off via [the configuration](#/md/confiration). By default the search will go to the MyUW search result page with the filter specified in the input. We highly recommend you don't modify this behavior as it can be confusing for users.

#### Username and drop down
![user menu](img/user-menu.png)

The username drop down will display the users first name with a down arrow carrot (hinting there is a menu there). The menu shows the users full name, a link to settings if they have that flag set, and a sign out link.

#### Mobile Menu
`TODO`
#### Mascot Announcements
`TODO`

See also [MyUW KB documentation about announcements](https://kb.wisc.edu/myuw/page.php?id=63903).

#### Notifications
The notifications are a pretty complicated topic. The basics are a bell with unread count, priority notification banner, mobile notification bell on the hamburger menu, and in the mobile menu a notification link with unread count. Since this is so much we split out [the documentation](#/md/notifications) to its own thing.

### Footer
#### Server Information
`TODO`
#### Footer Links
`TODO`

### Beta Settings
![beta-settings](img/beta-settings.png)

Sometimes you have features that exist, but they are not ready for the general public. The beta flag page, `/settings` by default, is a quick an easy way to create flags to toggle features for your application. These flags are stored in `localStorage` on the users browser. You can configure additional setting flags in the configuration. Check out [that documentation](#/md/configuration) for more details.

### Frame Specific Directives
See the [directive documentation](#/md/directives).
