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

This document guides you through the update from Camunda BPM `7.10.x` to `7.11.0`. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
1. For administrators and developers: [Full Distribution Update](#full-distribution)
1. For administrators: [Standalone Web Application](#standalone-web-application)
1. For developers: [Spring Boot Starter Update](#spring-boot-starter-update)
1. For developers: [camunda-engine-spring Update](#camunda-engine-spring-update)
1. For developers: [External Task Client Update](#external-task-client-update)
1. For developers: [Changes Affecting Custom Permissions/Resources](#changes-affecting-custom-permissions-resources)

This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.11.

Noteworthy new Features and Changes in 7.11:


# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< ref "/update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/service/rest/repository/browse/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.10_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.10_to_7.11.sql`

    The scripts update the database from one minor version to the next, and change the underlying database structure. So make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.11.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.

### MySQL/MariaDB Specifics

Due to the [Y2K38|https://en.wikipedia.org/wiki/Year_2038_problem] bug in MySQL and MariaDB, these two database systems represent the `TIMESTAMP` data type with a signed 32-bit integer. This limits the maximum date that can be stored to `03:14:07 on 19 January 2038 (UTC)`.

For this reason, all the `TIMESTAMP` columns that the Camunda engine uses to store future dates were migrated to the `DateTime` data type with a much larger time range.

Be aware that `DateTime` does not store time zone information. This means that, when applying the `[MySQL|MariaDB]_engine_7.10_to_7.11.sql` script, the database server time zone will be used to convert the `TIMESTAMP` into `DateTime` values. Any future time zone changes on the database server will offset the time stored in these columns causing an incorrect operation of the engine.

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda BPM 7.11 distribution for the application server you use. It contains the SQL scripts and libraries required for update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

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

There are no new mandatory dependencies for process applications.

# Standalone Web Application

If the standalone web application is in use, the current `war` artifact must be replaced by its new version.

If a database other than the default H2 database is used, the following steps must be taken:

1. Undeploy the current version of the standalone web application
2. Update the database to the new schema as described in the [database update](#database-updates) section
3. Reconfigure the database as described in the [installation]({{< ref "/installation/standalone-webapplication.md#database-configuration" >}})
   section
4. Deploy the new and configured standalone web application to the server

# Spring Boot Starter Update

If you are using Camunda Spring Boot Starter within you Spring Boot application, then you would need to:

1. Check [Version Compatibility Matrix]({{< ref "/user-guide/spring-boot-integration/version-compatibility.md" >}})
2. Update **Spring Boot Starter** and, when required, Spring Boot versions in your `pom.xml`.
3. Update the Camunda BPM version in your `pom.xml` in case you override it before (e.g. when using the enterprise version or a patch releases)

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

This section concerns you in case the [authorization checks]({{< ref "/user-guide/process-engine/authorization-service.md#enable-authorization-checks" >}}) are enabled and you have custom Permissions or Resources.

An Authorization assigns a set of Permissions to an identity to interact with a given Resource.
The build-in [Permissions] (https://docs.camunda.org/javadoc/camunda-bpm-platform/7.11/org/camunda/bpm/engine/authorization/Permissions.html) define the way an identity is allowed to interact with a certain resource.
The build-in [Resources](https://docs.camunda.org/javadoc/camunda-bpm-platform/7.11/org/camunda/bpm/engine/authorization/Resources.html) are the entities the user interacts with.

A custom Permission is a custom implementation of the [Permission] (https://docs.camunda.org/javadoc/camunda-bpm-platform/7.11/org/camunda/bpm/engine/authorization/Permission.html) interface.
Also a custom Resource is a custom implementation of the [Resource](https://docs.camunda.org/javadoc/camunda-bpm-platform/7.11/org/camunda/bpm/engine/authorization/Resource.html) interface.
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
      <td>Build-in Permissions <br>
          Build-in Resources</td>
      <td>None</td>
    </tr>
    <tr>
      <td>Custom Permissions <br>
          Build-in Resources</td>
      <td>
        <li>
          Implement the new <code>Permission#getResources()</code>
       </li>
       <li>
          Possible clash with newly introduced Permissions, please consider disabling those permissions via process engine configuration
          <a href="{{< ref "/reference/deployment-descriptors/tags/process-engine.md#disabledPermissions">}}">property</a>
       </li>
      </td>
    </tr>
    <tr>
      <td>Build-in Permissions <br>
          Custom Resources</td>
      <td>Create own Permission Enum where it must be specified the custom resource.</td>
    </tr>
    <tr>
      <td>Custom Permissions <br>
          Custom Resources</td>
      <td>Implement the new <code>Permission#getResources()</code></td>
    </tr>
    <tr>
      <td>Build-in Permissions are used for Build-in Resource different than defined by Camunda</td>
      <td>
        <li>
          Create own Permission Enum where it must be specified the custom resource.
        </li>
        <li>
          Possible clash with newly introduced Permissions, please consider disabling those permissions via process engine configuration
          <a href="{{< ref "/reference/deployment-descriptors/tags/process-engine.md#disabledPermissions">}}">property</a>
        </li>
      </td>
    </tr>
  </tbody>
</table>

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

You can also inspect the `DbIdentityServiceProvider` to see how the new return type is handled in the default implementation.