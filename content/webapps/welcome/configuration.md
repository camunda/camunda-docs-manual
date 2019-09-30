---

title: 'Configuration'
weight: 70

menu:
  main:
    identifier: "webapps-welcome-configuration"
    parent: "webapps-welcome"

---


You can override the default configuration of the Welcome application by using a central configuration file,
located in `app/welcome/scripts/config.js`. Currently, the following configuration options are
available:

# Custom links

Can be used to add some useful links for the user, such as other applications or intranet sites.


## Example

```javascript
window.camWelcomeConf = {
  links: [
    {
      label: 'Camunda Forum',
      href: 'https://forum.camunda.org',
      description: 'Forum for Camnuda BPM users and developers'
    },
    // ...
  ]
};
```

# Localization

The localization of the Welcome application is contained in the `app/welcome/locales/` directory. This
directory contains a separate localization file for every available language. The file name
consists of the language code and the suffix `.json` (e.g., `en.json`).

The Welcome application uses a locale file corresponding to the language settings of the browser. You can
set the `availableLocales` property in the configuration file to provide a list of available
locales. Every locale which is contained in this list must have a locale file in the `locales`
directory with the corresponding language code.

If the browser uses a language which is not available, the Welcome application uses the locale which is
defined via the `fallbackLocale` property in the configuration file:

```javascript
"locales": {
  "availableLocales": ["en", "de"],
  "fallbackLocale": "en"
}
```

To create a new localization for the Welcome application, copy the provided language file, translate it and
save it as a new localization file with the corresponding language code. To make the new translation
available, add it to the list of available locales in the configuration file.

# Change CSRF Cookie Name

The default name of the CSRF Cookie is `XSRF-TOKEN`. When using other applications within the 
same-origin, the CSRF mechanisms could interfere with each other. To avoid the name conflict, you 
can change the name of the CSRF cookie in the `config.js` file as follows:
```javascript
var camWelcomeConf = {
  // …
  csrfCookieName: 'MY-XSRF-TOKEN'
};
```

**Note:** Please make sure to change the CSRF cookie name also on [server-side]({{<ref "/webapps/shared-options/csrf-prevention.md#cookie-name" >}}).
