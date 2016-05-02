---

title: 'Configure the Full Distribution for JBoss/Wildfly'
weight: 30

menu:
  main:
    name: "Configuration"
    identifier: "installation-guide-full-jboss-ldap"
    parent: "installation-guide-full-jboss"
    pre: "Configure the installation."

---


This page explains how to configure the full distribution for the JBoss / Wildfly application server.


# LDAP

In order to setup LDAP for the JBoss / Wildfly Application Server distribution, you have to perform the following steps:


## Adjust the Process Engine Configuration

Edit the file `standalone.xml` (or `domain.xml`) provided by the JBoss / Wildfly Application Server and add the [LDAP Identity Provider Plugin]({{< relref "user-guide/process-engine/identity-service.md#the-ldap-identity-service" >}}) and the [Administrator Authorization Plugin]({{< relref "user-guide/process-engine/authorization-service.md#the-administrator-authorization-plugin" >}}).

```xml
<subsystem xmlns="urn:org.camunda.bpm.jboss:1.1">
  <process-engines>
    <process-engine name="default" default="true"> ...
      <properties>...</properties>
      <plugins>
        <plugin>
          <class>org.camunda.bpm.identity.impl.ldap.plugin.LdapIdentityProviderPlugin</class>
          <properties>

            <property name="serverUrl">ldap://localhost:4334/</property>
            <property name="managerDn">uid=jonny,ou=office-berlin,o=camunda,c=org</property>
            <property name="managerPassword">s3cr3t</property>

            <property name="baseDn">o=camunda,c=org</property>

            <property name="userSearchBase">ou=employees</property>
            <property name="userSearchFilter">(objectclass=person)</property>

            <property name="userIdAttribute">uid</property>
            <property name="userFirstnameAttribute">cn</property>
            <property name="userLastnameAttribute">sn</property>
            <property name="userEmailAttribute">mail</property>
            <property name="userPasswordAttribute">userpassword</property>

            <property name="groupSearchBase">ou=roles</property>
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
  </process-engines> ...
</subsystem>
```


The `administratorUserName` property should contain the user id of the LDAP user you want to grant administrator authorizations to. You can then use this user to log in to the web application and grant authorizations to additional users.

See our user guide for complete documentation on the [LDAP Identity Provider Plugin]({{< relref "user-guide/process-engine/identity-service.md#the-ldap-identity-service" >}}) and the [Administrator Authorization Plugin]({{< relref "user-guide/process-engine/authorization-service.md#the-administrator-authorization-plugin" >}}).


# HAL Resource Caching

If you use LDAP as Indentity Provider, you should consider [activating caching]({{< relref "reference/rest/overview/hal.md#caching-of-hal-relations" >}}) of
Users and Groups in the Camunda webapplication. In order to activate this, add the following
configuration to the `web.xml` file of Camunda webapplication
(`camunda-webapp-jboss-$PLATFORM_VERSION.war/WEB-INF/lib`):

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
