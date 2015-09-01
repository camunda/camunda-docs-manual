---

title: 'Configuration'
weight: 50

menu:
  main:
    identifier: "user-guide-admin-configuration"
    parent: "user-guide-admin"

---


# LDAP

If you connect the Camunda BPM platform with the LDAP identity service you have read-only access to the users and groups. Create new users and groups via the LDAP system, but not in the admin application. Find more information about how to configure the process engine in order to use the LDAP identity service [here]({{< relref "user-guide/process-engine/identity-service.md#the-ldap-identity-service" >}}).


# Customizing

Some visual aspects of the web interface can be configured in the
`_vars.less` file (located in `webapps/camunda-webapp/webapp/src/main/webapp/assets/styles/`)
as follows:

* **Header colors**: you can change the values of `@main-color` and `@main-darker` variables.
* **Header logo**: you can either override the `app-logo.png` image file
  located in the `webapps/camunda-webapp/webapp/src/main/webapp/assets/img/admin/`
  or override the `@logo-admin` variable to point to another image file.

[More information about less](http://lesscss.org/).