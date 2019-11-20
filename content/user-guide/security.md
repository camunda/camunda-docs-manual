---

title: 'Security Policy and Instructions'
weight: 210

menu:
  main:
    identifier: "user-guide-security"
    parent: "user-guide"

---

This page describes Camunda BPM (also referred to as the 'software')  from a security perspective. It has two parts:

1. **Security Policy**: Describes the software's security policy, including how we deal with security issues and how the security of the software is continuously maintained.

2. **Instructions for operating the software securely**: Provides an overview of how to secure a Camunda installation. In order to secure a Camunda installation, Camunda itself must be configured correctly and it must be integrated correctly into its environment. This section also identifies areas where we consider security issues to be relevant for the specific Camunda BPM product and listed those in the subsequent sections. Compliance for those areas is ensured based on common industry best practices and influenced by security requirements of standards like OWASP Top 10 and others.

# Security Policy

As a core infrastructure component of our customers, the security of the software takes top priority and is maintained constantly.

## Information Security Standards

The security of the areas listed in the next section is ensured based on common industry best practises. Thus, the development of the software is being influenced by standards like [OWASP Top 10](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project), [CVSS](https://www.first.org/cvss/) and others.

## Organizational Aspects of Security

### Roles and Responsibilities

Camunda's organizational structure includes a role dedicated to security. This role is assigned to a senior employee who is
responsible for the establishment, administration and maintenance of this policy.

### Security in context of the Systems Development Life Cycle ("SDLC")
Application and System development follows a defined methodology that contains a preliminary review of information security requirements to ensure the following minimum standards.

#### Segregation of duties
Segregation of duties is incorporated into the SDLC so that a single person is unable to introduce security vulnerabilities into the software. The team responsible for software development is separated from the team responsible for the regressions testing and delivery of the software.

#### On-Going Software Development
A formal change management process is used when making changes to the software which includes the following minimum standards:

1. Each code change by one software developer is reviewed and approved by a second software developer;
2. Changes to the software must not be packaged into the final software artefacts (which are provided for download to the customers) by the same person who does the development; and
3. A record of all changes to the software exists that identifies:
  * a brief description of each change that was made;
  * who made each change;
  * test cases for future automated regressions testing of this change;
  * who reviewed each change; and
  * the date and time when each change was made.

#### Review Frequency
Reviews of any new major or minor release shall be conducted to revalidate the software prior to making it available for download to the Customer.

#### Third Party Dependencies
Third party dependencies contained within the software are constantly being monitored. In case there are newer versions of these dependencies that include security relevant improvements, a plan to incorporate the updated versions is created.

### Onboarding of Employees

New software developers are being introduced to our security policy and best practices during their onboarding process.

## Security Issue Management

### Reporting Security Issues and Vulnerabilities

Making the software as secure as possible is an ongoing effort. If a security issue or vulnerability is discovered, it is reported through the [Jira Issue Tracker](http://app.camunda.com/jira). The risk associated with each security issue will be evaluated, documented, and is visible to customer as soon as possible after discovery.
Security issues discovered by our enterprise customers are treated as bugs and the agreed SLAs apply.

### Remediation
Camunda creates a remediation plan to resolve security issues that are identified. Fixes are made available in the form of patch releases (enterprise customers only) and minor releases (community platform users).

### Protection
Camunda will appropriately protect information regarding security issues and associated documentation to help limit the likelihood that vulnerabilities are exposed.


## Security Acceptance and Maintenance

### Acceptance
The software shall not be considered accepted until the security review has been completed and all security issues have been assigned to a remediation plan. The security review is part of the Regression Testing.

### Automatic Regression Testing
For a release to be accepted, several automated regression tests must be passed. Testing the security relevant aspects of the software is part of this regression test.

### Manual Regression Testing
For a release to be accepted, a manual regression test must be passed. Testing the security relevant aspects of the software is part of this manual regression test.

### Automatic Virus Scans
An automatic virus scan is part of our release process. Its catalogues are up to date and it is used to scan the released distributions our users can download.
In addition automatic virus scans are being performed on our core infrastructure components.


# Instructions for operating the software securely

## Deployment Options and Components

There are different ways of using Camunda BPM and different components are provided: the process engine itself, the REST API, the web applications. Depending on how Camunda is deployed and which components are used, different security considerations apply. The following list gives a general overview over deployment options and components outlining the main differences from a security point of view. The remainder of this chapter elaborates on the different configuration options.

* Embedded Java library inside an application: in this case, the Camunda engine is embedded inside a custom Java Application. Usually the application takes care of securing access to Camunda's APIs and the APIs are not directly exposed to an end user. In this case, the application typically takes care of ensuring authentication and preventing access by unauthorized users.
* Shared Process Engine: in this scenario, the Process Engine is deployed as a container service into an application server such that it can be used by the applications deployed into the same container / server. This case is similar to the embedded Java library case.
* REST API: the REST API provides access to Camunda's core APIs through HTTP. In this case users can directly access Camunda's APIs. Usually, it is necessary to configure authentication, authorization and also secure the connection to the REST API using SSL (HTTPS).
* Web applications (Cockpit, Tasklist, ...): similar considerations to the REST API apply.


Keep in mind that it is not recommended to use the pre-packaged distribution in production environment rather install the full distribution manually (for example [Tomcat manual installation](https://docs.camunda.org/manual/latest/installation/full/tomcat/manual/)). We do not advise to use pre-packaged distribution in production because it is for user who need more getting started experience. In case you still want to use it, you should consider removing the invoice application and the demo user.

## Security Configuration inside Camunda

Camunda provides a number of configuration options which are relevant from a security perspective. Most prominently: authentication, authorization and the control of custom code (scripts) which can be executed on the server.

### Authentication

Authentication controls _who_ can access Camunda's APIs and Applications.

#### Do I need Authentication?

Authentication is only needed in the following cases:

* Camunda's REST API is used
* Camunda's web applications are used

In these cases, direct access to Camunda's core APIs is provided over HTTP and authentication must be enabled.

By contrast, authentication is generally not done by Camunda when embedded as a library into an application. In this case the application takes care of authentication itself.

#### Enabling Authentication for the REST API

For ease of use by developers, the REST API's authentication is disabled by default. When deploying the REST API in production, it is therefore required to enable authentication. Check the corresponding section in the [REST API documentation]({{< ref "/reference/rest/overview/authentication.md" >}}).

#### Authentication in the Web Applications

For the web applications, authentication is enabled by default and it is not possible to disable it.

#### Internal (database backed) User Management

To perform authentication, Camunda can use two sources: a database or LDAP.

When using the the database, usernames and passwords are stored inside the `ACT_ID_USER` table (see [documentation on database schema]({{< ref "/user-guide/process-engine/database.md#identity" >}})). To protect the passwords stored in the database, Camunda uses two concepts:

* **hashing**: instead of storing the password in plain text, a hash is stored. When authenticating, the same hash is generated from the user's input and compared against the hash in the database. If both hashes are equal the authentication attempt is successful. Camunda allows users to configure and customize the hash function used. Please refer the [documentation section on password hashing]({{< ref "/user-guide/process-engine/password-hashing.md" >}}) for details.
* **salted hashes** to protect the database against rainbow table attacks, Camunda uses salted hashes. Similar to hashing itself, this function can be configured and extended to a user's needs. Please refer the [documentation section on password hashing]({{< ref "/user-guide/process-engine/password-hashing.md" >}}) for details.

#### LDAP

As an alternative to the database, Camunda can use LDAP for verifying user credentials on authentication. Camunda has read-only access to LDAP.

### Authorization

Authorization controls what data a user can access and change in Camunda once authenticated. Authentication is a pre-requisite to authorization.

#### Do I need to enable Authorizations?

Similar considerations as for authentication apply. For an in-depth discussion, see the documentation section on [authorizations]({{< ref "/user-guide/process-engine/authorization-service.md#when-is-authorization-required" >}})

#### Restricting Data Access with Authorizations

Authorizations can be used to restrict a user from accessing a data object (such as a process or a task) and can be used to restrict how the user can interact with such data objects (read-only vs. modifications). Authorizations in Camunda are very powerful and it is recommended to read the corresponding [documentation entry on authorizations]({{< ref "/user-guide/process-engine/authorization-service.md" >}}).

### Throttle login attempts

The engine gives option to throttle login attempts. The mechanism behind this is enabled by default. You can read more about it under [Identity Service]({{< ref "/user-guide/process-engine/identity-service.md#throttle-login-attempts" >}}) in User Guide.

### Script Execution

Camunda allows users to deploy scrips to be used by BPMN processes or DMN decision tables. This is a very flexible and powerful feature and facilitates changing business logic fast since generally scripts can be deployed at runtime without restarting the server.
However, script languages such as Groovy or Javascript are executed directly inside the same JVM which also hosts Camunda itself. It is not easily feasible to sandbox the execution of such scripts effectively which is why deployment of such scripts should only be allowed to trusted users. To achieve this:

* Control who can deploy scripts through the appropriate CREATE [authorizations]({{< ref "/user-guide/process-engine/authorization-service.md#resources" >}}) on the DEPLOYMENT resource.
* Consider disabling execution of scripts all together if the feature is not needed. See also: [Custom Code & Security
]({{< ref "/user-guide/process-engine/securing-custom-code.md" >}})

### Forms

Camunda offers different types of forms which are primarily used in Tasklist. In the input inside of this forms you can call and execute scripts which allows you to achieve easily your business logic. Please validate this input each time to prevent malicious behaviour.

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

Please see the User Guide to learn more about the
[Query Maximum Results Limit]({{< ref "/user-guide/process-engine/process-engine-api.md#query-maximum-results-limit">}}).

### CSRF Prevention in the Webapps
A CSRF filter is enabled by default, validating each modifying request performed through the webapps.
Please also see the detailed overview on how to configure [CSRF Prevention]({{< ref "/webapps/shared-options/csrf-prevention.md" >}}).

The CSRF Prevention makes use of a cookie. By default, some security-related configurations are present for this cookie.
To ensure full security, please consult the documentation about [Cookie Security]({{< ref "/webapps/shared-options/cookie-security.md" >}}) to learn more about it.

### XML Security
Camunda handles many XML files containing configurations of process engines, definitions of process models and more. In order to mitigate possible vulnerabilities that can be introduced by XML files, the following measures are activated by default:

* Feature Secure Processing (FSP) of XML files according to [Oracle](https://docs.oracle.com/javase/8/docs/api/javax/xml/XMLConstants.html#FEATURE_SECURE_PROCESSING) which introduces [limits](https://docs.oracle.com/javase/tutorial/jaxp/limits/limits.html) for several XML properties

FSP itself can not be disabled in the engine. All properties that are influenced by this can however be configured in the environment via system properties and the `jaxp.properties` file. See the [Oracle documentation](https://docs.oracle.com/javase/tutorial/jaxp/limits/using.html) on how to determine the right limits and how to set them.

Since BPMN schema validation requires external XSD documents, the property `http://javax.xml.XMLConstants/property/accessExternalSchema` is by default configured to value `all`, which enables referencing XML schemas by any supported protocol. This can be overridden via the system property `javax.xml.accessExternalSchema`, however a value set via `jaxp.properties` does not take effect.

Prevention against XML eXternal Entity (XXE) injections according to [OWASP](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.md)
can be activated by setting `enableXxeProcessing` to `false` in the [process engine configuration]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#configuration-properties" >}}).

### Variable Values from Untrusted Sources

Process variables can be submitted as JSON or XML along with a Java class name via the Camunda REST API and web applications.
On server side, they can then be deserialized into Java objects, so that Java code can work with them in a native way. See [Camunda Spin]({{< ref "/user-guide/data-formats/configuring-spin-integration.md" >}}) for details and this [REST API endpoint]({{< ref "/reference/rest/execution/local-variables/put-local-variable.md#example-2" >}}) for an example.

If an attacker can access these endpoints, they can exploit so-called _serialization gadgets_, i.e. classes that run vulnerable code during deserialization resulting in remote code execution in the general case. For example, consider a class constructor that makes a REST request based on a field value. An attacker could submit a forged variable value so that during deserialization, when the constructor is called, the application server would make an arbitrary REST request to a destination of the attacker's choice. For details, see [OWASP's description of Deserialization of untrusted data](https://www.owasp.org/index.php/Deserialization_of_untrusted_data).

Therefore, we recommend enabling the whitelisting of allowed Java classes by enabling the property [deserializationTypeValidationEnabled]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#deserializationTypeValidationEnabled" >}}) in the process engine configuration. With this, the process engine validates the class names of submitted variables against a whitelist of allowed Java class and package names. Any non-whitelisted content is rejected. The default values are safe, but may be too restrictive for your use case. You can use the engine properties `deserializationAllowedPackages` and `deserializationAllowedClasses` to extend the default whitelist with package and class names of Java types that you consider save to deserialize in your environment.

In case this default behavior needs further adjustment, a custom validator can be implemented and registered in the engine with the engine property `deserializationTypeValidator`.
The provided object needs to be a subtype of `org.camunda.bpm.engine.runtime.DeserializationTypeValidator` and offer an implementation of the `#validate` method.
In case you want to rely on allowed package and class names from the engine configuration as well, you can provide a subtype of `org.camunda.bpm.engine.runtime.WhitelistingDeserializationTypeValidator`.
An implementation of this interface registered as validator will be provided with the defined packages and classes from the engine configuration upon initialization of the engine via `#setAllowedClasses` and `#setAllowedPackages`.

{{< note title="Jackson Type Whitelisting" class="info" >}}
  Spin's JSON implementation is based on Jackson. If you configure Camunda Spin to deserialize polymorphic classes based on type information included in the JSON itself (i.e. where the JSON contains explicit class names), we strongly recommend to additionally enable Jackson's [Whitelisting feature](https://medium.com/@cowtowncoder/jackson-2-10-safe-default-typing-2d018f0ce2ba) starting with version 2.10. Camunda's whitelisting feature does not cover this case.
{{< /note >}}

## Security Configuration in the external Environment

Camunda integrates into an environment, most prominently the database and, when using the web applications or the REST API, also a webserver. In order to secure your Camunda deployment as a whole, the integration is relevant.

### Database

Camunda stores its data into a relational database. In order to protect access to this data, it must be configured correctly.
The documentation section on [supported environments]({{< ref "/introduction/supported-environments.md" >}}) provides a list of supported databases.

#### Data encryption

To prevent unauthorized access to the data stored in the Camunda database you must follow best practices around operating the database, including data encryption. Please make sure to consult the manual provided by your database vendor.

#### Securing the database connection

To access the database, Camunda needs to establish a connection. Usually the connection is configured either directly through the JDBC configuration options or through a _datasource_ configured inside the application server. Most database drivers support encrypted connections and transport layer security when connecting to the database. When operating Camunda and the database in an untrusted network it is recommended to enable these features. Please consider the manuals of your database, database driver and your application server to do so.

#### Securing Database Credentials

To establish the connection to the database, the database credentials need to be provided. As opposed to providing the credentials as plain text in a configuration file, some application servers support storing the credentials securely in an encrypted form. In that case, consult the manual of your application server to learn how to use these features.

### Web Server (applicable when using REST API or Web Applications)

When deploying the REST API or the Camunda web applications, Camunda is integrated with a third party web server. The documentation section on [supported environments]({{< ref "/introduction/supported-environments.md" >}}) provides a list of supported web servers / application servers.
It is strongly recommended to consider applying the following configurations.

#### Enabling SSL / HTTPS

Configure SSL / HTTPS when deploying the Camunda REST APIs or web applications. This can be achieved by configuring HTTPS either on the web server itself or through a reverse proxy. Consider disable HTTP and configure HTTPS only for your web applications. Please consult the manual of your web server or reverse proxy for details.

#### Session timeout

Setting up the session timeout is usually done via `web.xml` deployment descriptor. Please consult the Java Servlet specification or manual of your application server.

#### Cookies domain

The session cookies domain is configured in web server specific configuration. If you want to set such kind of cookies please consult the manual of your web server for details, e.g. for Tomcat check this [docs](https://tomcat.apache.org/tomcat-7.0-doc/config/context.html#Common_Attributes).

#### Maximum POST size in server (REST API)

Restriction of the maximum size in bytes of the POST requests is specific to your web server. Please consult the manual of your web server for details, e.g. for Tomcat server, check this [documentation page](https://tomcat.apache.org/tomcat-8.0-doc/config/http.html#Common_Attributes).

### Securing Cookies (Web Applications)

The container provides the session cookie. Please consult the documentation about [Cookie Security]({{< ref "/webapps/shared-options/cookie-security.md" >}}) to learn what configurations are necessary to ensure full security for the session cookie.

### Error handling

The Webapps have a default error page which is displayed in case of unhandled exceptions raised within the scope of the webapps. The REST API displays the type and short error message when an error is thrown. This practice prevents attackers from obtaining technical details about the system, which for example a stacktrace could reveal (see OWASP's [Improper Error Handling article](https://www.owasp.org/index.php/Improper_Error_Handling) for details).

On top of that, it is recommended to configure the application server in the same way for any exceptions raised within the scope of the server. The configuration is server-specific.

Related resources:

* [OWASP Securing Tomcat Guide](https://www.owasp.org/index.php/Securing_tomcat)
