# Glossary

Style note: where entries mention other entries, their first such mention is
*emphasized*.

## announcement

Announcements are a kind of *message* that tell the user about new and improved
experiences available in the portal. They help to set and update user
expectations and may help the user to update their home page to take advantage
of newly available or newly relevant *widgets*.

## message

Message is the generic collection term encompassing *notifications* and
*announcements*. Notfications and announcements are collectively "messages".

This collection term is useful because notifications and announcements share

* sourcing
* some features
* some metadata.

Messages are intended to be portal-wide. Regardless of which uPortal
Application Framework application a user is using within a portal, they have the
same actionable opportunities available via the portal-wide *notification bell*
and the same highlighted new or improved experiences via the announcements
mechanism. In this way messages are

* navigation affordances, helping users to get to the right place to take a
  desired action or experience a new feature.
* discovery affordances, helping users having completed a task in an application
  to discover and navigate to a valuable next task potentially beyond that
  application.

## notification

A notification is the specific kind of *message* communicated via the
*notification bell*. Notifications are intended to notify the user about
actionable opportunities potentially beyond the portal itself and across the
academic, research, outreach, and business processes of the institution.

Notifications are actionable: the user should be able to get to "notification
bell zero" akin to "inbox zero" in addressing all the notifications.

## notification bell

The notification bell is the UI control in the header that indicates how many
*notifications* are currently applicable to a viewing user.

## uPortal

uPortal is

a concrete software product implementing APIs and experiences of a campus
portal. uPortal Application Framework is a development framework for building
user experiences that may in part leverage uPortal on the back end (typically
as mediated by *uPortal-home*).

a community. uPortal Application Framework is developed and adopted in the
context of the uPortal community and is a project in the *uPortal ecosystem*.

## uPortal Application Framework

A front-end application development framework for building user experiences for
delivery in the context of campus portals using *uPortal* (and typically,
*uPortal-home*).

This glossary is in the documentation of the uPortal Application Framework.

## uPortal ecosystem

The uPortal ecosystem is the constellation of various projects and software
products collaboratively developed and optionally adopted in the context of
*uPortal*. uPortal Application Framework and *uPortal-home* are in the uPortal
ecosystem.

## uPortal-home

`uPortal-home` is a specific, concrete application written using the uPortal
Application Framework implementing portal home page functionality.
For example, uPortal-home implements user experiences of a customized and
personalized portal home page, a searchable and browseable directory of apps,
notifications, and announcements.

uPortal-home is intended as the application linked from applications written in
the uPortal Application Framework, to fulfill portal-wide home page, search,
notifications, and announcements needs.

Like uPortal Application Framework, `uPortal-home` is an open source software
product incubating in Apereo in the context of the uPortal escosystem.

Always capitalize and punctuate as uPortal-home.

## Widget

A widget is square tile of static or dynamic content. Constraints and design
guidelines encourage widgets to appear and behave consistently, so that
regardless of the specifics of a particular widget, users of widgets can
understand it.

Typically widgets are associated with app directory entries and users can add
them to their `uPortal-home` home pages. Technically widgets can be implemented
more directly in particular uPortal Application Frmaework applications. (Support
for widgets is included in the framework.)
