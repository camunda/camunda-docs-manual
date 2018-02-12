---

title: 'Identity Service'
weight: 230

menu:
  main:
    identifier: "user-guide-process-engine-identity-service"
    parent: "user-guide-process-engine"

---


The identity service is an API abstraction over various user/group repositories. The basic entities are

* User: a user identified by a unique Id
* Group: a group identified by a unique Id
* Membership: the relationship between users and groups
* Tenant: a tenant identified by a unique Id
* Tenant Membership: the relationship between tenants and users/groups

Example:

```java
User demoUser = processEngine.getIdentityService()
  .createUserQuery()
  .userId("demo")
  .singleResult();
```

Camunda BPM distinguishes between read-only and writable user repositories. A read-only user repository provides read-only access to the underlying user/group database. A writable user repository allows write access to the user database which includes creating, updating and deleting users and groups.

To provide a custom identity provider implementation, the following interfaces can be implemented:

* {{< javadocref page="?org/camunda/bpm/engine/impl/identity/ReadOnlyIdentityProvider.html" text="org.camunda.bpm.engine.impl.identity.ReadOnlyIdentityProvider" >}}
* {{< javadocref page="?org/camunda/bpm/engine/impl/identity/WritableIdentityProvider.html" text="org.camunda.bpm.engine.impl.identity.WritableIdentityProvider" >}}


# The Database Identity Service

The database identity service uses the process engine database for managing users and groups. This is the default identity service implementation used if no alternative identity service implementation is provided.

The database identity service implements both `ReadOnlyIdentityProvider` and `WritableIdentityProvider` providing full CRUD functionality in Users, Groups and Memberships.


# The LDAP Identity Service

The LDAP identity service provides read-only access to an LDAP-based user/group repository. The identity service provider is implemented as a [Process Engine Plugin]({{< relref "user-guide/process-engine/process-engine-plugins.md" >}}) and can be added to the process engine configuration. In that case it replaces the default database identity service.

To use the LDAP identity service, the `camunda-identity-ldap.jar` library has to be added to the classloader of the process engine.

{{< note title="" class="info" >}}
  Please import the [Camunda BOM](/get-started/apache-maven/) to ensure correct versions for every Camunda project.
{{< /note >}}

```xml
<dependency>
  <groupId>org.camunda.bpm.identity</groupId>
  <artifactId>camunda-identity-ldap</artifactId>
</dependency>
```

## Activate the LDAP Plugin

The following is an example of how to configure the LDAP Identity Provider Plugin using Spring XML:

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans   http://www.springframework.org/schema/beans/spring-beans.xsd">
  <bean id="processEngineConfiguration" class="org.camunda.bpm.engine.impl.cfg.StandaloneInMemProcessEngineConfiguration">
    ...
    <property name="processEnginePlugins">
      <list>
        <ref bean="ldapIdentityProviderPlugin" />
      </list>
    </property>
  </bean>
  <bean id="ldapIdentityProviderPlugin" class="org.camunda.bpm.identity.impl.ldap.plugin.LdapIdentityProviderPlugin">
    <property name="serverUrl" value="ldap://localhost:3433/" />
    <property name="managerDn" value="uid=daniel,ou=office-berlin,o=camunda,c=org" />
    <property name="managerPassword" value="daniel" />
    <property name="baseDn" value="o=camunda,c=org" />

    <property name="userSearchBase" value="" />
    <property name="userSearchFilter" value="(objectclass=person)" />
    <property name="userIdAttribute" value="uid" />
    <property name="userFirstnameAttribute" value="cn" />
    <property name="userLastnameAttribute" value="sn" />
    <property name="userEmailAttribute" value="mail" />
    <property name="userPasswordAttribute" value="userpassword" />

    <property name="groupSearchBase" value="" />
    <property name="groupSearchFilter" value="(objectclass=groupOfNames)" />
    <property name="groupIdAttribute" value="ou" />
    <property name="groupNameAttribute" value="cn" />
    <property name="groupMemberAttribute" value="member" />

    <property name="authorizationCheckEnabled" value="false" />
  </bean>
