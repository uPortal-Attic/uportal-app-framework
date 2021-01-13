# Language and typography best practices

## Typography
Defer to the typography specs provided by [Google Material](https://material.google.com/style/typography.html) and
[Angular Material](https://material.angularjs.org/latest/CSS/typography).

## Frame app guidance

### App title

* Your app title (displayed in the app-header directive) should be **30 characters long at most**
* Avoid the word "your"
* Avoid the word "my" unless it’s necessary to differentiate it from another app (e.g. an pp with a list of a student’s courses would be titled “My Courses” because a “Courses” app would be a list of all courses at the university)
* Avoid the word "information" (because there is little that isn't information). This word does not provide any helpful context. For example, instead of "Retirement Information," the title should be "Retirement."

### App Description

* 80 characters max
* Avoid the word “your” (e.g. instead of “view your earnings and tax statements,” use “view earnings and tax statements”)

## Frame notifications

* `title` attribute:
  * Limit to ~140 characters
  * Use general language and avoid pronouns for broadly visible notifications that don't pertain to specific users' needs
  * Use the word "You" when the notification pertains to a specific group of users
* `label` attribute  of action buttons should be 2-3 words at most

See the [notifications documentation](messaging.md#configuring-notifications).

## MyUW-specific language

"MyUW" by itself should never contain spaces. However, "My UW-Madison," "My UW System," etc. are always spaced and hyphenated as written here.
