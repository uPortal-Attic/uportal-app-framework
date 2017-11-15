# Launch button guidance

The launch button label on a widget should concisely reflect the action a user should expect to take place upon clicking.
For example, clicking on the main button of a widget could:

* View a full list of “To-Dos” or a full checklist
* Launch an application within the portal
* Launch an application outside of the portal, or
* Launch a website outside of the portal

See the [launch-button directive documentation](directives.md#launch-button).

## Suggested button text

To maintain consistent labeling, which is important to user experience, **we strongly suggest widgets use one of the following labels** for
the launch button's `data-button-text` attribute:

* **See all**: Best used when the widget features a list of items (a checklist, a list of headlines, an RSS feed) and clicking on the widget button navigates to a complete list
* **Open website**: For content-based websites and any widgets that link to a static site with an external URL
* **Launch full app**: (Default) Best for task-based applications -- can also be used for any applications that open within the portal and do not meet the criteria of other labels

## Launch buttons and accessibility

_Note: This only applies if you are creating a custom widget. Predefined widget types already include accessibility features._

To ensure launch buttons are accessible to vision-impaired users and other screen reader users, use the `data-aria-label`
to provide additional context that is not communicated by the button's text alone. Aria-labels should be short and should include
only the bare minimum text to communicate what the button does. For example:

If the app's title is "Time and Absence" and the launch-button text is "Launch app," the best aria-label in this case would be "Launch Time and Absence app."

[Read more about how to use aria-labels effectively](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute).

## Custom button text

If one of the suggested labels is not suitable, consider the following guidelines when developing custom button text:

* Choose a clear action verb to describe what will happen when a user clicks the button (e.g. "launch," "open," "go to," "view," and "explore").
* Choose a noun to follow the action verb that accurately describes the thing the user is about to experience (e.g. "website," "app," "list," "feed," "wiki," etc.)
* Limit the button text length to 25 characters (including spaces). This will ensure that all the text is visible on all screen sizes. Text that is too long will be truncated.
* Use the language the intended audience expects to see
* Remember that the button exists in the context of the widget it belongs to. It is not necessary to include the application's title in the button text (save it for the aria-label).
