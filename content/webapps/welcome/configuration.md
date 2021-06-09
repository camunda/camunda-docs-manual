---

title: 'Configuration'
weight: 70

menu:
  main:
    identifier: "webapps-welcome-configuration"
    parent: "webapps-welcome"

---


You can override the default configuration of the Welcome application by using a central configuration file,
located in `app/welcome/scripts/config.js`. The following configuration options are
available:

# Custom links

Can be used to add some useful links for the user, such as other applications or intranet sites.


## Example

```javascript
export default {
  // …
  links: [
    {
      label: 'Camunda Forum',
      href: 'https://forum.camunda.org',
      description: 'Forum for Camnuda BPM users and developers'
    },
    // ...
  ]
}
```

# Logo and Header Color

You can change the visual aspects of Welcome. The user stylesheet file is located in
`app/welcome/styles/user-styles.css`. This file contains CSS which is loaded into Welcome
and can override the standard styles.

```css
.navbar-brand {
  /* hides the "Camunda Welcome" text */
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

**Note:** you can also change the app name (*Welcome*) and vendor (*Camunda*)
by changing the `app/welcome/scripts/config.js` configuration file as follow:

```js
export default {
  // …
  app: {
    name: 'Welcome',
    vendor: 'Company'
  }
}
```

# Localization

Welcome can be localized. Camunda maintains English and German translation files. 
You can find and download community maintained translation files at the [Camunda webapp translations repository](https://github.com/camunda/camunda-webapp-translations).

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
export default {
  // …
  "locales": {
    "availableLocales": ["en", "de"],
    "fallbackLocale": "en"
  }
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
export default {
  // …
  csrfCookieName: 'MY-XSRF-TOKEN'
};
```

**Note:** Please make sure to change the CSRF cookie name also on [server-side]({{<ref "/webapps/shared-options/csrf-prevention.md#cookie-name" >}}).

# Disable Welcome Message for new Users

First-time visitors are shown a message directing them to the camunda welcome page. If you do
not want this message to be shown, you can disable it by adjusting the `config.js` as follows:
```javascript
export default {
  // …
  disableWelcomeMessage: true
};
```

**Note:** This does only affect the Welcome login page. For other webapps, you need to adjust the corresponding config file as well.
