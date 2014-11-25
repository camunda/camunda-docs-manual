---

title: 'Configuring LDAP for camunda Cockpit and Tasklist'
category: 'LDAP Configuration'

---

In order to setup LDAP for the WebSphere distribution, you have to perform the following steps:

<strong>1. Add LDAP Library</strong>

Make sure the `camunda-identity-ldap-$PLATFORM_VERSION.jar` is present in the shared library 'Camunda' folder.

<strong>2. Adjust Process Engine Configuration</strong>

Edit the file `bpm-platform.xml` located inside the camunda BPM enterprise archive at `camunda-ibm-websphere-ear-$VERSION.ear/camunda-ibm-websphere-service.jar/META-INF/` and add the [LDAP Identity Provider Plugin](/guides/user-guide/#process-engine-identity-service-the-ldap-identity-service) and the [Administrator Authorization Plugin](/guides/user-guide/#process-engine-authorization-service-the-administrator-authorization-plugin).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform xmlns="http://www.camunda.org/schema/1.0/BpmPlatform"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.camunda.org/schema/1.0/BpmPlatform http://www.camunda.org/schema/1.0/BpmPlatform ">
  ...
  <process-engine name="default"> ...
    <properties>...</properties>
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

See our user guide for complete documentation on the [LDAP Identity Provider Plugin](/guides/user-guide/#process-engine-identity-service-the-ldap-identity-service) and the [Administrator Authorization Plugin](/guides/user-guide/#process-engine-authorization-service-the-administrator-authorization-plugin).
