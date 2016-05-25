---

title: 'Configuration'
weight: 50

menu:
  main:
    identifier: "user-guide-admin-configuration"
    parent: "user-guide-admin"

---


# LDAP

If you connect the Camunda BPM platform with the LDAP identity service, you have read-only access to the users and groups. Create new users and groups via the LDAP system, but not in the admin application. Find more information about how to configure the process engine in order to use the LDAP identity service [here]({{< relref "user-guide/process-engine/identity-service.md#the-ldap-identity-service" >}}).


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
