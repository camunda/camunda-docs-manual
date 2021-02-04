---

title: 'Configuration'
weight: 50

menu:
  main:
    identifier: "user-guide-admin-configuration"
    parent: "user-guide-admin"

---


# LDAP

If you connect the Camunda Platform with the LDAP identity service, you have read-only access to the users and groups. Create new users and groups via the LDAP system, but not in the admin application. Find more information about how to configure the process engine in order to use the LDAP identity service [here]({{< ref "/user-guide/process-engine/identity-service.md#the-ldap-identity-service" >}}).


# Logo and Header Color

To change visual aspects of Admin, you can edit the user stylesheet file located in
`app/admin/styles/user-styles.css`. This file contains CSS which is loaded into Admin
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
// …
app: {
  name: 'Admin',
  vendor: 'Company'
},
// …
```

# Localization

The localization of Admin is contained in the `app/admin/locales/` directory. This
directory contains a separate localization file for every available language. The file name
consists of the language code and the suffix `.json` (e.g., `en.json`).

Admin uses a locale file corresponding to the language settings of the browser. You can
set the `availableLocales` property in the configuration file to provide a list of available
locales. Every locale which is contained in this list must have a locale file in the `locales`
directory with the corresponding language code.

If the browser uses a language which is not available, Admin uses the locale which is
defined via the `fallbackLocale` property in the configuration file:

```javascript
"locales": {
  "availableLocales": ["en", "de"],
  "fallbackLocale": "en"
}
```

To create a new localization for Admin, copy the provided language file, translate it and
save it as new localization file with the corresponding language code. To make the new translation
available, add it to the list of available locales in the configuration file.

# Custom Scripts

If you want to add your own scripts to the Admin application, you should add a `customScripts` property to the `app/admin/scripts/config.js`
file with something like this:

```javascript
var camAdminConf = {
  // …
  customScripts: {
    // names of angular modules defined in your custom script files.
    // will be added to the 'cam.admin.custom' as dependencies
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
`app/admin` folder in the Camunda webapp .war file.

**Note:** The content of the `customScripts` property will be treated as a
[RequireJS configuration](http://requirejs.org/docs/api.html#config) except for the
`nodeIdCompat` and `skipDataMain` which are irrelevant and `deps` which will be used like:

```javascript
require(config.deps, callback);
```

# Change CSRF Cookie Name

The default name of the CSRF Cookie is `XSRF-TOKEN`. When using other applications within the
same-origin, the CSRF mechanisms could interfere with each other. To avoid the name conflict, you
can change the name of the CSRF cookie in the `config.js` file as follows:
```javascript
var camAdminConf = {
  // …
  csrfCookieName: 'MY-XSRF-TOKEN'
};
```

**Note:** Please make sure to change the CSRF cookie name also on [server-side]({{<ref "/webapps/shared-options/csrf-prevention.md#cookie-name" >}}).

# Disable Welcome Message for new Users

First-time visitors are shown a message directing them to the camunda welcome page. If you do
not want this message to be shown, you can disable it by adjusting the `config.js` as follows:
```javascript
var camAdminConf = {
  // …
  disableWelcomeMessage: true
};
```

**Note:** This does only affect the Admin login page. For other webapps, you need to adjust the corresponding config file as well.


# User Operation Log Annotation Length
The default maximum length of a User Operation Log annotation is 4000 characters. Some databases have smaller limits. You can change the maximum allowed input length in the `config.js` file as follows:

```javascript
var camAdminConf = {
  // …
  userOperationLogAnnotationLength: 4000
};
```

**Note:** This does only affect the Admin Operation Log. For the Cockpit Operation Log, check out the [Cockpit configuration]({{<ref "/webapps/cockpit/extend/configuration.md#user-operation-log-annotation-length" >}}).


# Advanced Styles Customization

In addition to the basic `user-styles.css` file, you can edit the source style- and layout files
using [less](http://lesscss.org/) to change the overall appearance of Admin.

If you want to customize the interface with `less`, you should probably start by having a look
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

The command will build the frontend assets (of Admin), styles included.
