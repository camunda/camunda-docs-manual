---

title: 'Configuration'
weight: 70

menu:
  main:
    identifier: "webapps-welcome-configuration"
    parent: "webapps-welcome"

---


You can override the default configuration of Welcome application using a central configuration file
located in `app/welcome/scripts/config.js`. Currently, the following configuration options is
available:

# Custom links

Can be used to add some uesful links for the user like other application of intranet.


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

The localization of Welcome application is contained in the `app/welcome/locales/` directory. This
directory contains a separate localization file for every available language. The file name
consists of the language code and the suffix `.json` (e.g., `en.json`).

Welcome application uses a locale file corresponding to the language settings of the browser. You can
set the `availableLocales` property in the configuration file to provide a list of available
locales. Every locale which is contained in this list must have a locale file in the `locales`
directory with the corresponding language code.

If the browser uses a language which is not available, Welcome application uses the locale which is
defined via the `fallbackLocale` property in the configuration file:

```javascript
"locales": {
  "availableLocales": ["en", "de"],
  "fallbackLocale": "en"
}
```

To create a new localization for Welcome application, copy the provided language file, translate it and
save it as new localization file with the corresponding language code. To make the new translation
available, add it to the list of available locales in the configuration file.

