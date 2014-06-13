---

title: 'Configuring LDAP for camunda Cockpit and Tasklist'
category: 'LDAP Configuration'

---


In order to setup LDAP for the JBoss Application Server distribution, you have to perform the following steps:

<strong>Adjust Process Engine Configuration</strong><br>
Edit the file `standalone.xml` (or `domain.xml`) provided by the JBoss Application Server and add the [LDAP Identity Provider Plugin](/guides/user-guide/#process-engine-identity-service-the-ldap-identity-service) and the [Administrator Authorization Plugin](/guides/user-guide/#process-engine-authorization-service-the-administrator-authorization-plugin).

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

See our user guide for complete documentation on the [LDAP Identity Provider Plugin](ref:/guides/user-guide/#process-engine-identity-service-the-ldap-identity-service) and the [Administrator Authorization Plugin](ref:/guides/user-guide/#process-engine-authorization-service-the-administrator-authorization-plugin).