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
      description: 'Forum for Camnuda BPM users and developers',
      priority: 0
    },
    // ...
  ]
};
```
