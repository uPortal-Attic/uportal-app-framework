### Initial Landing Before Shib Authorization
<div class='center'>
![http://goo.gl/hqaa6o](http://goo.gl/hqaa6o)
</div>
+ Redirect to login.wisc.edu. (This should be configured at the apache layer in most cases.)
+ After auth, redirect to the original destination. Note that shib removes # so your app should use HTML5 mode.
+ If the application has a public state, show this with notice that you can login to see personalize content.

### Initial Landing After Shib Authorization
<div class='center'>
![http://goo.gl/Y7BqZ1](http://goo.gl/Y7BqZ1)
</div>
+ Check if user has access on initial landing (easy security check server side).
+ Don’t automatically redirect an unauthorized user, because the lack of context creates confusion.
+ Present “access denied” page. If it’s an application, include the header to provide context. If applicable, this will include a link to the app’s directory page or service’s website. Otherwise, the default will have a link back to the user’s MyUW homepage.
+ If a user session has timed out when hitting a service, redirect the user to authenticate via login.wisc.edu.

### What really makes your application secure
+ Applying access control on the backing JSON web services themselves.
+ Making the UI reflect lack of access provides a better user experience to unauthorized users.
+ Making the backing JSON web services require authorization prevents unauthorized users from doing things they are not authorized to do.