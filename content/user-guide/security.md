---

title: 'Security Instructions'
weight: 210

menu:
  main:
    identifier: "user-guide-security"
    parent: "user-guide"

---

This page provides an overview of how to secure a Camunda installation. For Camunda's security policy, a list of security notices and a guide how to report vulnerabilities, please visit the [general security documentation](/security).

In order to secure a Camunda installation, Camunda itself must be configured correctly and it must be integrated correctly into its environment. This section also identifies areas where we consider security issues to be relevant for the specific Camunda 7 product and listed those in the subsequent sections. Compliance for those areas is ensured based on common industry best practices and influenced by security requirements of standards like OWASP Top 10 and others

# Deployment Options and Components

There are different ways of using Camunda 7 and different components are provided: the process engine itself, the REST API, the web applications. Depending on how Camunda is deployed and which components are used, different security considerations apply. The following list gives a general overview over deployment options and components outlining the main differences from a security point of view. The remainder of this chapter elaborates on the different configuration options.

* Embedded Java library inside an application: in this case, the Camunda engine is embedded inside a custom Java Application. Usually the application takes care of securing access to Camunda's APIs and the APIs are not directly exposed to an end user. In this case, the application typically takes care of ensuring authentication and preventing access by unauthorized users.
* Shared Process Engine: in this scenario, the Process Engine is deployed as a container service into an application server such that it can be used by the applications deployed into the same container / server. This case is similar to the embedded Java library case.
* REST API: the REST API provides access to Camunda's core APIs through HTTP. In this case users can directly access Camunda's APIs. Usually, it is necessary to configure authentication, authorization and also secure the connection to the REST API using SSL (HTTPS).
* Web applications (Cockpit, Tasklist, ...): similar considerations to the REST API apply.


