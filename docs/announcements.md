# Announcements in uw-frame

Within-portal announcements draw attention to new content.

MyUW [documents how it uses announcements](https://kb.wisc.edu/myuw/page.php?id=63903) in its Knowledge Base.

## The mascot announcer

A mascot in the header can make announcements.

The `mascotImg` variable in [the theme](theming.md) sets the theme-specific mascot.

If `mascotImg` is unset, `uw-frame` defaults to a generic robot mascot.

![default mascot image](./img/announcement-character.png)

### Creating a mascot image

The image itself should have the following characteristics:

![./img/mascot/mascot-w-comments.png](img/mascot/mascot-w-comments.png)

+ A. Height of always-visible portion: 16px from top
+ B. Eye height: 12px from top, so that you can see them during the hidden state.
+ C. Full height : 40px
+ D. Full width : 60px
+ E. Transparent background

*Note*: The mascot image can be an animated gif, but animations should be limited to e.g. blinking eyes to achieve subtle presence without excessive distraction.

## States

### No new announcements

When there are no new announcements the mascot is completely hidden.

### Initial state

When there is at least one new announcement, the mascot will appear in the top bar but will be mostly hidden:

![mascot initial state](./img/mascot/hidden-mascot.png)

### Hover state

This state triggers when someone mouses over the hidden mascot. The mascot slides up a little bit and shows a tooltip inviting
the user to click to see more:

![mascot hover state](./img/mascot/hover-mascot.png)

### Clicked state

If the mascot is clicked while in hidden/hover state, it will slide up and the announcements will show:

![mascot clicked state](./img/mascot/presenting-mascot.png)

If clicked again while in this state, the mascot will slide back down to the initial state. If all the announcements are dismissed, the mascot will disappear.

### Announcements Exercise

To try announcements, switch the [announcements enabled to true](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/js/app-config.js#L36)
and the [group filtering flag to true](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/js/app-config.js#L37).

Next, add a sample announcement

try adding this announcement to the sample feed

```json
  {
    "id": 4,
    "title": "My first feature announcement",
    "description": "A trial of uPortal-Home's features",
    "learnMoreURL": "",
    "groups" : ["Everyone"],
    "goLiveYear": 2017,
    "goLiveMonth": 5,
    "goLiveDay": 1,
    "isBuckyAnnouncement" : true,
    "buckyAnnouncement" : {
      "shortTitle" : "Check out a sample announcement",
      "shortDesc" : "This is a sample announcment",
      "endDate" : "2017-08-31"
    }
  }
```

Try making it a pop up feature too.  
