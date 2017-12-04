![beta settings](img/beta-settings.png)

Sometimes features are ready for inclusion in the product for demonstration and
testing but are not ready for general use. The beta flag page, `/settings`
by default, is a quick and easy way to create flags to toggle features for the
application. These flags are stored in `localStorage` on the users browser.

To create a new flag, add an entry to the **APP_BETA_FEATURES** array in
`js/override.js` that includes:
- `id`: The id that will be stored in localStorage
- `title`: The text next to the toggle switch
- `description`: Brief description about what happens if the flag is turned on

The [configuration documentation][] includes more about setting beta flags.

[configuration documentation]: configuration.md
