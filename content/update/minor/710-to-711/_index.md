---

title: "Update from 7.10 to 7.11"
weight: 42
layout: "single"

menu:
  main:
    name: "7.10 to 7.11"
    identifier: "migration-guide-710"
    parent: "migration-guide-minor"
    pre: "Update from `7.10.x` to `7.11.0`."

---

This document guides you through the update from Camunda `7.10.x` to `7.11.0`. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
1. For administrators and developers: [Full Distribution Update](#full-distribution)
1. For administrators: [Standalone Web Application](#standalone-web-application)
1. For developers: [Spring Boot Starter Update](#spring-boot-starter-update)
1. For developers: [camunda-engine-spring Update](#camunda-engine-spring-update)
1. For developers: [External Task Client Update](#external-task-client-update)
1. For developers: [Changes Affecting Custom Permissions/Resources](#changes-affecting-custom-permissions-resources)
1. For administrators and developers: [User Operation Log Permissions](#user-operation-log-permissions)
1. For developers: [Custom WritableIdentityProvider](#custom-writableidentityprovider)
1. For developers: [Exception Handling in Processes](#exception-handling-in-processes)
1. For developers: [Updated Front End Libraries](#updated-front-end-libraries)
1. For developers: [HTTP Header Security in Webapps](#http-header-security-in-webapps)

This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda 7.11.


# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< ref "/update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Artifact Repository](https://artifacts.camunda.com/artifactory/camunda-bpm/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.10_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.10_to_7.11.sql`

    The scripts update the database from one minor version to the next, and change the underlying database structure. So make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of Camunda 7, e.g., `7.11.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.

### MySQL/MariaDB Specifics

MySQL and MariaDB represent the `TIMESTAMP` data type with a signed 32-bit integer. This limits the maximum date that can be stored to `03:14:07 on 19 January 2038 (UTC)` (also referred to as the [Y2K38 problem](https://en.wikipedia.org/wiki/Year_2038_problem)).

For this reason, all the `TIMESTAMP` columns that the Camunda engine uses to store future dates were migrated to the `DATETIME` data type with a much larger time range.

Be aware that `DATETIME` does not store time zone information. This means that, when applying the `[MySQL|MariaDB]_engine_7.10_to_7.11.sql` script, the database server time zone will be used to convert the `TIMESTAMP` into `DATETIME` values. Any future time zone changes on the database server will offset the time stored in these columns causing an incorrect operation of the engine.

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda 7.11 distribution for the application server you use. It contains the SQL scripts and libraries required for update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

* [Apache Tomcat]({{< ref "/update/minor/710-to-711/tomcat.md" >}})
* [JBoss AS/Wildfly]({{< ref "/update/minor/710-to-711/jboss.md" >}})
* [IBM WebSphere]({{< ref "/update/minor/710-to-711/was.md" >}})
* [Oracle WebLogic]({{< ref "/update/minor/710-to-711/wls.md" >}})

## Custom Process Applications

For every process application, the Camunda dependencies should be updated to the new version. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`
* ...

There are no new mandatory dependencies for process applications. If your process application uses the `camunda-engine-spring` module, please make sure to read the [update section on camunda-engine-spring](#camunda-engine-spring-update).

# Standalone Web Application

If the standalone web application is in use, the current `war` artifact must be replaced by its new version.

If a database other than the default H2 database is used, the following steps must be taken:

1. Undeploy the current version of the standalone web application
2. Update the database to the new schema as described in the [database update](#database-updates) section
3. Reconfigure the database as described in the [installation]({{< ref "/installation/standalone-webapplication.md#database-configuration" >}})
   section
4. Deploy the new and configured standalone web application to the server

# Spring Boot Starter Update

If you are using Camunda Spring Boot Starter within you Spring Boot application, then you need to:

1. Check [Version Compatibility Matrix]({{< ref "/user-guide/spring-boot-integration/version-compatibility.md" >}})
2. Update **Spring Boot Starter** and, when required, Spring Boot versions in your `pom.xml`.
3. Update the Camunda 7 version in your `pom.xml` in case you override it before (e.g. when using the enterprise version or a patch releases)

# camunda-engine-spring Update

The module `camunda-engine-spring` has changed dependency scopes of the Spring framework from `compile` to `provided`.
If your application has a dependency on `camunda-engine-spring`, you must additionally declare explicit dependencies to at least the
following Spring artifacts:

```xml
<properties>
  <spring.version>YOUR SPRING VERSION</spring.version>
</properties>

<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-context</artifactId>
  <version>${spring.version}</version>
</dependency>
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-jdbc</artifactId>
  <version>${spring.version}</version>
</dependency>
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-tx</artifactId>
  <version>${spring.version}</version>
</dependency>
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-orm</artifactId>
  <version>${spring.version}</version>
</dependency>
```

# External Task Client Update

If you are using the **Camunda External Task Client**, please make sure to:

1. Check out the [Version Compatibility Matrix]({{< ref "/user-guide/ext-client/compatibility-matrix.md" >}})
2. Update the version in your `pom.xml` (Java) or `package.json` (NodeJs)

# Changes Affecting Custom Permissions/Resources

This section concerns you in case the [authorization checks]({{< ref "/user-guide/process-engine/authorization-service.md#enable-authorization-checks" >}}) are enabled and you use custom permissions or resources.

An Authorization assigns a set of Permissions to an identity to interact with a given Resource.
The build-in [Permissions] (https://docs.camunda.org/javadoc/camunda-bpm-platform/7.11/org/camunda/bpm/engine/authorization/Permissions.html) define the way an identity is allowed to interact with a certain resource.
The build-in [Resources](https://docs.camunda.org/javadoc/camunda-bpm-platform/7.11/org/camunda/bpm/engine/authorization/Resources.html) are the entities the user interacts with.

A custom Permission is a custom implementation of the [Permission] (https://docs.camunda.org/javadoc/camunda-bpm-platform/7.11/org/camunda/bpm/engine/authorization/Permission.html) interface.
A custom Resource is a custom implementation of the [Resource](https://docs.camunda.org/javadoc/camunda-bpm-platform/7.11/org/camunda/bpm/engine/authorization/Resource.html) interface.
In case you have at least one of these custom implementations please have a look at the table below what will be the impact for you:
<table class="table desc-table">
  <thead>
    <tr>
      <th>Scenario</th>
      <th>Impact</th>
    <tr>
  </thead>
  <tbody>
    <tr>
      <td>Built-in Permissions <br>
          Built-in Resources</td>
      <td>None</td>
    </tr>
    <tr>
      <td>Custom Permissions <br>
          Built-in Resources</td>
      <td>
        <li>
          Implement the new <code>Permission#getResources()</code> method. It must return all resources to which the permission applies.
       </li>
       <li>
          Possible clash with newly introduced Permissions. See below how to proceed.
       </li>
      </td>
    </tr>
    <tr>
      <td>Built-in Permissions <br>
          Custom Resources</td>
      <td>Create a dedicated `Permission` Enum that copies the permissions that you use and implement the <code>Permission#getResources()</code> method such that it returns the custom resource.</td>
    </tr>
    <tr>
      <td>Custom Permissions <br>
          Custom Resources</td>
      <td>
          Implement the new <code>Permission#getResources()</code> method. It must return all resources to which the permission applies.
      </td>
    </tr>
    <tr>
      <td>Built-in permissions are used for built-in resources in combinations other than than those defined by Camunda</td>
      <td>
        <li>
          Create a dedicated `Permission` Enum that copies the permissions that you use and implement the <code>Permission#getResources()</code> method such that it returns the resource you use them with.
        </li>
        <li>
          Possible clash with newly introduced Permissions. See below how to proceed.
        </li>
      </td>
    </tr>
  </tbody>
</table>

## How to avoid a permission clash

1. Check if any of your custom permissions is in conflict with one of the built-in permissions: Check the permission enums in the [org.camunda.bpm.engine.authorization](https://docs.camunda.org/javadoc/camunda-bpm-platform/7.11/index.html?org/camunda/bpm/engine/authorization/package-summary.html) package. Determine if there is any permission that applies to the same resource and has the same value as one of your custom permissions.
1. Deactivate this built-in permission via a [process engine configuration property]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#disabledPermissions">}}). Note that in this case Camunda no longer enforces the disabled permissions.

# User Operation Log Permissions

The authorization for user operation log entries has been adjusted. Entries that are created with Camunda 7.11 and higher and that are not related to process definition keys (e.g. case instances, batches, standalone tasks and standalone jobs) can no longer be read and deleted without proper authorization.

Instead, permissions `READ` and `DELETE` can be granted on the new resource `UserOperationLogCategory` with resource id set to a specific operation log category or `*` for all.

In order to read (or delete) entries that are related to process definitions, a user either needs

* permission `READ` (or `DELETE`) on resource `UserOperationLogCategory` with the resource id set to the respective category of the entry or `*`
* permission `READ_HISTORY` (or `DELETE_HISTORY`) on resource `ProcessDefinition` with the resource id set to the respective process definition key of the entry or `*`

In order to read (or delete) entries that are not related to process definitions, a user needs

* permission `READ` (or `DELETE`) on resource `UserOperationLogCategory` with the resource id set to the respective category of the entry or `*`

An overview of the operation logs and their categories can be found at [User Operation Log]({{< ref "/user-guide/process-engine/history/user-operation-log.md#glossary-of-operations-logged-in-the-user-operation-log" >}}).
Authorization management is detailed in [Authorization Service]({{< ref "/user-guide/process-engine/authorization-service.md" >}}).

# Custom WritableIdentityProvider

Custom implementations of the `WritableIdentityProvider` interface need to be adjusted to return the new type `IdentityOperationResult` for all CUD (Create, Update, Delete) operations.
This includes all interface methods except `createNewUser(String)`, `createNewGroup(String)` and `createNewTenant(String)`.

In order to return an instance of this type, you can easily change a current implementation from
```java
public void unlockUser(String userId) {
  UserEntity user = findUserById(userId);
  if (user != null && (user.getAttempts() > 0 || user.getLockExpirationTime() != null)) {
    getIdentityInfoManager().updateUserLock(user, 0, null);
  }
}
```
to
```java
public IdentityOperationResult unlockUser(String userId) {
  UserEntity user = findUserById(userId);
  if (user != null && (user.getAttempts() > 0 || user.getLockExpirationTime() != null)) {
    getIdentityInfoManager().updateUserLock(user, 0, null);
    return new IdentityOperationResult(user, IdentityOperationResult.OPERATION_UNLOCK);
  }
  return new IdentityOperationResult(null, IdentityOperationResult.OPERATION_NONE);
}
```

You can also inspect the [DbIdentityServiceProvider](https://github.com/camunda/camunda-bpm-platform/blob/7.11.0/engine/src/main/java/org/camunda/bpm/engine/impl/identity/db/DbIdentityServiceProvider.java) to see how the new return type is handled in the default implementation.

# Exception Handling in Processes

As of 7.11.0, exceptions thrown from execution and task listeners can trigger BPMN error events (for more information, please check the [User Guide]({{< ref "/user-guide/process-engine/delegation-code.md#throw-bpmn-errors-from-listeners" >}})). Accordingly, the semantics of existing processes may change if there is an error event that catches the exception.

# Updated Front End Libraries

With this release, we updated all front end libraries. Changes introduced with newer package versions might impacting:

* [Embedded Task Forms]({{< ref "/user-guide/task-forms#embedded-task-forms" >}})
* [Custom Scripts]({{< ref "/webapps/cockpit/extend/configuration.md#custom-scripts" >}})
* [Cockpit Plugins]({{< ref "/webapps/cockpit/extend/plugins.md" >}}) or [Tasklist Plugins]({{< ref "/webapps/tasklist/tasklist-plugins.md" >}})

Please find below a complete table of the updated front end libraries.

If you make use of these packages in your **Embedded Task Forms** as well as your **Custom Scripts**, please make sure that your
customizations still work as expected with the new versions used in Camunda 7.11.

<table class="table desc-table">
  <thead>
    <tr>
      <th>Package</th>
      <th>7.10</th>
      <th>7.11</th>
      <th>Further Reading</th>
    <tr>
  </thead>
  <tbody>
    <tr>
      <td>angular-moment</td>
      <td>0.9.0</td>
      <td>1.3.0</td>
      <td><a href="https://github.com/urish/angular-moment/releases">Release Notes</a></td>
    </tr>
    <tr>
      <td>angular-ui-bootstrap</td>
      <td>0.11.2</td>
      <td>2.5.0</td>
      <td><a href="https://github.com/angular-ui/bootstrap/blob/master/CHANGELOG.md">Change Log</a></td>
    </tr>
    <tr>
      <td>angularjs</td>
      <td>1.2.29</td>
      <td>1.7.8</td>
      <td><a href="https://docs.angularjs.org/guide/migration">Migration Guide</a></td>
    </tr>
    <tr>
      <td>bootstrap</td>
      <td>3.3.6</td>
      <td>3.4.1</td>
      <td><a href="https://github.com/twbs/bootstrap/releases">Release Notes</a></td>
    </tr>
    <tr>
      <td>bpmn-font</td>
      <td>0.2.0</td>
      <td>0.8.0</td>
      <td></td>
    </tr>
    <tr>
      <td>bpmn-js</td>
      <td>3.0.1</td>
      <td>3.2.1</td>
      <td><a href="https://github.com/bpmn-io/bpmn-js/blob/master/CHANGELOG.md">Change Log</a></td>
    </tr>
    <tr>
      <td>clipboard</td>
      <td>1.5.10</td>
      <td>2.0.4</td>
      <td><a href="https://github.com/zenorocha/clipboard.js/releases">Release Notes</a></td>
    </tr>
    <tr>
      <td>cmmn-js</td>
      <td>0.15.2</td>
      <td>0.17.1</td>
      <td><a href="https://github.com/bpmn-io/cmmn-js/blob/master/CHANGELOG.md">Change Log</a></td>
    </tr>
    <tr>
      <td>dmn-js</td>
      <td>5.2.0</td>
      <td>6.3.2</td>
      <td><a href="https://github.com/bpmn-io/dmn-js/blob/master/packages/dmn-js/CHANGELOG.md">Change Log</a></td>
    </tr>
    <tr>
      <td>events</td>
      <td>1.1.0</td>
      <td>3.0.0</td>
      <td><a href="https://github.com/Gozala/events/releases">Release Notes</a></td>
    </tr>
    <tr>
      <td>fast-xml-parser</td>
      <td>2.7.3</td>
      <td>3.12.14</td>
      <td><a href="https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/CHANGELOG.md">Change Log</a></td>
    </tr>
    <tr>
      <td>jquery</td>
      <td>2.1.1</td>
      <td>3.3.1</td>
      <td><a href="https://jquery.com/upgrade-guide/3.0/">Upgrade Guide</a></td>
    </tr>
    <tr>
      <td>jquery-ui</td>
      <td>1.10.5</td>
      <td>1.12.1</td>
      <td><a href="https://jqueryui.com/upgrade-guide/1.11/">Upgrade Guide 1.11</a>,<br> <a href="https://jqueryui.com/upgrade-guide/1.12/">Upgrade Guide 1.12</a></td>
    </tr>
    <tr>
      <td>lodash</td>
      <td>2.4.1</td>
      <td>4.17.11</td>
      <td><a href="https://github.com/lodash/lodash/wiki/Changelog">Changelog</a></td>
    </tr>
    <tr>
      <td>moment</td>
      <td>2.9.0</td>
      <td>2.24.0</td>
      <td><a href="https://github.com/moment/moment/blob/develop/CHANGELOG.md">Changelog</a></td>
    </tr>
    <tr>
      <td>mousetrap</td>
      <td>1.5.3</td>
      <td>1.6.3</td>
      <td><a href="https://github.com/ccampbell/mousetrap/releases">Release Notes</a></td>
    </tr>
    <tr>
      <td>q</td>
      <td>1.4.1</td>
      <td>1.5.1</td>
      <td><a href="https://github.com/kriskowal/q/blob/master/CHANGES.md">Changelog</a></td>
    </tr>
    <tr>
      <td>requirejs</td>
      <td>2.1.22</td>
      <td>2.3.6</td>
      <td><a href="https://requirejs.org/docs/download.html#releasenotes">Release Notes</a></td>
    </tr>
    <tr>
      <td>superagent</td>
      <td>1.4.0</td>
      <td>4.1.0</td>
      <td><a href="https://github.com/visionmedia/superagent/releases">Release Notes</a></td>
    </tr>
  </tbody>
</table>

## Noteworthy Changes

* Please pay especially attention to `angularjs` as it introduces a huge amount of changes
* The directive names of `angular-ui-bootstrap` are now prefixed (i. e. `uib-*`)
* In form names, special characters are [not allowed anymore](https://docs.angularjs.org/guide/migration#form)

# HTTP Header Security in Webapps

Starting with this release, a HTTP Header Security Servlet Filter is introduced for the Webapps. With Camunda 7.11.0 
we have added the XSS Protection Header to all server responses in conjunction with the Webapps.

## XSS Protection in Webapps

By default, the XSS Protection HTTP Header is configured in a way that a page gets blocked as soon as the browser detects 
a cross-site scripting attack. You can either loosen this behavior or even disable the XSS Protection Header. Learn more 
about how to configure the [HTTP Header Security Filter]({{< ref "/webapps/shared-options/header-security.md" >}}). 

For further reading on how the XSS protection header works in detail, 
please see [Mozillas MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection).