Keep in mind that it is not recommended to use the pre-packaged distribution in production environment rather install the full distribution manually (for example [Tomcat manual installation](https://docs.camunda.org/manual/latest/installation/full/tomcat/manual/)).

{{< note title="Security Consideration" class="warning" >}}
  The pre-packaged distribution is intended for users who want a getting started experience. In case
  you still want to use it in production, consider un-deploying the invoice application and removing the demo user.
{{</note>}}

# Security Configuration inside Camunda

Camunda provides a number of configuration options which are relevant from a security perspective. Most prominently: authentication, authorization and the control of custom code (scripts) which can be executed on the server.

## Authentication

Authentication controls _who_ can access Camunda's APIs and Applications.

### Do I need Authentication?

Authentication is only needed in the following cases:

* Camunda's REST API is used
* Camunda's web applications are used

In these cases, direct access to Camunda's core APIs is provided over HTTP and authentication must be enabled.

By contrast, authentication is generally not done by Camunda when embedded as a library into an application. In this case the application takes care of authentication itself.

### Enabling Authentication for the REST API

For ease of use by developers, the REST API's authentication is disabled by default. When deploying the REST API in production, it is therefore required to enable authentication. Check the corresponding section in the [REST API documentation]({{< ref "/reference/rest/overview/authentication.md" >}}).

### Authentication in the Web Applications

For the web applications, authentication is enabled by default, and it is not possible to disable it.

#### Authentication Cache

Due to the [authentication cache]({{< ref "/webapps/shared-options/authentication.md#cache" >}}), by default, **the following user management actions don't have an immediate effect** on currently active user sessions:

* A user account is deleted.
* A tenant/group membership or authorized application is added to or removed from a user account.

{{< note title="Heads-up!" class="warning" >}}
The user management actions mentioned above can allow the (deleted or unauthorized) user 
to continue to read sensitive data or perform security-sensitive operations until the 
authentication cache time to live is due; by default, this is for a maximum of five minutes.

To prevent this, you can:

* Set the time to live to a lower value.
* Disable the cache entirely (set the time to live to `0`), which leads
to querying for the authentication information on each REST API request.

Note that changing the time to live to a lower value can harm the performance of your database server.
{{< /note >}}

#### Enable authentication logging in the Camunda web apps

It is generally recommended to enable logging of log in attempts (successful and failed) as well as log out events.
In Camunda, you can enable authentication logging in the Camunda web apps by setting the `webappsAuthenticationLoggingEnabled` process engine [configuration flag]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#webappsAuthenticationLoggingEnabled" >}}) to true. All user-initiated log in and log out events will then be logged to the application log using the `org.camunda.bpm.webapp` [logger]({{< ref "/user-guide/logging.md#process-engine">}}).

The following events produce log statements:

* Successful log in with valid credentials
* Failed log in with wrong password
* Failed log in with insufficient authorization
* Failed log in with non-existing username
* Successful log out

{{< note title="Heads-up!" class="warning" >}}
Someone could use brute force to produce arbitrary amounts of log statements and potentially reduce disc space available for logging. This could theoretically lead to a denial of service if the logs are stored on the same partition as the application. Camunda does not handle such cases and the users are responsible to mitigate this risk, e.g. by [limiting log in attempts]({{< ref "/user-guide/process-engine/identity-service.md#throttle-login-attempts" >}}).
{{< /note >}}

### Internal (database backed) User Management

To perform authentication, Camunda can use two sources: a database or LDAP.

When using the database, usernames and passwords are stored inside the `ACT_ID_USER` table (see [documentation on database schema]({{< ref "/user-guide/process-engine/database/database-schema.md#identity" >}})). To protect the passwords stored in the database, Camunda uses two concepts:

* **hashing**: instead of storing the password in plain text, a hash is stored. When authenticating, the same hash is generated from the user's input and compared against the hash in the database. If both hashes are equal the authentication attempt is successful. Camunda allows users to configure and customize the hash function used. Please refer the [documentation section on password hashing]({{< ref "/user-guide/process-engine/password-hashing.md" >}}) for details.
* **salted hashes** to protect the database against rainbow table attacks, Camunda uses salted hashes. Similar to hashing itself, this function can be configured and extended to a user's needs. Please refer the [documentation section on password hashing]({{< ref "/user-guide/process-engine/password-hashing.md" >}}) for details.

### LDAP

As an alternative to the database, Camunda can use LDAP for verifying user credentials on authentication. Camunda has read-only access to LDAP.

## Authorization

Authorization controls what data a user can access and change in Camunda once authenticated. Authentication is a pre-requisite to authorization.

### Do I need to enable Authorizations?

Similar considerations as for authentication apply. For an in-depth discussion, see the documentation section on [authorizations]({{< ref "/user-guide/process-engine/authorization-service.md#when-is-authorization-required" >}})

### Restricting Data Access with Authorizations

Authorizations can be used to restrict a user from accessing a data object (such as a process or a task) and can be used to restrict how the user can interact with such data objects (read-only vs. modifications). Authorizations in Camunda are very powerful and it is recommended to read the corresponding [documentation entry on authorizations]({{< ref "/user-guide/process-engine/authorization-service.md" >}}).

### Prevent: Enumerating user accounts by brute-force creating new users

Under certain circumstances, an attacker can enumerate user accounts by brute-force creating new users:

You don't centrally manage user accounts (e.g., with the help of LDAP or a custom implementation of `WritableIdentityProvider`) but instead ...

*  ... use an account "self-service" approach: Unauthenticated users are allowed to create accounts; 
       i.e., you have implemented a custom REST endpoint which can create users without authentication
*  ... an authenticated user has `CREATE` permission on `ANY` `USER` resource to create new user accounts
       and an untrusted person has access to this account (please see the [Authorization Service] docs 
       to learn how permissions are granted to resources)

[Authorization Service]: {{< ref "/user-guide/process-engine/authorization-service.md" >}}

As soon as the attacker has obtained information about existing user ids, they can put all their 
efforts on cracking passwords.

{{< note title="Heads-up!" class="warning" >}}
We strongly recommend you to use the product with centrally managed user accounts. It is certainly not 
advisable to manage accounts via the ways mentioned above.
{{< /note >}}

We think that the before mentioned scenarios are uncommon for organizations using the Camunda 7 Runtime. 
However, we want to inform you about the options to prevent unrecommended usage, which makes the product
vulnerable to attacks.

### Prevent: Bypassing authorizations by reusing leftover user authorizations

When you delete a user, related user authorizations are not deleted automatically. 
Leftover user authorizations are reapplied when creating a new user with the same id, allowing attackers to bypass authorizations.

We designed the authorization schema like this because user accounts are usually centrally managed by an external directory service such as LDAP or a custom implementation of the `ReadonlyIdentityProvider` Java interface.
User authorizations cannot be automatically deleted in a technically feasible way since the external directory service does not notify Camunda when users are deleted.

{{< note title="Heads-up!" class="warning" >}}
Even if you don't manage your user accounts through an external directory service, user authorizations are not automatically deleted.
{{< /note >}}

To prevent this:

1. Use group instead of user authorizations when possible.
2. Complete tasks that were assigned to to-be-deleted users.
3. Delete user authorizations via Admin web app or APIs.
4. Don't allow to reuse an id of a deleted user.


## Spring Security OAuth2

See the Spring Security OAuth2 Integration's [Security Recommendations]({{< ref "/user-guide/spring-boot-integration/spring-security.md#security-recommendations" >}}) documentation.

## Deployments

[Deployments]({{< ref "/user-guide/process-engine/deployments.md" >}}) to the process engine can contain resources that are interpreted like code:

* BPMN, DMN, CMMN models that the process engine executes on the Camunda server
* Scripts and templates in various languages (Javascript, Groovy, Freemarker, ...) that the BPMN, DMN, CMMN models reference and that the process engine executes on the Camunda server
* Java EL expressions that BPMN, DMN, CMMN models include and that are executed on the Camunda server
* Forms that a client application like Camunda Tasklist renders in the browser of the end user

Camunda does not provide a safe sandbox environment for the execution and rendering of these resources. Attackers that are able to make deployments can effectively perform remote code execution in the Camunda system. It is therefore critical that only trusted users and systems can make deployments. 

For example, you can restrict deployment access in the following ways:

* Using [authorizations](#authorization), administrators grant the `CREATE` permission on the `Deployment` resource only to trusted users
* An application that embeds the Camunda Java API can choose to not expose the deployment API on untrusted channels (such as to HTTP requests)
* System administrators ensure that only trusted users have network access to the Camunda installation

See also the user guide section [Custom Code & Security]({{< ref "/user-guide/process-engine/securing-custom-code.md" >}}) for further information. 

## Throttle login attempts

The engine gives option to throttle login attempts. The mechanism behind this is enabled by default. You can read more about it under [Identity Service]({{< ref "/user-guide/process-engine/identity-service.md#throttle-login-attempts" >}}) in User Guide.

## Custom Whitelist for User, Group and Tenant IDs
To determine if the provided ID is acceptable or not, IDs can be matched against a Whitelist Pattern.
You can read more about it under [Identity Service]({{< ref "/user-guide/process-engine/identity-service.md#custom-whitelist-for-user-group-and-tenant-ids" >}}) in User Guide.

## Password Policy

When using the identity management provided by the engine (i.e., not the LDAP identity management),
it is possible to configure a password policy to ensure that all user passwords meet a certain security 
standard. 

Since version 7.11, a [built-in password policy]({{< ref "/user-guide/process-engine/password-policy.md#built-in-password-policy" >}}) 
can be enabled that requires passwords to follow specific rules. However, you can achieve a much higher 
level of security by implementing a more sophisticated custom password policy (e.g., with the help of 
[Password Topology Blacklisting] (https://blog.korelogic.com/blog/2014/04/04/pathwell_topologies), 
also see the [OWASP guide] (https://github.com/OWASP/CheatSheetSeries/blob/7d94e9a29174b8fd76235ca60f47245d1f34df1e/cheatsheets/Authentication_Cheat_Sheet.md#password-complexity) 
on password complexity).

You can find more information on how to enable the base password policy and how to implement a custom password policy in our [User Guide]({{< ref "/user-guide/process-engine/password-policy.md" >}}).

## Forms

Camunda offers different types of forms which are primarily used in Tasklist. In the input inside of this forms you can call and execute scripts which allows you to achieve easily your business logic. Please validate this input each time to prevent malicious behaviour.

If you don't want to display form previews and execute the embedded scripts in Cockpit, you can disable it in the [configuration]({{< ref "/webapps/cockpit/extend/configuration.md#preview-deployed-embedded-forms" >}}).

## Queries

### Expressions in Queries

Consider disabling execution of expressions in queries. See also: [Custom Code & Security
]({{< ref "/user-guide/process-engine/securing-custom-code.md" >}})

### Native queries

One of the options to query data from the engine is using native queries. Which means to provide own SQL queries to retrieve engine entities if the Query API lacks the possibilities you need.
However, use the native queries with care. Please bear in mind of the SQL Injection while using this approach.

### Maximum Results Limit in Queries

Using the REST API or the Webapps querying for results without restricting the maximum number of
results or querying  for a vast number of results can lead to a high memory consumption or even to
out of memory exceptions.

You can mitigate the risk of an attack by defining a limit for the maximum number of results
(`queryMaxResultsLimit`) in the [process engine configuration]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#queryMaxResultsLimit" >}}).

{{< note title="Heads-up!" class="info" >}}
To gain the full feature set of the Webapps, and not suffer any UX degradation due to unavailable data, the `queryMaxResultsLimit` must be set to `2000`.
{{< /note >}}

Please see the User Guide to learn more about the
[Query Maximum Results Limit]({{< ref "/user-guide/process-engine/process-engine-api.md#query-maximum-results-limit">}}).

## CSRF Prevention in the Webapps
A CSRF filter is enabled by default, validating each modifying request performed through the webapps.
Please also see the detailed overview on how to configure [CSRF Prevention]({{< ref "/webapps/shared-options/csrf-prevention.md" >}}).

The CSRF Prevention makes use of a cookie. By default, some security-related configurations are present for this cookie.
To ensure full security, please consult the documentation about [Cookie Security]({{< ref "/webapps/shared-options/cookie-security.md" >}}) to learn more about it.

## XML Security
Camunda handles many XML files containing configurations of process engines, definitions of process models and more. In order to mitigate possible vulnerabilities that can be introduced by XML files, the following measures are activated by default:

* Prevention against XML eXternal Entity (XXE) injections according to [OWASP](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.md)
* Feature Secure Processing (FSP) of XML files according to [Oracle](https://docs.oracle.com/javase/8/docs/api/javax/xml/XMLConstants.html#FEATURE_SECURE_PROCESSING) which introduces [limits](https://docs.oracle.com/javase/tutorial/jaxp/limits/limits.html) for several XML properties

If the limitations on XML files introduced by XXE prevention need to be removed, XXE processing can be enabled via `enableXxeProcessing` in the [process engine configuration]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#configuration-properties" >}}).

FSP itself can not be disabled in the engine. All properties that are influenced by this can however be configured in the environment via system properties and the `jaxp.properties` file. See the [Oracle documentation](https://docs.oracle.com/javase/tutorial/jaxp/limits/using.html) on how to determine the right limits and how to set them.

Since BPMN schema validation requires external XSD documents, the property `http://javax.xml.XMLConstants/property/accessExternalSchema` is by default configured to value `all`, which enables referencing XML schemas by any supported protocol. This can be overridden via the system property `javax.xml.accessExternalSchema`, however a value set via `jaxp.properties` does not take effect.

## HTTP Header Security in Webapps

Out-of-the-box the web applications support the following security-related HTTP headers:

* XSS Protection
* Content Security Policy
* Content-Type Options
* Strict Transport Security (needs to be enabled explicitly)

These headers enable browser-side security mechanisms which help to improve the protection against several attacking scenarios.

According to your project requirements, some of these headers can be configured more strict or lax. Please see the
documentation about the [HTTP Header Security]({{< ref "/webapps/shared-options/header-security.md" >}}) to learn more
about the several headers, the defaults and how to configure the HTTP headers according to your needs.

## Variable Values from Untrusted Sources

Process variables can be submitted as Java objects using the JDK built-in `application/x-java-serialized-object` data format, JSON or XML along with a Java class name via the Camunda REST API and web applications.
On server side, they can then be deserialized into Java objects, so that Java code can work with them in a native way. See [Camunda Spin]({{< ref "/user-guide/data-formats/configuring-spin-integration.md" >}}) for details and this {{< restref page="putLocalExecutionVariable" text="REST API endpoint" tag="Execution" >}} for an example.

If an attacker can access these endpoints, they can exploit so-called _serialization gadgets_, i.e. classes that run vulnerable code during deserialization resulting in remote code execution in the general case. For example, consider a class constructor that makes a REST request based on a field value. An attacker could submit a forged variable value so that during deserialization, when the constructor is called, the application server would make an arbitrary REST request to a destination of the attacker's choice. For details, see [OWASP's description of Deserialization of untrusted data](https://www.owasp.org/index.php/Deserialization_of_untrusted_data).

### Java objects using the JDK built-in `application/x-java-serialized-object` data format

Starting with version 7.9, by default, it is not possible to set variables of type `Object` **AND** the data format `application/x-java-serialized-object`.
The behavior can be restored with the process engine configuration flag [`javaSerializationFormatEnabled`]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#javaSerializationFormatEnabled" >}}).
However, please bear in mind that enabling the java serialization format might make the process engine vulnerable against the aforementioned attacking scenario.

### JSON/XML serialized objects using Spin

Therefore, we recommend enabling the whitelisting of allowed Java classes by enabling the property [deserializationTypeValidationEnabled]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#deserializationTypeValidationEnabled" >}}) in the process engine configuration. With this, the process engine validates the class names of submitted variables against a whitelist of allowed Java class and package names. Any non-whitelisted content is rejected. The default values are safe, but may be too restrictive for your use case. You can use the engine properties `deserializationAllowedPackages` and `deserializationAllowedClasses` to extend the default whitelist with package and class names of Java types that you consider save to deserialize in your environment.

In case this default behavior needs further adjustment, a custom validator can be implemented and registered in the engine with the engine property `deserializationTypeValidator`.
The provided object needs to be a subtype of `org.camunda.bpm.engine.runtime.DeserializationTypeValidator` and offer an implementation of the `#validate` method.
In case you want to rely on allowed package and class names from the engine configuration as well, you can provide a subtype of `org.camunda.bpm.engine.runtime.WhitelistingDeserializationTypeValidator`.
An implementation of this interface registered as validator will be provided with the defined packages and classes from the engine configuration upon initialization of the engine via `#setAllowedClasses` and `#setAllowedPackages`.

{{< note title="Jackson Type Whitelisting" class="info" >}}
  Spin's JSON implementation is based on Jackson. If you configure Camunda Spin to deserialize polymorphic classes based on type information included in the JSON itself (i.e. where the JSON contains explicit class names), we strongly recommend to additionally enable Jackson's [Whitelisting feature](https://medium.com/@cowtowncoder/jackson-2-10-safe-default-typing-2d018f0ce2ba) starting with version 2.10. Camunda's whitelisting feature does not cover this case.
{{< /note >}}

## User operation log settings for synchronous operations affecting multiple entities

Some of the synchronous APIs can be used to perform actions on multiple entities, potentially affecting large amounts of data. For some use-cases it is necessary to have a log of those
operations for audit reasons (see [Auditing of Cockpit Operations]({{< ref "/webapps/cockpit/auditing.md" >}}) for more information).

Without constraints, the process engine can create potentially unlimited numbers of user operation log entries. A user operation log entry technically consists of multiple database entries in
the `ACT_HI_OP_LOG` table. The amount of table entries depends on the number of properties logged for the user operation log. Example: A synchronous message correlation will log up to three properties (`messageName`, `nrOfVariables`, `processInstance`) depending on some conditions. A synchronous message correlation operation with 1000 affected process instances would yield 3000 new rows in the user operation log database table.

Using the process engine configuration flag `logEntriesPerSyncOperationLimit`, the number of created entries to the user operation log can be limited for synchronous API calls. By default, one operation log entry is written per API call, regardless of how many entities were affected (default property value is `1`).
If you choose to change `logEntriesPerSyncOperationLimit`, select a value that you are certain your system can handle.
For more information about the possible values for `logEntriesPerSyncOperationLimit`, visit the [configuration documentation]({{< ref "reference/deployment-descriptors/tags/process-engine.md#logEntriesPerSyncOperationLimit" >}}).

Currently, the following APIs are affected:

* Message correlation

# Security Configuration in the external Environment

Camunda integrates into an environment, most prominently the database and, when using the web applications or the REST API, also a webserver. In order to secure your Camunda deployment as a whole, the integration is relevant.

## Database

Camunda stores its data into a relational database. In order to protect access to this data, it must be configured correctly.
The documentation section on [supported environments]({{< ref "/introduction/supported-environments.md" >}}) provides a list of supported databases.

### Data encryption

To prevent unauthorized access to the data stored in the Camunda database you must follow best practices around operating the database, including data encryption. Please make sure to consult the manual provided by your database vendor.

### Securing the database connection

To access the database, Camunda needs to establish a connection. Usually the connection is configured either directly through the JDBC configuration options or through a _datasource_ configured inside the application server. Most database drivers support encrypted connections and transport layer security when connecting to the database. When operating Camunda and the database in an untrusted network it is recommended to enable these features. Please consider the manuals of your database, database driver and your application server to do so.

### Securing Database Credentials

To establish the connection to the database, the database credentials need to be provided. As opposed to providing the credentials as plain text in a configuration file, some application servers support storing the credentials securely in an encrypted form. In that case, consult the manual of your application server to learn how to use these features.

## Web Server (applicable when using REST API or Web Applications)

When deploying the REST API or the Camunda web applications, Camunda is integrated with a third party web server. The documentation section on [supported environments]({{< ref "/introduction/supported-environments.md" >}}) provides a list of supported web servers / application servers.
It is strongly recommended to consider applying the following configurations.

### Enabling SSL / HTTPS

Configure SSL / HTTPS when deploying the Camunda REST APIs or web applications. This can be achieved by configuring HTTPS either on the web server itself or through a reverse proxy. Consider disable HTTP and configure HTTPS only for your web applications. Please consult the manual of your web server or reverse proxy for details.

### Session timeout

Setting up the session timeout is usually done via `web.xml` deployment descriptor. Please consult the Java Servlet specification or manual of your application server.

### Cookies domain

The session cookies domain is configured in web server specific configuration. If you want to set such kind of cookies please consult the manual of your web server for details, e.g. for Tomcat check this [docs](https://tomcat.apache.org/tomcat-9.0-doc/config/context.html#Common_Attributes).

### Maximum POST size in server (REST API)

Restriction of the maximum size in bytes of the POST requests is specific to your web server. Please consult the manual of your web server for details, e.g. for Tomcat server, check this [documentation page](https://tomcat.apache.org/tomcat-9.0-doc/config/http.html#Common_Attributes).

### Securing Cookies (Web Applications)

The container provides the session cookie. Please consult the documentation about [Cookie Security]({{< ref "/webapps/shared-options/cookie-security.md" >}}) to learn what configurations are necessary to ensure full security for the session cookie.

### Error handling

When it comes to error handling, from a security perspective, the top goal is to prevent attackers 
from obtaining technical details about the system, which for example, a stack trace could reveal 
(see OWASP's [Improper Error Handling article] for more information).

[Improper Error Handling article]: https://www.owasp.org/index.php/Improper_Error_Handling

In this section, we describe what we do to prevent disclosing technical details about the system.

#### Webapps

In the Webapps, a generic default error page is provided when an error occurs. This error page does 
not include any technical details like stack traces.

#### REST API

The REST API only displays the type and a short error message when an error is thrown.

### Prevent Disclosure of Application Server Internals

In the [Error handling](#error-handling) paragraph, we explain our technical measures not to disclose 
any technical details about the Camunda 7 Runtime.

However, technical details cannot only be disclosed on the application level, but also by the application 
server itself. Therefore, it is recommended to configure the application server in a way that no 
technical details are disclosed when an error occurs on the application server level.

The exact configuration and the defaults differ among application servers. 

Please find below external documentation on how to configure your application server correctly:

* Tomcat 9.0+
    * Official Documentation
        * [Security Considerations](https://tomcat.apache.org/tomcat-9.0-doc/security-howto.html#Valves)
        * [Error Reporter Valve](https://tomcat.apache.org/tomcat-9.0-doc/config/valve.html#Error_Report_Valve)
    * Alternative Resources
        * [Securing Tomcat](https://wiki.owasp.org/index.php/Securing_tomcat)
* Wildfly 12.0+: Official Documentation
    * [Servlet Container Configuration](https://docs.jboss.org/author/display/WFLY/Undertow%20subsystem%20configuration.html#108626010_Undertowsubsystemconfiguration-Servletcontainerconfiguration)
    * [Model Reference](https://wildscribe.github.io/WildFly/12.0/subsystem/undertow/servlet-container/index.html#attr-stack-trace-on-error)
* JBoss EAP 7.0+: Official Documentation
    * [Servlet Container Configuration](https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/reference_material#idm139812627222560)
    * [Model Refernce](https://wildscribe.github.io/JBoss%20EAP/7.0/subsystem/undertow/servlet-container/index.html#attr-stack-trace-on-error)
* Camunda Run/Spring Boot 2.3+
    * Official Documentation
        * [Javadocs about ErrorProperties.IncludeStacktrace](https://docs.spring.io/spring-boot/docs/2.3.0.RELEASE/api/org/springframework/boot/autoconfigure/web/ErrorProperties.IncludeStacktrace.html)
    * Alternative Resources
        * [Error Handling on Baeldung](https://www.baeldung.com/spring-boot-configure-tomcat#2-error-handling)
