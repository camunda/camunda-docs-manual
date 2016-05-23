---

title: 'Configuration'
weight: 70

menu:
  main:
    identifier: "webapps-tasklist-configuration"
    parent: "webapps-tasklist"

---


You can override the default configuration of Tasklist using a central configuration file
located in `app/tasklist/scripts/config.js`. Currently, the following configuration options are
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
"dateFormat": {
  "monthName": "MMM",
  "long":   "LLLL"
}
```


# Localization

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
"locales": {
  "availableLocales": ["en", "de"],
  "fallbackLocale": "en"
}
```

To create a new localization for Tasklist, copy the provided language file, translate it and
save it as new localization file with the corresponding language code. To make the new translation
available, add it to the list of available locales in the configuration file.


# Custom Scripts

If you want to add scripts (to add new [AngularJS](https://angularjs.org) directives or
other libraries) you should add a `customScripts` property to the `app/tasklist/scripts/config.js`
file with something like this:

```javascript
var camTasklistConf = {
  // …
  customScripts: {
    // names of angular modules defined in your custom script files.
    // will be added to the 'cam.tasklist.custom' as dependencies
    ngDeps: ['my.custom.module'],

    // RequireJS modules to load.
    deps: ['custom-ng-module'],

    // RequreJS path definitions
    paths: {
      'custom-ng-module': '../custom-ng-module/script'
    }
  }
};
```
This includes a `custom-ng-module/script.js` file. The path is relative to the
`app/tasklist/scripts` folder in the Camunda webapp .war file.

**Note:** The content of the `customScripts` property will be treated as a
[RequireJS configuration](http://requirejs.org/docs/api.html#config) except for the
`nodeIdCompat` and `skipDataMain` which are irrelevant and `deps` which will be used like:

```javascript
require(config.deps, callback);
```


In your scripts, you can add a controller and directive like this:

```javascript
'use strict';
define('custom-ng-module', [
  'angular'
], function (angular) {
  // define a new angular module named my.custom.module
  // it will be added as angular module dependency to builtin 'cam.tasklist.custom' module
  // see the config.js entry above
  var customModule = angular.module('my.custom.module', []);

  // …so now, you can safely add your controllers…
  customModule.controller('customController', ['$scope', function ($scope) {
    $scope.var1 = 'First variable';
    $scope.var2 = 'Second variable';
  }]);

  // …directives or else.
  customModule.directive('customDirective', function () {
    return {
      template: 'Directive example: "{{ var1 }}", "{{ var2 }}"'
    };
  });

  // it is not necessary to 'return' the customModule but it might come handy
  return customModule;
});
```

And finally, in your UI or embedded forms, you can use the new features like this:

```html
<div ng-controller="customController">
  <div custom-directive> - (in this case; will be overwritten) - </div>
</div>
```

# Shortcuts

If you want to change the keyboard shortcuts for certain tasklist operations, you can change the key-combination and the description of the shortcuts in the `shortcuts` section of the config file.

Removing an existing entry from the list will disable this shortcut (you can still perform the operation normally within the tasklist, i.e. removing the _Claim Task_ shortcut will not remove the ability to claim a task either with the mouse or with the normal keyboard navigation).

You can also add additional shortcuts. If you do so, whenever the user presses the registered combination of keys, an angular event in the form of `shortcut:{{nameOfShortcut}}` will be broadcasted across the application. A Tasklist plugin can then react to this event.


# Logo and Header Color

To change visual aspects of Tasklist, you can edit the user stylesheet file located in
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
// …
app: {
  name: 'Todos',
  vendor: 'Company'
},
// …
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
