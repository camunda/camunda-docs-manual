---

title: 'Customizing'
category: 'Cockpit'

---

Some visual aspects of the web interface can be configured in the 
`_vars.less` file (located in `webapps/camunda-webapp/webapp/src/main/webapp/assets/styles/`)
as follows:

  - __Header colors__: you can change the values of the `@main-color` and `@main-darker` variables.

  - __Header logo__: you can either override the `app-logo.png` image file
  located in `webapps/camunda-webapp/webapp/src/main/webapp/assets/img/cockpit/`
  or override the `@logo-cockpit` variable to point to a other image file.

[More information about less](http://lesscss.org/).