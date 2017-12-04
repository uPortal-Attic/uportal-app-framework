![beta settings](img/beta-settings.png)

Sometimes you have features in place that are not ready for use by the general public. The beta flag page, `/settings`
by default, is a quick an easy way to create flags to toggle features for your application. These flags are stored in
`localStorage` on the users browser.

To create a new flag, add an entry to the **APP_BETA_FEATURES** array in  `js/override.js` that includes:
- `id`: The id that will be stored in localStorage
- `title`: The text next to the toggle switch
- `description`: A brief description about what will happen if the flag is turned on

Find more information about setting beta flags in the [configuration documentation](configuration.md).
