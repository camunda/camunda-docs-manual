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
