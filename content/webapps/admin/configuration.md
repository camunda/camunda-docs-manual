---

title: 'Configuration'
weight: 50

menu:
  main:
    identifier: "user-guide-admin-configuration"
    parent: "user-guide-admin"

---

You can override the default configuration of admin using a central configuration file
located in `app/admin/scripts/config.js`. The following configuration options are
available:

# LDAP

If you connect Camunda 7 with the LDAP identity service, you have read-only access to the users and groups. Create new users and groups via the LDAP system, but not in the admin application. Find more information about how to configure the process engine in order to use the LDAP identity service [here]({{< ref "/user-guide/process-engine/identity-service.md#the-ldap-identity-service" >}}).

# Logo and header color

You can change the visual aspects of Admin. The user stylesheet file is located in
`app/admin/styles/user-styles.css`. This file contains CSS, which is loaded into Admin
and can override the standard styles.

```css
.navbar-brand {
  /* hides the "Camunda Admin" text */
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

**Note:** you can also change the app name (*Admin*) and vendor (*Camunda*)
by changing the `app/admin/scripts/config.js` configuration file as follow:

```js
export default {
  // …
  app: {
    name: 'Admin',
    vendor: 'Company'
  }
}
```

# Localization

Admin can be localized. Camunda maintains English and German translation files. 
You can find and download community maintained translation files at the [Camunda webapp translations repository](https://github.com/camunda/camunda-webapp-translations).

The localization of Admin is contained in the `app/admin/locales/` directory. This
directory contains a separate localization file for every available language. The file name
consists of the language code and the suffix `.json` (e.g., `en.json`).

Admin uses a locale file corresponding to the language settings of the browser. You can
set the `availableLocales` property in the configuration file to provide a list of available
locales. Every locale contained in this list must have a locale file in the `locales`
directory with the corresponding language code.

If the browser uses a language which is not available, Admin uses the locale defined via the `fallbackLocale` property in the configuration file:

```javascript
export default {
  // …
  "locales": {
    "availableLocales": ["en", "de"],
    "fallbackLocale": "en"
  } 
}
```

To create a new localization for Admin, copy the provided language file, translate it and
save it as new localization file with the corresponding language code. To make the new translation
available, add it to the list of available locales in the configuration file.

# Custom scripts

Admin allows you to include arbitrary JavaScript files. This allows you to extend admin with custom code. The script file might contain a 
custom frontend module. Admin shares the frontend module structure with [Cockpit Plugins]({{<ref "/webapps/cockpit/extend/plugins.md#structure-of-a-frontend-module" >}}).

Add your files to the `customScripts` property of the `app/admin/scripts/config.js` file:

```javascript
export default {
  // …
  customScripts: 
    ['custom-module/module.js']
}
```
This includes a `custom-module/module.js` file. The path is relative to the `app/admin` folder in the Camunda webapp .war file.

# Change CSRF cookie name

The default name of the CSRF Cookie is `XSRF-TOKEN`. When using other applications within the
same origin, the CSRF mechanisms could interfere with each other. To avoid the name conflict, change the name of the CSRF cookie in the `config.js` file as follows:

```javascript
export default {
  // …
  csrfCookieName: 'MY-XSRF-TOKEN'
}
```

**Note:** Ensure you also change the CSRF cookie name on [server-side]({{<ref "/webapps/shared-options/csrf-prevention.md#cookie-name" >}}).

# Disable welcome message for new users

First-time visitors are shown a message directing them to the Camunda welcome page. If you do
not want this message to be shown, you can disable it by adjusting the `config.js` as follows:

```javascript
export default {
  // …
  disableWelcomeMessage: true
}
```

**Note:** This only affects the Admin login page. For other web apps, adjust the corresponding config file as well.

# User operation log annotation length

The default maximum length of a user operation log annotation is 4000 characters. Some databases have smaller limits. You can change the maximum allowed input length in the `config.js` file as follows:

```javascript
export default {
  // …
  userOperationLogAnnotationLength: 4000
}
```

**Note:** This only affects the Admin Operation Log. For the Cockpit Operation Log, check out the [Cockpit configuration]({{<ref "/webapps/cockpit/extend/configuration.md#user-operation-log-annotation-length" >}}).

# Task worker metrics

The task worker metrics (TW) on the metrics page are displayed by default. You can disable this behavior by adjusting the `config.js` as follows:

```javascript
export default {
  // …
  alwaysShowUniqueTaskWorkerMetrics: false
}
```

If disabled, the metrics can still be displayed on-demand via a checkbox.

# Advanced styles customization

In addition to the basic `user-styles.css` file, you can edit the source style and layout files
using [less](http://lesscss.org/) to change the overall appearance of Admin.

To customize the interface with `less`, start by having a look
at the variables defined in the following files:

 - `node_modules/camunda-commons-ui/node_modules/bootstrap/less/variables.less`
   defines the original Bootstrap variables
 - `node_modules/camunda-commons-ui/resources/less/cam-variables.less`
   overrides some Bootstrap variables (above) and add some custom ones

## Compiling with Grunt

From within the `camunda-bpm-webapp` directory:

```sh
grunt build:admin
```

The command will build the front-end assets (of Admin), styles included.
