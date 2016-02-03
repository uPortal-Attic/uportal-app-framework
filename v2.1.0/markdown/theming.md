## What we have
+ THEME constant in `frame-config.js`
+ uw-<theme-name>.less file with custom colors (needs work)
+ uw-madison and uw-system themes
+ [Settings page](#/settings) drop down to change theme, only at `$rootScope` level so a page refresh removes that
+ Loading splash screen (could be neater, think Slack loading screen)
+ Loading splash happens every time a page refresh happens

## What we need
+ Persistent themes, through a page refresh (cache please)
+ Theme selection based on user that is logged in (overwritable as a bonus)
+ Themes for all the schools (colors, logo, add less file for compilation during build)

## How we could do it
+ Persistence is simple. When the selection is made, store that result in `$sessionStorage`. Alternatively, we could save it in keyvaluestore, persist across devices. I guess it would depend how taxing the login would be. The loading splash should get out of the way quicker if the theme is already figured out.
+ Theme based on user is interesting. **Approach one**: This will need to happen at the app level, currently its happening in the init of uw-frame. We will need to do a couple things: 1) add a flag (APP_FLAGS) that defaults to false, but lets theme selection overwritable. 2) Add an `app.run` to the `main.js` in `angularjs-portal`'s `my-app/main.js`. This should call the groups API, filter the themes down based on the groups, use the first one. **Approach two**: Take the group API call from notification service and generalize it to misc or something. Add a flag in app-config if you want theme selection based on the group. If set to true, it will do everything listed in approach one. All in `uw-frame`.
+ Themes for all the schools will be interesting. Maybe a great thing for mum-student?