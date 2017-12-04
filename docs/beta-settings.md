![beta settings](img/beta-settings.png)

Sometimes features are ready for inclusion in the product for demonstration and testing but are not ready for general use. The beta flag page, `/settings`
by default, is a quick and easy way to create flags to toggle features for the application. These flags are stored in
`localStorage` on the users browser.

To create a new flag, add an entry to the **APP_BETA_FEATURES** array in  `js/override.js` that includes:
- `id`: The id that will be stored in localStorage
- `title`: The text next to the toggle switch
- `description`: A brief description about what will happen if the flag is turned on

Find more information about setting beta flags in the [configuration documentation](configuration.md).
