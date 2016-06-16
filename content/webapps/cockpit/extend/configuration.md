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

# Custom Scripts

If you want to add your own scripts to the Cockpit application, you should add a `customScripts` property to the `app/cockpit/scripts/config.js`
file with something like this:

```javascript
var camCockpitConf = {
  // …
  customScripts: {
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
};
```
This includes a `custom-ng-module/script.js` file. The path is relative to the
`app/cockpit` folder in the Camunda webapp .war file.

**Note:** The content of the `customScripts` property will be treated as a
[RequireJS configuration](http://requirejs.org/docs/api.html#config) except for the
`nodeIdCompat` and `skipDataMain` which are irrelevant and `deps` which will be used like:

```javascript
require(config.deps, callback);
```

You can find a complete example about how to use `customScripts` to develop a Cockpit Plugin in the [Camunda BPM examples repository](https://github.com/camunda/camunda-bpm-examples/tree/master/cockpit/js-only-plugin).

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