</beans>
```

The following is an example of how to configure the LDAP Identity Provider Plugin in bpm-platform.xml/processes.xml:

```xml
<process-engine name="default">
  <job-acquisition>default</job-acquisition>
  <configuration>org.camunda.bpm.engine.impl.cfg.StandaloneProcessEngineConfiguration</configuration>
  <datasource>java:jdbc/ProcessEngine</datasource>

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

        <property name="authorizationCheckEnabled">false</property>

      </properties>
    </plugin>
  </plugins>

</process-engine>
```

{{< note title="Administrator Authorization Plugin" class="info" >}}
  The LDAP Identity Provider Plugin is usually used in combination with the [Administrator Authorization Plugin]({{< relref "user-guide/process-engine/authorization-service.md#the-administrator-authorization-plugin" >}}) which allows you to grant administrator authorizations for a particular LDAP User/Group.
{{< /note >}}

{{< note title="Multi-Tenancy" class="info" >}}
Currently, the LDPA Identity Service doesn't support [multi-tenancy]({{< relref "user-guide/process-engine/multi-tenancy.md#single-process-engine-with-tenant-identifiers" >}}). That means it is not possible to get tenants from LDAP and the transparent multi-tenancy access restrictions don't work by default.
{{< /note >}}

## Configuration Properties of the LDAP Plugin

The LDAP Identity Provider provides the following configuration properties:

<table class="table table-striped">
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>serverUrl</code></td>
    <td>The url of the LDAP server to connect to.</td>
  </tr>
  <tr>
    <td><code>managerDn</code></td>
    <td>The absolute DN of the manager user of the LDAP directory.</td>
  </tr>
  <tr>
    <td><code>managerPassword</code></td>
    <td>The password of the manager user of the LDAP directory</td>
  </tr>
  <tr>
    <td><code>baseDn</code></td>
    <td>
      <p>The base DN: Identifies the root of the LDAP directory. Is appended to all DN names composed for searching for users or groups.</p>
      <p><em>Example:</em> <code>o=camunda,c=org</code></p>
    </td>
  </tr>
  <tr>
    <td><code>userSearchBase</code></td>
    <td>
      <p>Identifies the node in the LDAP tree under which the plugin should search for users. Must be relative to <code>baseDn</code>.</p>
      <p><em>Example:</em> <code>ou=employees</code></p>
    </td>
  </tr>
  <tr>
    <td><code>userSearchFilter</code></td>
    <td>
      <p>LDAP query string used when searching for users. <em>Example:</em> <code>(objectclass=person)</code></p>
    </td>
  </tr>
  <tr>
    <td><code>userIdAttribute</code></td>
    <td>
      <p>Name of the user Id property. <em>Example:</em> <code>uid</code></p>
    </td>
  </tr>
  <tr>
    <td><code>userFirstnameAttribute</code></td>
    <td>
      <p>Name of the firstname property. <em>Example:</em> <code>cn</code></p>
    </td>
  </tr>
  <tr>
    <td><code>userLastnameAttribute</code></td>
    <td>
      <p>Name of the lastname property. <em>Example:</em> <code>sn</code></p>
    </td>
  </tr>
  <tr>
    <td><code>userEmailAttribute</code></td>
    <td>
      <p>Name of the email property. <em>Example:</em> <code>mail</code></p>
    </td>
  </tr>
  <tr>
    <td><code>userPasswordAttribute</code></td>
    <td>
      <p>Name of the password property. <em>Example:</em> <code>userpassword</code></p>
    </td>
  </tr>
  <tr>
    <td><code>groupSearchBase</code></td>
    <td>
      <p>Identifies the node in the LDAP tree under which the plugin should search for groups. Must be relative to <code>baseDn</code>.</p>
      <p><em>Example:</em> <code>ou=roles</code></p>
    </td>
  </tr>
  <tr>
    <td><code>groupSearchFilter</code></td>
    <td>
      <p>LDAP query string used when searching for groups. <em>Example:</em> <code>(objectclass=groupOfNames)</code></p>
    </td>
  </tr>
  <tr>
    <td><code>groupIdAttribute</code></td>
    <td>
      <p>Name of the group Id property. <em>Example:</em> <code>ou</code></p>
    </td>
  </tr>
  <tr>
    <td><code>groupNameAttribute</code></td>
    <td>
      <p>Name of the group Name property. <em>Example:</em> <code>cn</code></p>
    </td>
  </tr>
  <tr>
    <td><code>groupTypeAttribute</code></td>
    <td><p>Name of the group Type property. <em>Example:</em> <code>cn</code></p></td>
  </tr>
  <tr>
    <td><code>groupMemberAttribute</code></td>
    <td>
      <p>Name of the member attribute. <em>Example:</em> <code>member</code></p>
    </td>
  </tr>
  <tr>
    <td><code>acceptUntrustedCertificates</code></td>
    <td>
      <p>Accept of untrusted certificates if LDAP server uses SSL. <strong>Warning:</strong> We strongly advise against using this property. Better install untrusted certificates to JDK key store.</p>
    </td>
  </tr>
  <tr>
    <td><code>useSsl</code></td>
    <td>
      <p>Set to true if LDAP connection uses SSL. <em>Default:</em> <code>false</code></p>
    </td>
  </tr>
  <tr>
    <td><code>initialContextFactory</code></td>
    <td>
      <p>Value for the <code>java.naming.factory.initial</code> property. <em>Default:</em> <code>com.sun.jndi.ldap.LdapCtxFactory</code></p>
    </td>
  </tr>
  <tr>
    <td><code>securityAuthentication</code></td>
    <td>
      <p>Value for the <code>java.naming.security.authentication</code> property. <em>Default:</em> <code>simple</code></p>
    </td>
  </tr>
  <tr>
    <td><code>usePosixGroups</code></td>
    <td>
      <p>Indicates whether posix groups are used. If true, the connector will use a simple
         (unqualified) user id when querying for groups by group member instead of the full DN.
         <em>Default:</em> <code>false</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>allowAnonymousLogin</code></td>
    <td>
      <p>
        Allows to login anonymously without a password. <em>Default:</em> <code>false</code>
      </p>
      <p>
        <strong>Warning:</strong> We strongly advise against using this property. You should configure your LDAP
        to use simple authentication without anonymous login.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>authorizationCheckEnabled</code></td>
    <td>
      <p>
        If this property is set to <code>true</code>, then authorization checks are performed when querying for users or groups. Otherwise authorization checks are not performed when querying for users or groups. <em>Default:</em> <code>true</code>
      </p>
      <p>
        <strong>Note:</strong> If you have a huge amount of LDAP users or groups we advise to set this property to <code>false</code> to improve
        the performance of the user and group query.
      </p>
    </td>
  </tr>
  <tr>
   <td><code>sortControlSupported</code></td>
   <td>
      <p>
        If this property is set to <code>true</code>, then ordering of the search results is enabled. Otherwise orderBy clauses in search queries are simply ignored.
        <em>Default:</em> <code>false</code>
      </p>
      <p>
        <strong>Note:</strong> The support of search result ordering is not be implemented by every LDAP server.
        Make sure that your currently used LDAP Server implements the <a href="https://tools.ietf.org/html/rfc2891">RFC 2891</a>.
      </p>
    </td>
  </tr>
</table>

# Throttle login attempts

In order to prevent security vulnerabilities we have special mechanism for subsequence of unsuccessful login attempts.
You can configure four properties so that this login mechanism is suitable for you:

* `loginMaxAttempts`
* `loginDelayFactor`
* `loginDelayMaxTime`
* `loginDelayBase`

These properties are configured in seconds. If you need to setup 1 minute to max delay time for example, you need to put `60` which is seconds representation of one minute.
After the user failed to login max attempt number, this user will be locked and and will be not able to login again until admin user unlocks it.

Here is the example of the configuration:
```xml
    <!-- login configuration -->
    <property name="loginMaxAttempts" value="5" />
    <property name="loginDelayFactor" value="2" />
    <property name="loginDelayMaxTime" value="8" />
    <property name="loginDelayBase" value="1" />
```
After each unsuccessful attempt to login the user has to wait `baseTime * factor^(attempt-1)` seconds for the next attempt.
In our case 2^(attempt) seconds which means - 1 sec delay after the first attempt, 2 sec after the 2nd, 4 sec, 8 sec, 8 sec (because max delay time is 8 sec).
After the 5th attempt if the user fails again to login, this user will be 'locked'.

## LDAP specifics

If you have LDAP setup on your engine you need to handle the throttling on LDAP side. The login mechanism in your system will not be affected by the above properties.
