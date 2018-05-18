# Configuring the About page

The "About" page pulls information from a JSON source to tell users about your app. The page supports plain text
and a list of links.

The data in the JSON source is also used to set the app's "description" and "keywords" `<meta>` tags. 

To direct your app to a JSON source, add the URL to your app's "override.js" file under `SERVICE_LOC.aboutPageURL`. For example:

```javascript
.constant('OVERRIDE', {
  'SERVICE_LOC': {
    'aboutPageURL': 'path/to/source.json'      
  }
}
```

## JSON structure

```json
{
  "description": "MyUW",
  "keywords": "portal, myuw, wisconsin",
  "aboutText": [
    "MyUW is the central hub where the campus community can go to conduct university business and get things done. We help UW work smarter, faster, and safer by providing a secure, personalized platform for easy navigation to services, applications, and resources. In an increasingly complex digital environment, MyUW presents a unified, modern user experience.",
    "MyUW welcomes the opportunity to work with any group, department, or division to get your information in our hub. From something as simple as providing a link to your department’s intranet, to partnering with another development team to create an application for a specific business need, MyUW can help. With over 2 million logins a month and strong campus-wide awareness, MyUW can help you reach your audiences, improve workflow, and provide ease and clarity in a complex digital environment."
  ],
  "aboutLinks": [
    {
      "url": "https://it.wisc.edu/services/myuw/",
      "text": "MyUW service page"
    },
    {
      "url": "https://docs.google.com/a/wisc.edu/forms/d/1h4t8IVveOK-kYQPuZceW9z4ZZiYepUnWD-BE4A58mnE/viewform",
      "text": "Suggest an item for the MyUW app directory"
    }
  ]
}
```

**Attribute breakdown**

- **description**: App description to be used in the description meta tag.
- **keywords**: App keywords to be used in the description meta tag.
- **aboutText**: An array of strings. Each entry in the array will be displayed as a new paragraph.
- **aboutLinks**: An array of link objects. Links can have a URL and text to display, and will appear in a list under the "Useful links" heading.
