The announcements feature is used to notify users of new content. Read more about the business usage of this feature in [the KB article](https://kb.wisc.edu/myuw/page.php?id=63903). The following documentation talks more about the implementation details of the announcements.

![./img/announcement-character.png](./img/announcement-character.png)

## The Theme
By default, if you set nothing in [the theme](#/md/theming) the character in the image above will show. You can of course provide the `mascotImg` variable in the theme to override this.

## The Image
The image itself should have the following characteristics (see what I did there?):

<div class='row'>
<div class='col-sm-6'>
<div class='width-100'>
![./img/mascot/mascot-w-comments.png](./img/mascot/mascot-w-comments.png)
</div>
</div>
<div class='col-sm-6'>
<ul>
<li>A) height : 40px</li>
<li>B) width : 60px</li>
<li>C) Transparent Background</li>
<li>D) Eye height should be 12px down, so that you can see it during the hidden state.</li>
<li>Can be an animated gif, but animations should be limited to blinking eyes.</li>
</ul>
</div>
</div>

## States

### No new announcements

<div class='width-100'>
![./img/mascot/no-show-mascot.png](./img/mascot/no-show-mascot.png)
</div>

When there are no new announcements the mascot is completely hidden.

### Hidden
![./img/mascot/hidden-mascot.png](./img/mascot/hidden-mascot.png)

This is the initial state if there is at least one unread announcement. This state shows just the top 16px of the character.

### Hidden to Presenting Transition

<div class='width-100'>
![./img/mascot/hidden-to-present.gif](./img/mascot/hidden-to-present.gif)
</div>

This state is triggered when someone mouses over the hidden mascot. It is a quick slide up, and then presents the announcement bubble.

### Presenting
![./img/announcement-character.png](./img/announcement-character.png)

This shows the full mascot image and the text of the short announcement. The user has 3 available actions here.
+ Tell me more : Brings the user to the `/features` page and marks that announcement as read.
+ Not Interested : Marks the announcement as read (which then hides the mascot).
+ Click the Mascot : Which triggers the "Presenting to Hidden Transition" documented below.

### Presenting to Hidden Transition
<div class='width-100'>
![./img/mascot/present-to-hidden.gif](./img/mascot/present-to-hidden.gif)
</div>

If they click the mascot, the mascot transitions to hidden again.
