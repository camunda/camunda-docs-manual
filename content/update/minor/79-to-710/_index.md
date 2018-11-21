---

title: "Update from 7.9 to 7.10"
weight: 47
layout: "single"

menu:
  main:
    name: "7.9 to 7.10"
    identifier: "migration-guide-79"
    parent: "migration-guide-minor"
    pre: "Update from `7.9.x` to `7.10.0`."

---

This document guides you through the update from Camunda BPM `7.9.x` to `7.10.0`. It covers these use cases:

1. For administrators and developers: [Database Updates](#database-updates)
2. For administrators and developers: [Full Distribution Update](#full-distribution)
3. For administrators: [Standalone Web Application](#standalone-web-application)

This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.10.

Noteworthy new Features and Changes in 7.10:

* [Support for CSRF Prevention in the Webapps]({{< relref "#support-for-csrf-prevention-in-the-webapps" >}})
* [Custom Whitelist for User, Group and Tenant IDs]({{< relref "#custom-whitelist-for-user-group-and-tenant-ids" >}})

# Database Updates

Every Camunda installation requires a database schema update.

## Procedure

1. Check for [available database patch scripts]({{< ref "/update/patch-level.md#database-patches" >}}) for your database that are within the bounds of your update path.
 Locate the scripts at `$DISTRIBUTION_PATH/sql/upgrade` in the pre-packaged distribution (where `$DISTRIBUTION_PATH` is the path of an unpacked distribution) or in the [Camunda Nexus](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/distro/camunda-sql-scripts/).
 We highly recommend to execute these patches before updating. Execute them in ascending order by version number.
 The naming pattern is `$DATABASENAME_engine_7.9_patch_?.sql`.

2. Execute the corresponding update scripts named

    * `$DATABASENAME_engine_7.9_to_7.10.sql`

    The scripts update the database from one minor version to the next, and change the underlying database structure. So make sure to backup your database in case there are any failures during the update process.

3. We highly recommend to also check for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to. Execute them in ascending order by version number. _Attention_: This step is only relevant when you are using an enterprise version of the Camunda BPM platform, e.g., `7.9.X` where `X > 0`. The procedure is the same as in step 1, only for the new minor version.

## DB2 Specifics

Within this release the `ACT_IDX_JOB_HANDLER` index is removed because causes problems on db2 databases. It could happen during applying the upgrade scripts an error message to occur which states that the index does not exist. This is not a real problem and you can continue with the upgrade procedure.

# Full Distribution

This section is applicable if you installed the [Full Distribution]({{< ref "/introduction/downloading-camunda.md#full-distribution" >}}) with a **shared process engine**.

The following steps are required:

1. Update the Camunda libraries and applications inside the application server
2. Migrate custom process applications

Before starting, make sure that you have downloaded the Camunda BPM 7.10 distribution for the application server you use. It contains the SQL scripts and libraries required for update. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## Wildfly distribution

Starting from Camunda BPM 7.10, only a single WildFly distribution, packaged with the latest version of the WildFly application server will be provided. For WildFly 10+, the update process remains the same.

For **WildFly 8** users, separate **`camunda-wildfly8-modules`** and **`camunda-wildfly8-subsystem`** archives have been provided.

## Camunda Libraries and Applications

Please choose the application server you are working with from the following list:

<!--* [Apache Tomcat]-->
* [Wildfly]({{< ref "/update/minor/79-to-710/jboss.md" >}})
<!--* [IBM WebSphere]-->
<!--* [Oracle WebLogic]-->

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

# Support for CSRF Prevention in the Webapps

The Webapps are more secure now. As of version 7.10, a CSRF filter is enabled by default, validating each modifying request performed through the webapps. The filter implements a (per-session) _Synchronization Token_ method for CSRF validation with an optional _Same Origin with Standard Headers_ verification.

If you would like to enable the additional _Same Origin with Standard Headers_ verification, the `targetOrigin` init-parameter should be set in the `web.xml` file of your application. That, and some additional optional initialization parameters are:

```xml
  <!-- CSRF Prevention filter -->
  <filter>
    <filter-name>CsrfPreventionFilter</filter-name>
    <filter-class>org.camunda.bpm.webapp.impl.security.filter.CsrfPreventionFilter</filter-class>
    <init-param>
      <param-name>targetOrigin</param-name>
      <param-value>http://example.com</param-value>
    </init-param>
    <init-param>
      <param-name>denyStatus</param-name>
      <param-value>404</param-value>
    </init-param>
    <init-param>
      <param-name>randomClass</param-name>
      <param-value>java.security.SecureRandom</param-value>
    </init-param>
    <init-param>
      <param-name>entryPoints</param-name>
      <param-value>/api/engine/engine/default/history/task/count, /api/engine/engine/default/history/variable/count</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>CsrfPreventionFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
```

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>targetOrigin</td>
    <td>Application expected deployment domain: the domain name through which the webapps are accessed. If nothing is set, the _Same Origin with Standard Headers_ verification is not performed.</td>
  </tr>
  <tr>
    <td>denyStatus</td>
    <td>HTTP response status code that is used when rejecting denied request. The default value is 403.</td>
  </tr>
  <tr>
    <td>randomClass</td>
    <td>The name of the class to use to generate tokens. The class must be an instance of `java.util.Random`. If not set, the default value of `java.security.SecureRandom` will be used.</td>
  </tr>
  <tr>
    <td>entryPoints</td>
    <td>Entry points are URLs that will not be tested for the presence of a valid token. They are used to provide a way to navigate back to the protected apps after navigating away from them.</td>
  </tr>
</table>

# Custom Whitelist for User, Group and Tenant IDs

From version 7.10, User, Group and Tenant IDs can be matched against a Whitelist Pattern to determine if the provided ID is acceptable or not. The default (global) Regular Expression pattern to match against is **"[a-zA-Z0-9]+|camunda-admin"** i.e. any combination of alphanumeric values or _'camunda-admin'_.

If your organisation allows the usage of additional characters (ex.: special characters), the ProcessEngineConfiguartion propery `generalResourceWhitelistPattern` should be set with the appropriate pattern in the engine's configuration file. Standard [Java Regular Expression](https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html) syntax can be used. For example, to accept any character, the following property value can be used:

```xml
<property name="generalResourceWhitelistPattern" value=".+"/>
```

The definition of different patterns for User, Group and Tenant IDs is possible by using the appropriate configuration propery:

```xml
<property name="userResourceWhitelistPattern" value="[a-zA-Z0-9-]+" />
<property name="groupResourceWhitelistPattern" value="[a-zA-Z]+" />
<property name="tenantResourceWhitelistPattern" value=".+" />
```

Note that if a certain pattern isn't defined (ex. the tenant whitelist pattern), the general pattern will be used, either the default one (`"[a-zA-Z0-9]+|camunda-admin"`) or one defined in the configuration file.

# Support for JDK 9 / 10 / 11
This release introduces support for JDK 9 / 10 / 11.

## JRuby

The Camunda BPM Platform [supports scripting]({{< ref "/user-guide/process-engine/scripting.md" >}}) with JSR-223 compatible 
script engine implementations. 

If the optional JRuby script engine implementation is used, the respective dependency needs to be updated to 
[version 9.1.14.0](http://jruby.org/2017/11/08/jruby-9-1-14-0.html) or higher to work properly in conjunction with the 
newly supported JDK versions.

{{< note title="Heads Up!" class="info" >}}
Please bear in mind, that the default language level of JRuby 9 is Ruby 2, whereas the default language level of the 
previous version (JRuby 1.7) is Ruby 1.9. Updating the JRuby version might break your scripts.
{{< /note >}}

# History

## Skipped Optimistic Locking Exceptions

Starting with 7.10, by default the occurrence of [`OptimisticLockingException`s]({{< ref "/user-guide/process-engine/transactions-in-processes.md#optimistic-locking-in-camunda" >}}) 
on UPDATE/DELETE operations for historic data is prevented. This allows to successfully complete process instances even 
if the associated historic instances have been removed during execution.

There exist a [process engine configuration flag]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#skipHistoryOptimisticLockingExceptions" >}}) 
to preserve the previous behavior.

## Changed Default Cleanup Strategy

The default strategy of the [History Cleanup]({{< ref "/user-guide/process-engine/history.md#history-cleanup">}}) feature 
has been changed. From now on, each historic instance related to processes, decisions or batches needs a 
[removal time]({{< ref "/user-guide/process-engine/history.md#removal-time">}}) for being cleaned-up.

Historic instances which (1) have been produced by a Camunda BPM version prior to 7.10 and (2) belong to a top-level instance 
which has been completed already cannot be cleaned-up after the migration took place. This is due to the reason, that a 
removal time is missing for these historic instances. If you want to get rid of them anyway, please add a removal time 
or switch the `historyCleanupStrategy` to the `endTimeBased` cleanup strategy via a 
[process engine configuration property]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#historyCleanupStrategy" >}}).

To gain a better understanding of the new cleanup strategy, please see the updated documentation about the 
[History Cleanup]({{< ref "/user-guide/process-engine/history.md#history-cleanup">}}) feature. 

### Custom History Level
If you have implemented a [Custom History Level]({{< ref "/user-guide/process-engine/history.md#implement-a-custom-history-level">}}) 
and you want to use it in conjunction with the removal time based cleanup strategy, please also see the documentation about 
[Removal Time Inheritance]({{< ref "/user-guide/process-engine/history.md#removal-time-inheritance">}}).

# Webjar structure changed

Structure of `webjar` and `webjar-ee` artifacts has changed related to adjustment of index.html path. The new structure is as follows:
```
/META-INF/resources
    |--/plugin
    |   |--/admin
    |   |--/cockpit
    |   |--/tasklist
    |--/webjars/camunda
        |--/app
        |--/lib
        |--index.html
        |--securityFilterRules.json
```

