---

title: 'Configuration'
weight: 10

menu:
  main:
    identifier: "user-guide-cockpit-configuration"
    parent: "user-guide-cockpit-extend"

---

You can override the default configuration of Cockpit using a central configuration file
located in `app/cockpit/scripts/config.js`. The following configuration options are
available:
# Logo and Header Color

You can change the visual aspects of Cockpit. The user stylesheet file is located in
`app/cockpit/styles/user-styles.css`. This file contains CSS which is loaded into Cockpit
and can override the standard styles.

```css
/* hides the Camunda logo */
.app-banner svg {
  display: none;
}
.app-banner {
  /* hides the "Camunda Cockpit" text */
  text-indent: 200vw;
  /* put your logo */
  background-image: url(./path/to/the/logo.png);
  /* sets the width to match the logo's width */
  width: 80px;
}

/* changes the header top border color  */
.Header {
  border-top-color: blue !important;
}
```

**Note:** you can also change the app name (*Cockpit*) and vendor (*Camunda*)
by changing the `app/cockpit/scripts/config.js` configuration file as follow:

```js
export default {
  // …
  app: {
    name: 'Operations',
    vendor: 'Company'
  },
}
```

# Localization

Cockpit can be localized. Camunda maintains English and German translation files. 
You can find and download community maintained translation files at the [Camunda webapp translations repository](https://github.com/camunda/camunda-webapp-translations).

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
export default {
  // …
  "locales": {
    "availableLocales": ["en", "de"],
    "fallbackLocale": "en"
  }
}
```

To create a new localization for Cockpit, copy the provided language file, translate it and
save it as new localization file with the corresponding language code. To make the new translation
available, add it to the list of available locales in the configuration file.

# Custom Scripts

Cockpit allows you to include arbitrary JavaScript files. This allows you to extend Cockpit with custom code. The script file might contain a 
custom frontend module as described in [Cockpit Plugins - Structure of a Frontend Module]({{<ref "/webapps/cockpit/extend/plugins.md#structure-of-a-frontend-module" >}}).

Add your files to the `customScripts` property of the `app/cockpit/scripts/config.js` file:

```javascript
export default {
  // …
  customScripts: 
    ['custom-module/module.js']
};
```
This includes a `custom-module/module.js` file. The path is relative to the `app/cockpit` folder in the Camunda webapp .war file.

You can find a complete example about how to use `customScripts` to develop a Cockpit Plugin in the [Camunda 7 examples repository](https://github.com/camunda/camunda-bpm-examples/tree/master/cockpit/cockpit-cats).

## Legacy Custom Scripts

Custom Scripts created for Camunda 7.13 or earlier can be included using the `requireJsConfig` property to the `app/cockpit/scripts/config.js`. You can include these custom scripts using the custom [requireJS configuration](https://requirejs.org/docs/api.html#config).

```Javascript
export default {
  // …
  requireJsConfig: {
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
}
```

For more details about legacy Plugins, check out the legacy [Plugin documentation](https://docs.camunda.org/manual/7.13/webapps/cockpit/extend/plugins/). Please note that this link will take you to the documentation of Camunda **7.13** .

# BPMN Diagram Viewer (bpmn.js)

The diagram viewer (bpmn.js) can be either customized by moddle extensions or
[additional modules](https://bpmn.io/toolkit/bpmn-js/walkthrough/#extend-the-modeler). To extend the BPMN diagram viewer
of Cockpit, a `bpmnJs` property must be added to the `app/cockpit/scripts/config.js` file.

## Additional Modules
To add modules, the `additionalModules` property needs to be specified, where each module is registered with its path. The path is relative to the `app/cockpit` folder in the .war file of the Camunda Webapp.

```javascript
export default {
  // …
  bpmnJs: {
    additionalModules: [
      'my-custom-module/module'
    ]
  }
}
```

You can find an example on how to add an additional bpmn.js module to Cockpit in the [Camunda 7 examples repository](https://github.com/camunda/camunda-bpm-examples/tree/master/cockpit/cockpit-bpmn-js-module).

## Moddle Extensions
The BPMN moddle can be extended by adding a `moddleExtensions` property. Each moddle extension has a unique name (key)
and a path (value) to the JSON file of the moddle extension. The path is relative to the `app/cockpit` folder in the
.war file of the Camunda Webapp. The suffix `.json` of the file is added automatically and must not be specified.
```json
export default {
  // …
  bpmnJs: {
    moddleExtensions: {
      camunda: 'my-custom-moddle/camunda'
    }
  }
}
```

# skipCustomListeners and skipIoMappings Flags

You can configure the skipCustomListeners and the skipIoMappings flag globally for cockpit by adding a `skipCustomListeners` or `skipIoMappings` property in `app/cockpit/scripts/config.js`:

```javascript
export default {
  skipCustomListeners: {
    default: true, // default value for skipCustomListeners is true
    hidden: false  // skipCustomListeners checkbox is not hidden
  },
  skipIoMappings: {
    default: true, // default value for skipIoMappings is true
    hidden: false  // skipIoMappings checkbox is not hidden
  }
};
```
By default (if not configured), the flag value is `true`. However, you can set the default value of the flag (`true | false`)
in the `default` property in the configuration.

Moreover, the checkbox to enable/disable the option is by default not hidden in Cockpit. You can set this behaviour by configuring the property
`hidden` (`true | false`) in the configuration. If the `hidden` value is configured to be false, then the checkbox
will be hidden everywhere in Cockpit.

# The `cascade` flag

You can also configure the default value for the `cascade` flag by adding a `cascade` property in `app/cockpit/scripts/config.js`:

```javascript
export default {
  cascade: {
    default: true,
  }
};
```

If the value of this property is `true`, the flag's checkbox in cockpit will be selected by default. When the property is not present, the default value is `ƒalse`. This flag is used when deleting process definitions and deployments.

# Runtime Activity Instance Metrics (Process Definition)

 ```javascript
export default {
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
export default {
    historicActivityInstanceMetrics: {
      adjustablePeriod: true,
      //select from the default time period: day, week, month, complete
      period: {
        unit: 'day'
      }
    }
};
 ```
 By default, the `adjustablePeriod` flag value is `true`. Setting it to false disables the ability in the process definition history view to manually select the time period for which the activity instances are displayed.
 the `unit` property of `period` allows to specify the default timer period for which the activity instance badges are supposed to be shown.
 Here it is possible to select form the range of values: `today`, `week`,`month`,`complete`;

# Default Filter for the Historic Process Instances Search

```javascript
export default {
  defaultFilter: {
    historicProcessDefinitionInstancesSearch: {
      lastDays: 5,
      event: 'started'
    }
  }
};
```

A default filter can be applied for the historic process instances search on the historic process definition view.
Like this, it is possible to reduce the amount of instances which are being retrieved at the same time.

It is configurable, for how many days in the past instances are queried based on the start or the end time of historic process instances.

* The property `lastDays` specifies the numeric amount of days in the past based on the current time
* The property `event` can be either set to 'started' or 'ended'

# Change CSRF Cookie Name

The default name of the CSRF Cookie is `XSRF-TOKEN`. When using other applications within the
same-origin, the CSRF mechanisms could interfere with each other. To avoid the name conflict, you
can change the name of the CSRF cookie in the `config.js` file as follows:
```javascript
export default = {
  // …
  csrfCookieName: 'MY-XSRF-TOKEN'
};
```

**Note:** Please make sure to change the CSRF cookie name also on [server-side]({{<ref "/webapps/shared-options/csrf-prevention.md#cookie-name" >}}).

# Disable Welcome Message for new Users

First-time visitors are shown a message directing them to the camunda welcome page. If you do
not want this message to be shown, you can disable it by adjusting the `config.js` as follows:
```javascript
export default = {
  // …
  disableWelcomeMessage: true
};
```

**Note:** This does only affect the Cockpit login page. For other webapps, you need to adjust the corresponding config file as well.

# User Operation Log Annotation Length
The default maximum length of a User Operation Log annotation is 4000 characters. Some databases have smaller limits. You can change the maximum allowed input length in the `config.js` file as follows:

```javascript
export default = {
  // …
  userOperationLogAnnotationLength: 4000
};
```

**Note:** This does only affect the Cockpit Operation Log. For the Admin Operation Log, check out the [Admin Configuration]({{<ref "/webapps/admin/configuration.md#user-operation-log-annotation-length" >}}).

# Preview Deployed Embedded Forms
You can view a preview of embedded forms and other HTML files in the Cockpit deployment view. If the HTML has embedded `<script>` tags, they will be executed, which may have unintended side-effects. You can disable this feature if you don't trust your deployed HTML files in the `config.js` file as follows: 

```javascript
export default = {
  // …
  previewHtml: false
};
```