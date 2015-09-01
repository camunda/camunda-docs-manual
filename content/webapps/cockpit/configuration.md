---

title: 'Configuration'
weight: 100

menu:
  main:
    identifier: "user-guide-cockpit-configuration"
    parent: "user-guide-cockpit"

---


# Customizing

Some visual aspects of the web interface can be configured in the
`_vars.less` file (located in `webapps/camunda-webapp/webapp/src/main/webapp/assets/styles/`)
as follows:

* **Header colors**: you can change the values of the `@main-color` and `@main-darker` variables.

* **Header logo**: you can either override the `app-logo.png` image file
  located in `webapps/camunda-webapp/webapp/src/main/webapp/assets/img/cockpit/`
  or override the `@logo-cockpit` variable to point to a other image file.

[More information about less](http://lesscss.org/).