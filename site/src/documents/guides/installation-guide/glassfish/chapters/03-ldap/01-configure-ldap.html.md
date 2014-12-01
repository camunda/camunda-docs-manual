---

title: 'Configuring LDAP for Camunda Cockpit and Tasklist'
category: 'LDAP Configuration'

---

In order to setup LDAP for the glassfish distribution, you have to perform the following steps:

### Add the LDAP Library

Make sure the `camunda-identity-ldap-$PLATFORM_VERSION.jar` is present in the
`GLASSFISH_HOME/glassfish/lib` folder.

### Adjust the Process Engine Configuration

Edit the file `bpm-platform.xml` located inside the folder `$GLASSFISH_HOME/glassfish/domains/domain1/applications/camunda-bpm-platform/camunda-glassfish-service-VERSION.jar/META-INF` and add the [LDAP Identity Provider Plugin](/guides/user-guide/#process-engine-identity-service-the-ldap-identity-service) and the [Administrator Authorization Plugin](/guides/user-guide/#process-engine-authorization-service-the-administrator-authorization-plugin).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform xmlns="http://www.camunda.org/schema/1.0/BpmPlatform"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.camunda.org/schema/1.0/BpmPlatform http://www.camunda.org/schema/1.0/BpmPlatform">
  <!-- ... -->
  <process-engine name="default">
    <!-- ... -->
    <plugins>
      <plugin>
        <class>org.camunda.bpm.identity.impl.ldap.plugin.LdapIdentityProviderPlugin</class>
        <properties>

          <property name="serverUrl">ldap://localhost:4334/</property>
          <property name="managerDn">uid=jonny,ou=office-berlin,o=camunda,c=org</property>
          <property name="managerPassword">s3cr3t</property>

          <property name="baseDn">o=camunda,c=org</property>

          <property name="userSearchBase"></property>
          <property name="userSearchFilter">(objectclass=person)</property>

          <property name="userIdAttribute">uid</property>
          <property name="userFirstnameAttribute">cn</property>
          <property name="userLastnameAttribute">sn</property>
          <property name="userEmailAttribute">mail</property>
          <property name="userPasswordAttribute">userpassword</property>

          <property name="groupSearchBase"></property>
          <property name="groupSearchFilter">(objectclass=groupOfNames)</property>
          <property name="groupIdAttribute">ou</property>
          <property name="groupNameAttribute">cn</property>

          <property name="groupMemberAttribute">member</property>

        </properties>
      </plugin>
      <plugin>
        <class>org.camunda.bpm.engine.impl.plugin.AdministratorAuthorizationPlugin</class>
        <properties>
          <property name="administratorUserName">admin</property>
        </properties>
      </plugin>
    </plugins>
  </process-engine>
</bpm-platform>
```

The `administratorUserName` property should contain the user id of the LDAP user you want to grant administrator authorizations to. You can then use this user to log into the webapplication and grant authorizations to additional users.

See our user guide for complete documentation on the [LDAP Identity Provider Plugin](ref:/guides/user-guide/#process-engine-identity-service-the-ldap-identity-service) and the [Administrator Authorization Plugin](ref:/guides/user-guide/#process-engine-authorization-service-the-administrator-authorization-plugin).

### Enable Hal Resource caching

If you use LDAP as Indentity Provider, you should consider [activating caching][hal-caching] of
Users and Groups in the camunda webapplication. In order to activate this, add the following
configuration to the `web.xml` file of camunda webapplication
(`camunda-webapp-glassfish-$PLATFORM_VERSION.war/WEB-INF/web.xml`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.5" xmlns="http://java.sun.com/xml/ns/javaee"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">

  <!-- ... -->

  <listener>
    <listener-class>org.camunda.bpm.engine.rest.hal.cache.HalRelationCacheBootstrap</listener-class>
  </listener>

  <context-param>
    <param-name>org.camunda.bpm.engine.rest.hal.cache.config</param-name>
    <param-value>
      {
        "cacheImplementation": "org.camunda.bpm.engine.rest.hal.cache.DefaultHalResourceCache",
        "caches": {
          "org.camunda.bpm.engine.rest.hal.user.HalUser": {
            "capacity": 100,
            "secondsToLive": 900
          },
          "org.camunda.bpm.engine.rest.hal.group.HalGroup": {
            "capacity": 100,
            "secondsToLive": 900
          }
        }
      }
    </param-value>
  </context-param>

  <!-- ... -->

</web-app>

```

[hal-caching]: /api-references/rest/#overview-hypertext-application-language-hal-caching-of-hal-relations
