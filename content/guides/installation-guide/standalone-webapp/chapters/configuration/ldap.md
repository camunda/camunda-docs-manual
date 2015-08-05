---

title: 'LDAP Configuration'
weight: 40

menu:
  main:
    identifier: "installation-guide-standalone-ldap-config"
    parent: "installation-guide-standalone"

---


### Adjust the Process Engine Configuration

Initially the camunda standalone webapp is configured to use a built-in database identity service.
If you want to use LDAP instead you have to activate the camunda LDAP identity service. The file
`WEB-INF/applicationContext.xml` already contains a configuration example which is deactivated. In
order to activate it, simply uncomment the lines shown below:

```xml
<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
  <!-- ... -->
  <property name="processEnginePlugins">
    <list>
      <!-- Uncomment the following next two lines to activate LDAP -->
      <!--<ref bean="ldapIdentityProviderPlugin" />-->
      <!--<ref bean="administratorAuthorizationPlugin" />-->
    </list>
  </property>
</bean>
```

To configure the LDAP service please adjust the values of the bean named `ldapIdentityProviderPlugin` as
described in the [user guide](ref:/guides/user-guide/#process-engine-identity-service-configuration-properties-of-the-ldap-plugin).
Do not forget to configure the authorization plugin as well (see the [documentation](ref:/guides/user-guide/#process-engine-authorization-service)).


### Enable Hal Resource caching

If you use LDAP as Indentity Provider, you should consider [activating caching][hal-caching] of
Users and Groups in the camunda webapplication. In order to activate this, add the following
configuration to the `web.xml` file of camunda webapplication:

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

