---

title: 'Security'
weight: 60

menu:
  main:
    identifier: "user-guide-introduction-security"
    parent: "user-guide-introduction"

---

Security has a high priority at Camunda and is, therefore, an integral part of the platform. The Camunda platform contains several protection mechanisms to prevent unauthorized access to sensitive data. Here, you get an overview of Camunda's security features.

The following image depicts the components of the Camunda platform and add's marks to the parts that comprise potential security risks, which will then be explained more in depth in the respective subesctions:

{{< img src="../img/architecture-scurity-overview.png" >}}

Structure:
    
  <font color="red">&#9312;</font> [User](#user): short summary   
  <font color="red">&#9313;</font> [REST API](#rest-api): short summary   
  <font color="red">&#9314;</font> [Java API](#java-api): short summary   
  <font color="red">&#9315;</font> [File Repository](#file-repository): short summary   
  <font color="red">&#9316;</font> [Database](#database): short summary   


# User 

One potential security concern when looking at Camunda BPM are the web applications, especially [Tasklist]({{< ref "webapps/tasklist/index.md" >}}), [Cockpit]({{< ref "webapps/cockpit/index.md" >}}) and [Admin]({{< ref "webapps/admin/index.md" >}}). The users of these web applications could be impaired in a way, that the system gets compromised. The details on how to secure you Camunda web applications are in the following.
 
The user interfaces of the web applications display confidential data and provide resources to the user. That offers possibilities to modify data. Therefore, there is a security risk that users of these web applications are misused to gain unwanted access to data or to trigger undesired modifications of the data. 

The following features and options can be used in order to mitigate that risk:

