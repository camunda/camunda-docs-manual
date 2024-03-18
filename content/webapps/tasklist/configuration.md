---

title: 'Configuration'
weight: 70

menu:
  main:
    identifier: "webapps-tasklist-configuration"
    parent: "webapps-tasklist"

---


You can override the default configuration of Tasklist using a central configuration file
located in `app/tasklist/scripts/config.js`. The following configuration options are
available:

# Date Format

Dates can be configured by specifying a `dateFormat` object. The values of the properties of this
object must be strings representing date formats in accordance with
[moment.js](http://momentjs.com). Following date formats are used within Tasklist:

* `monthName` represents the name of a month (e.g., January).
* `day` represents the number of a day in a month (1..31).
* `abbr` represents a short format of a date including time.
* `normal` represents the standard format of a date including time.
* `long` represents a verbose format of a date including time and day of the week.
* `short` represents a short format of a date excluding time.


## Example

```javascript
export default {
  // …
  "dateFormat": {
    "monthName": "MMM",
    "long":   "LLLL"
  }
}
```


# Localization

Tasklist can be localized. Camunda maintains English and German translation files. 
You can find and download community maintained translation files at the [Camunda webapp translations repository](https://github.com/camunda/camunda-webapp-translations).

The localization of Tasklist is contained in the `app/tasklist/locales/` directory. This
directory contains a separate localization file for every available language. The file name
consists of the language code and the suffix `.json` (e.g., `en.json`).

Tasklist uses a locale file corresponding to the language settings of the browser. You can
set the `availableLocales` property in the configuration file to provide a list of available
locales. Every locale which is contained in this list must have a locale file in the `locales`
directory with the corresponding language code.

If the browser uses a language which is not available, Tasklist uses the locale which is
defined via the `fallbackLocale` property in the configuration file:

```javascript
export default {
  // …
  "locales": {
    "availableLocales": ["en", "de"],
    "fallbackLocale": "en"
  }
}
```

To create a new localization for Tasklist, copy the provided language file, translate it and
save it as new localization file with the corresponding language code. To make the new translation
available, add it to the list of available locales in the configuration file.


# Custom Scripts

Tasklist allows you to include arbitrary JavaScript files. This allows you to extend Tasklist with custom code. The script file might contain a 
custom frontend module. Tasklist shares the frontend module structure with [Cockpit Plugins]({{<ref "/webapps/cockpit/extend/plugins.md#structure-of-a-frontend-module" >}}).

Add your files to the `customScripts` property of the `app/tasklist/scripts/config.js` file:

```javascript
export default {
  // …
  customScripts: 
    ['custom-module/module.js']
}
```
This includes a `custom-module/module.js` file. The path is relative to the `app/tasklist` folder in the Camunda webapp .war file.

You can find a complete example about how to use `customScripts` to develop a Tasklist Plugin in the [Camunda 7 examples repository](https://github.com/camunda/camunda-bpm-examples/tree/master/tasklist/cats-plugin).



# Shortcuts

If you want to change the keyboard shortcuts for certain tasklist operations, you can change the key-combination and the description of the shortcuts in the `shortcuts` section of the config file.

Removing an existing entry from the list will disable this shortcut (you can still perform the operation normally within the tasklist, i.e. removing the _Claim Task_ shortcut will not remove the ability to claim a task either with the mouse or with the normal keyboard navigation).

You can also add additional shortcuts. If you do so, whenever the user presses the registered combination of keys, an angular event in the form of `shortcut:{{nameOfShortcut}}` will be broadcasted across the application. A Tasklist plugin can then react to this event.


# Logo and Header Color

You can change the visual aspects of Tasklist. The user stylesheet file is located in
`app/tasklist/styles/user-styles.css`. This file contains CSS which is loaded into Tasklist
and can override the standard styles.

```css
.navbar-brand {
  /* hides the "Camunda Tasklist" text */
  text-indent: -999em;
  /* put your logo */
  background-image: url(./path/to/the/logo.png);
  /* sets the width to match the logo's width */
  width: 80px;
}

/* changes the header bottom border color  */
[cam-widget-header] {
  border-bottom-color: blue;
}
```

**Note:** you can also change the app name (*Tasklist*) and vendor (*Camunda*)
by changing the `app/tasklist/scripts/config.js` configuration file as follow:

```js
export default {
  // …
  app: {
    name: 'Todos',
    vendor: 'Company'
  }
}
```

# Change CSRF Cookie Name

The default name of the CSRF Cookie is `XSRF-TOKEN`. When using other applications within the
same-origin, the CSRF mechanisms could interfere with each other. To avoid the name conflict, you
can change the name of the CSRF cookie in the `config.js` file as follows:
```javascript
export default {
  // …
  csrfCookieName: 'MY-XSRF-TOKEN'
}
```

**Note:** Please make sure to change the CSRF cookie name also on [server-side]({{<ref "/webapps/shared-options/csrf-prevention.md#cookie-name" >}}).

# Disable Welcome Message for new Users

First-time visitors are shown a message directing them to the camunda welcome page. If you do
not want this message to be shown, you can disable it by adjusting the `config.js` as follows:
```javascript
export default {
  // …
  disableWelcomeMessage: true
}
```

**Note:** This does only affect the Tasklist login page. For other webapps, you need to adjust the corresponding config file as well.

# Assign Process Instance Id to Task Comments

When creating a Task Comment, the process instance ID is not assigned by default. 
Queries for comments by process instance ID will not include those comments. 
When you set the flag `assignProcessInstanceIdToTaskComment` to `true`, Tasklist assigns both the task id 
and the process instance id to newly created Task Comments. This allows you to query Task Comments by 
process instance id and by task id.

```javascript
export default {
  // …
  assignProcessInstanceIdToTaskComment: true
}
```

# Advanced Styles Customization

In addition to the basic `user-styles.css` file, you can edit the source style- and layout files
using [less](http://lesscss.org/) to change the overall appearance of Tasklist.

If you want to customize the interface with `less`, you should probably start by having a look
at the variables defined in the following files:

 - `node_modules/camunda-commons-ui/node_modules/bootstrap/less/variables.less`
   defines the original Bootstrap variables
 - `node_modules/camunda-commons-ui/resources/less/cam-variables.less`
   overrides some Bootstrap variables (above) and add some custom ones

## Compiling with Grunt

From within the `camunda-bpm-webapp` directory:

```sh
grunt build:tasklist
```

The command will build the frontend assets (of Tasklist), styles included.
