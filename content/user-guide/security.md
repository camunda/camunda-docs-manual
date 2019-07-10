---

title: 'Security Instructions'
weight: 210

menu:
  main:
    identifier: "user-guide-security"
    parent: "user-guide"

---

This page provides an overview of how to secure a Camunda installation. For Camunda's security policy, a list of security notices and a guide how to report vulnerabilities, please visit the [general security documentation](/security).

In order to secure a Camunda installation, Camunda itself must be configured correctly and it must be integrated correctly into its environment. This section also identifies areas where we consider security issues to be relevant for the specific Camunda BPM product and listed those in the subsequent sections. Compliance for those areas is ensured based on common industry best practices and influenced by security requirements of standards like OWASP Top 10 and others

# Deployment Options and Components

There are different ways of using Camunda BPM and different components are provided: the process engine itself, the REST API, the web applications. Depending on how Camunda is deployed and which components are used, different security considerations apply. The following list gives a general overview over deployment options and components outlining the main differences from a security point of view. The remainder of this chapter elaborates on the different configuration options.

* Embedded Java library inside an application: in this case, the Camunda engine is embedded inside a custom Java Application. Usually the application takes care of securing access to Camunda's APIs and the APIs are not directly exposed to an end user. In this case, the application typically takes care of ensuring authentication and preventing access by unauthorized users.
* Shared Process Engine: in this scenario, the Process Engine is deployed as a container service into an application server such that it can be used by the applications deployed into the same container / server. This case is similar to the embedded Java library case.
* REST API: the REST API provides access to Camunda's core APIs through HTTP. In this case users can directly access Camunda's APIs. Usually, it is necessary to configure authentication, authorization and also secure the connection to the REST API using SSL (HTTPS).
* Web applications (Cockpit, Tasklist, ...): similar considerations to the REST API apply.


Keep in mind that it is not recommended to use the pre-packaged distribution in production environment rather install the full distribution manually (for example [Tomcat manual installation](https://docs.camunda.org/manual/latest/installation/full/tomcat/manual/)). We do not advise to use pre-packaged distribution in production because it is for user who need more getting started experience. In case you still want to use it, you should consider removing the invoice application and the demo user.

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

For the web applications, authentication is enabled by default and it is not possible to disable it.

### Internal (database backed) User Management

To perform authentication, Camunda can use two sources: a database or LDAP.

When using the the database, usernames and passwords are stored inside the `ACT_ID_USER` table (see [documentation on database schema]({{< ref "/user-guide/process-engine/database.md#identity" >}})). To protect the passwords stored in the database, Camunda uses two concepts:

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

## Throttle login attempts

The engine gives option to throttle login attempts. The mechanism behind this is enabled by default. You can read more about it under [Identity Service]({{< ref "/user-guide/process-engine/identity-service.md#throttle-login-attempts" >}}) in User Guide.

## Custom Whitelist for User, Group and Tenant IDs
To determine if the provided ID is acceptable or not, IDs can be matched against a Whitelist Pattern.
You can read more about it under [Identity Service]({{< ref "/user-guide/process-engine/identity-service.md#custom-whitelist-for-user-group-and-tenant-ids" >}}) in User Guide.

## Password Policy
For users that are managed within the engine (i.e. not LDAP-managed users) it is possible to specify a password policy to ensure that all user passwords meet a certain security standard. While choosing a strong password policy will make the users choose better passwords it can annoy them if the policy is too strict. Since version 7.11 a [default policy]({{< ref "/user-guide/process-engine/password-policy.md#default-password-policy" >}}) is available that requires passwords to follow only a few rules. However, a much higher level of security can be achieved by using a more sophisticated password policy. (e.g. by [password topology blacklisting] (https://blog.korelogic.com/blog/2014/04/04/pathwell_topologies), also see [OWASP guide] (https://github.com/OWASP/CheatSheetSeries/blob/7d94e9a29174b8fd76235ca60f47245d1f34df1e/cheatsheets/Authentication_Cheat_Sheet.md#password-complexity) on password complexity)

If you consider adding your own password policy you can find more information about how password policies in the engine work in our [Password Policy user guide]({{< ref "/user-guide/process-engine/password-policy.md" >}}).

## Script Execution

Camunda allows users to deploy scripts to be used by BPMN processes or DMN decision tables. This is a very flexible and powerful feature and facilitates changing business logic fast since generally scripts can be deployed at runtime without restarting the server.
However, script languages such as Groovy or Javascript are executed directly inside the same JVM which also hosts Camunda itself. It is not easily feasible to sandbox the execution of such scripts effectively which is why deployment of such scripts should only be allowed to trusted users. To achieve this:

* Control who can deploy scripts through the appropriate CREATE [authorizations]({{< ref "/user-guide/process-engine/authorization-service.md#resources" >}}) on the DEPLOYMENT resource.
* Consider disabling execution of scripts all together if the feature is not needed. See also: [Custom Code & Security
]({{< ref "/user-guide/process-engine/securing-custom-code.md" >}})

## Forms

Camunda offers different types of forms which are primarily used in Tasklist. In the input inside of this forms you can call and execute scripts which allows you to achieve easily your business logic. Please validate this input each time to prevent malicious behaviour.

## Expressions in Queries

Consider disabling execution of expressions in queries. See also: [Custom Code & Security
]({{< ref "/user-guide/process-engine/securing-custom-code.md" >}})

## Native queries

One of the options to query data from the engine is using native queries. Which means to provide own SQL queries to retrieve engine entities if the Query API lacks the possibilities you need.
However, use the native queries with care. Please bear in mind of the SQL Injection while using this approach.

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

## HTTP Header Security in Webapps

Out-of-the-box the web applications provide the following security-related HTTP headers:

* XSS Protection
* Content Security Policy
* Content-Type Options

These headers enable browser-side security mechanisms which help to improve the protection against several attacking scenarios.

According to your project requirements, some of these headers can be configured more strict or lax. Please see the 
documentation about the [HTTP Header Security]({{< ref "/webapps/shared-options/header-security.md" >}}) to learn more 
about the several headers, the defaults and how to configure the HTTP headers according to your needs.

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

The session cookies domain is configured in web server specific configuration. If you want to set such kind of cookies please consult the manual of your web server for details, e.g. for Tomcat check this [docs](https://tomcat.apache.org/tomcat-7.0-doc/config/context.html#Common_Attributes).

### Maximum POST size in server (REST API)

Restriction of the maximum size in bytes of the POST requests is specific to your web server. Please consult the manual of your web server for details, e.g. for Tomcat server, check this [documentation page](https://tomcat.apache.org/tomcat-8.0-doc/config/http.html#Common_Attributes).

### Securing Cookies (Web Applications)

The container provides the session cookie. Please consult the documentation about [Cookie Security]({{< ref "/webapps/shared-options/cookie-security.md" >}}) to learn what configurations are necessary to ensure full security for the session cookie.

### Error handling

The Webapps have a default error page which is displayed in case of unhandled Internal server errors. The REST API displays the type and short error message when an error is thrown.