* **User Management**:

    A common way of implementing access control into the system is using user management. In particular, it allows manage which user's are permitted to enter the system and which data they can see and modify. To limit to risk that a user modifies or sees unwarrantedly data, you should create a user for each porpose in the system.

    * Build in solution: A user refers to a human individual and a group is any custom defined "bundle" of users sharing some usage relevant attributes (like e.g. working on specific business functions). Every user needs to login with his credentials (username and password), so you cannot impersonate as someone else. All passwords and usernames are stored within the database (see [here]({{< relref "identity-service.md" >}}), whereas the passwords are stored encrypted so they cannot be stolen easily. That makes sure that every user has only the access right he is suppose to have.

    * LDAP: Instead of managing the users and groups within Camunda, it is also possible to obtain that information from a directory service database, which support [LDAP](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol) ("Lightweight Directory Access Protocol"), allowing to use a user management which is already set up (see [here]({{< relref "identity-service.md#the-ldap-identity-service" >}}) for more information).

* **Authentication**:

    Authentication allows to identify all user's that want to have access to Camunda BPM, thus, verifying that the user is the one he claims to be. Hence, only users that are supposed to have access to the system, can log in by providing the credentials known to the system. Only one username and password is required to access all applications that are available to the user. All passwords are encrypted and cannot be seen by others. By default, is a form based authentication turned on. So there is no further need for explicitely securing those systems.
    
* **Authorization**:

    Authorization solves the problem that each user only has access to the data that he is allowed to see. The same applies to operations that allow the modification of data. Camunda BPM offers specify the authorizations for a wide rage of resources so that user's are only allowed access the stuff they are supposed do. Camunda already comes with a dedicated web interface, called [Admin]({{< relref "authorization-management.md" >}}) to manage the authorizations. The authorizations themself are part of the backend, stored in the database and checked on the server side. This prevents attackers from forging requests to access functionality without proper authorization.

* **Additional considerations**

	Camunda makes certain assumptions on how the web applications are exposed to the public and how they are configured to make them secure:

    * Our security measures for the web applications are based on the assumption that customers operate on them behind a firewall, so the access to the web application is restricted to a trusted environment. We do not recomment to make them publicly available, as this opens up possible weak points to attackers. 
    * The Camunda web applications depend on a web application container (e.g. [Wildfly]({{< ref "installation/full/jboss/index.md" >}}) or [Tomcat]({{< ref "installation/full/tomcat/index.md" >}})). Therefore, it is importent to check and secure the default settings, e.g.:
      * Remove any default predefined users allowed to access your container’s administration console. Otherwise it would be possible to gain full access by using the default user profiles and, thus, compromising the Camunda platform.
      * Set a timeout for a session and tie session cookies to the IP address of the user to mitigate [session hijacking](https://en.wikipedia.org/wiki/Session_hijacking) such as Cross-site scripting.
      * Secure your communication using encrypted messages like HTTPS to prevent [man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack). Otherwise it would be possible to intercept the communication and forward modified messages.

* **Usage**

    Do you actually use the Camunda web applications? If not you should eleminate all the safety hazards mentioned above by not deploying the web applications. Omitting all unecessary applications is the safest and most efficient way of securing your system, since the attackers do not even have the possibility to use those systems vulnerabilities.
    

# REST API

One way to access the process engine is, using the REST API. In order to get a quick experience, the authentication and hence the authorization is disabled by default. If the network is open to untrusted people, an attacker can now act as [man-in-the-middle](https://en.wikipedia.org/wiki/Man-in-the-middle_attack). This allows him to monitor the whole network traffic and as such read all the data that is being transmitted between the users and the engine. As a consquence, again confidential data could be picked off or the engine could be compromised, e.g., such that it accepts every request received. 

For untrusted environments it thus makes sense to restrict the access. As a countermeasure ships the basic access authentication allowing to have access control. How you can adjust the API in such a way that it uses the authentication is described at [Configure Authentication]({{< relref "authorization-service.md" >}}).

In some cases the basic authentication mechanism shipped with Camunda might not be sufficient as safety requirement or the REST API does only need a subset of the functionality the engine offers. Then consider to implement your own authentication framework according to your needs or restrict the access of the REST API to exactly that subset by [embedding the REST API]({{< relref "embeddability.md" >}}).

If you do not need the REST API in production, consider to fully undeploy the REST API Web Application, since it offers an unnecessary security risk in this case.


# Java API

The second way to access the process engine is, using the Java API. This is the common way when using Camunda as an embedded engine with custom applications. The authorization checks are turned on in the Camunda distributions per default, but need to be switched on when you configured your own engine. However, even with authorization check enabled, you still need to tell the engine who is logged in with the current thread to make the check applied. If you access the API without setting the logged in user to the thread, you will provide full access to all data. That might not be the desired behavior, because typically the user should have just limited access.


You can switch authorization checks on or off for the Camunda engine itself. Authorisations will only be checked if you turn authorization checks on and tell the engine who is logged in with the current thread:

identityService.setAuthenticatedUserId("fozzie");

If you directly use the API and do not tell the process engine who is logged in with the current thread, it will provide full access to all data!

Authorization is switched on in the Camunda distributions per default, but if you configure and run your own engine (e.g. via Spring) it is disabled by default.
	For the authorization checks (to access specific resources), the engine does not question whether the authenticated user is known to the used IdentityService. As mentioned above, the engine treats users, groups and tenants as strings and grants access if those strings match with the defined authorization rules.

In case you do not require authorizations, make sure that authorization checks are turned off, since they do have a performance impact. You might e.g. not need authorizations if you build your own custom web application handling authentication and authorization itself and just using Camunda in the background.

If you have authorization switched on you might not want to have authorization checks when you execute Java code as part of your workflow. One example could be loading the number of running process instances to be used for some decision. In this case you can turn authorization checks for use code off.


# File Repository

The process engine offers numerous extension points for customization of process behavior by using [Java Code]({{< relref "delegation-code.md" >}}), [Expression Language]({{< relref "expression-language.md" >}}), [Scripts]({{< relref "scripting.md" >}}) and [Templates]({{< relref "templating.md" >}}). While these extension points allow for great flexibility in process implementation, they open up the possibility to perform malicious actions when in the wrong hands. It is therefore advisable to restrict access to API that allows custom code submission to trusted parties only. The following concepts exist that allow submitting custom code (via Java or REST API)

-> wrong hand: specify that

# Database
Additional considerations

All creadentials are stored via JDBC in the database. The user may choose the driver version of JDBC to get the newest version with all security updates. In order to prevent stealing the stored credentials, when the database is compromised, Camunda hashes/encrypts the passwords with a long key. However, we cannot guarantee give any security commitments related to the database as the database is maintained by the *user*. So make sure that you have a sufficient security barrier to secure your database and, thus, confidential data. 

# User Management

Camunda’s IdentityService allows to attach users to groups - we call this a group membership. Accordingly, attaching a user or group to a tenant creates a tenant membership.

## Authentication	

The process of authentication makes sure that the user is known to the Camunda engine. When directly using the Camunda Java API this must be done for each thread.

## Authorization

Permissions and restrictions for specific users or groups to access resources within Camunda (such as e.g. process definitions, tenants, process instances) are called authorizations. Because they relate users and groups to Camunda specific resources, they must of course always be managed in a Camunda specific way and be contained in the Camunda database.

Camunda comes with an AuthorizationService API (Java or REST) allowing to manage such Authorizations and also ships with a dedicated Admin application to manage them with a web interface. 

# Securing Camunda

## Securing the engine

You can switch authorization checks on or off for the Camunda engine itself. Authorisations will only be checked if you turn authorization checks on and tell the engine who is logged in with the current thread.

## Securing custom code



# Securing the Rest API



## Configuring the Identity Service

By default Camunda will access the users and groups directly managed within the Camunda Database. As an alternative to that explicitely enable read-only access to an LDAP-based user/group repository.

# Additional considerations

These are out of scope of camunda, because the user has to take care of this. Nevertheless, we want to remind the user to keep those into consideration, when using Camunda.

## Securing your Web Application Container

Make sure to secure your Web Application Container (e.g. Wildfly or Tomcat) by checking and securing default settings, e.g. removing any default predefined users allowed to access your container’s administration console.

## Securing your database

Depending on your database several attack scenarios might come up. Especially, attacks like SQL injection offer high security risks, as malicious attackers might gain access to sensitive data.

## Support Single Sign On

Single sign-on (SSO) is a property of access control of multiple related, but independent software systems. With this property a user logs in with a single ID and password to gain access to a connected system or systems without using different usernames or passwords, or in some configurations seamlessly sign on at each system.



It is essential to disallow unauthorized access by securing the Camunda Platform before going live with your process applications.



In addition, Permissions and restrictions for specific users or groups to access resources within Camunda (such as e.g. process definitions, tenants, process instances) are called authorizations. Because they relate users and groups to Camunda specific resources, they must of course always be managed in a Camunda specific way and be contained in the Camunda database.

Camunda ships also with a full user mangement, where you can, e.g., attach users to gropus. Read more about it at [identity service]({{< relref "identity-service.md" >}})

**Authorization** allows to set permissions and restrictions for specific users or groups to access resources within Camunda, such as process definitions. Read more about it at [Authorization Service]({{< relref "authorization-service.md" >}}). Camunda already comes with a dedicated web interface, called [Authorization Management]({{< relref "authorization-management.md" >}}) to manage the authorizations. 
