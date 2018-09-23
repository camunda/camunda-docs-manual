---

title: 'Configuration'
weight: 10

menu:
  main:
    identifier: "user-guide-cockpit-configuration"
    parent: "user-guide-cockpit-extend"

---


# Logo and Header Color

To change visual aspects of Cockpit, you can edit the user stylesheet file located in
`app/cockpit/styles/user-styles.css`. This file contains CSS which is loaded into Cockpit
and can override the standard styles.

```css
.navbar-brand {
  /* hides the "Camunda Cockpit" text */
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
# Localization

The localization of Cockpit is contained in the `app/cockpit/locales/` directory. This
directory contains a separate localization file for every available language. The file name
consists of the language code and the suffix `.json` (e.g., `en.json`).

Cockpit uses a locale file corresponding to the language settings of the browser. You can
set the `availableLocales` property in the configuration file to provide a list of available
locales. Every locale which is contained in this list must have a locale file in the `locales`
directory with the corresponding language code.

If the browser uses a language which is not available, Cockpit uses the locale which is
defined via the `fallbackLocale` property in the configuration file:

```javascript
"locales": {
  "availableLocales": ["en", "de"],
  "fallbackLocale": "en"
}
```

To create a new localization for Cockpit, copy the provided language file, translate it and
save it as new localization file with the corresponding language code. To make the new translation
available, add it to the list of available locales in the configuration file.

# Custom Scripts

If you want to add your own scripts to the Cockpit application, you should add a `customScripts` property to the `app/cockpit/scripts/config.js`
file with something like this:

```javascript
var camCockpitConf = {
  // …
  customScripts: {
    // names of angular modules defined in your custom script files.
    // will be added to the 'cam.cockpit.custom' as dependencies
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
`app/cockpit` folder in the Camunda webapp .war file.

**Note:** The content of the `customScripts` property will be treated as a
[RequireJS configuration](http://requirejs.org/docs/api.html#config) except for the
`nodeIdCompat` and `skipDataMain` which are irrelevant and `deps` which will be used like:

```javascript
require(config.deps, callback);
```

You can find a complete example about how to use `customScripts` to develop a Cockpit Plugin in the [Camunda BPM examples repository](https://github.com/camunda/camunda-bpm-examples/tree/master/cockpit/js-only-plugin).

# BPMN Diagram Viewer (bpmn.js)

The diagram viewer (bpmn.js) can be either customized by moddle extensions or 
[additional modules](https://bpmn.io/toolkit/bpmn-js/walkthrough/#extend-the-modeler). To extend the BPMN diagram viewer 
of Cockpit, a `bpmnJs` property must be added to the `app/cockpit/scripts/config.js` file.

## Additionl Modules
To add modules, the `additionalModules` property needs to be specified, where each module has a unique name (key) and a 
path (value) to the JavaScript file of the module. The path is relative to the `app/cockpit` folder in the .war file of
the Camunda Webapp. The suffix `.js` of the file is added automatically and must not be specified.

```json
...
bpmnJs: {
  additionalModules: {
    myCustomModule: 'my-custom-module/module'
  }
}
...
```

## Moddle Extensions
The BPMN moddle can be extended by adding a `moddleExtensions` property. Each moddle extension has a unique name (key) 
and a path (value) to the JSON file of the moddle extension. The path is relative to the `app/cockpit` folder in the 
.war file of the Camunda Webapp. The suffix `.json` of the file is added automatically and must not be specified.
```json
...
bpmnJs: {
  moddleExtensions: {
    camunda: 'my-custom-moddle/camunda'
  }
}
...
```

# skipCustomListeners Flag

You can configure skipCustomListeners flag globally for cockpit by adding a `skipCustomListeners` property in `app/cockpit/scripts/config.js`:

```javascript
   window.camCockpitConf = {
     skipCustomListeners: {
       default: true, // default value for skipCustomListeners is true
       hidden: false  // skipCustomListeners checkbox is not hidden
     }
   };
```
By default (if not configured), the `skipCustomListeners` flag value is `true`. However, you can set the default value of the flag (`true | false`)
in the `default` property in `skipCustomListeners` configuration.

Moreover, the checkbox to enable/disable skipCustomListeners is by default not hidden in Cockpit. You can set this behaviour by configuring the property
`hidden` (`true | false`) in `skipCustomListeners` configuration. If the `hidden` value is configured to be false, then the skipCustomListeners checkbox 
will be hidden everywhere in Cockpit.

# Runtime Activity Instance Metrics (Process Definition)

 ```javascript
    window.camCockpitConf = {
       runtimeActivityInstanceMetrics: {
          display: true
       }
    };
 ```
By default the activity instance statistics are displayed for the runtime view of the process definition.
Hence, the default value of the `display` flag is `true`. If the statistics shouldn't be displayed initially process definition runtime view is opened, the `display` option needs to be set to `false`.
In any case does the toggle button allow to display/remove the statistics on demand.

# Historic Activity Instance Metrics

 ```javascript
    window.camCockpitConf = {
       historicActivityInstanceMetrics: {
         adjustablePeriod: true,
         //select from the default time period: today, week, month, complete
         period: {
           unit: 'today'
         }
       }
    };
 ```
 By default, the `adjustablePeriod` flag value is `true`. Setting it to false disables the ability in the process definition history view to manually select the time period for which the activity instances are displayed. 
 the `unit` property of `period` allows to specify the default timer period for which the activity instance badges are supposed to be shown. 
 Here it is possible to select form the range of values: `today`, `week`,`month`,`complete`;  
 


# Advanced Styles Customization

In addition to the basic `user-styles.css` file, you can edit the source style- and layout files
using [less](http://lesscss.org/) to change the overall appearance of Cockpit.

If you want to customize the interface with `less`, you should probably start by having a look
at the variables defined in the following files:

 - `node_modules/camunda-commons-ui/node_modules/bootstrap/less/variables.less`
   defines the original Bootstrap variables
 - `node_modules/camunda-commons-ui/resources/less/cam-variables.less`
   overrides some Bootstrap variables (above) and add some custom ones

## Compiling with Grunt

From within the `camunda-bpm-webapp` directory:

```sh
grunt build:Cockpit
```

The command will build the frontend assets (of Cockpit), styles included.
