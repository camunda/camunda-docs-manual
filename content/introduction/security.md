---

title: 'Security'
weight: 60

menu:
  main:
    identifier: "user-guide-introduction-security"
    parent: "user-guide-introduction"

---

Security has a high priority at Camunda and is, therefore, an integral part of the platform. The Camunda platform contains several protection mechanisms to prevent unauthorized access to data. In this chapter, you get an introduction of Camunda's security features.

The following image depicts the components of the Camunda platform and add's marks to the parts that comprise potential security risks, which will then be explained more in depth in the respective subesctions:

{{< img src="../img/architecture-scurity-overview.png" >}}

   
   <font color="red">&#9312;</font> [Web applications](#web-applications): Web applications are an entry point to an insecure environment and need, thus, special treatment concerning security.
   
   <font color="red">&#9313;</font> [REST API](#rest-api): The interaction with offers a couple of security risks as the communication can be intercepted.
   
   <font color="red">&#9314;</font> [Java API](#java-api): The direct access to the engine can comprise problems, when the access control is not correctly configured.
   
   <font color="red">&#9315;</font> [File Repository](#file-repository): Embedded code offers great flexibility, but enables attackers to inject malicious code and, therefore, should be restricted.
   
   <font color="red">&#9316;</font> [Database](#database): All data is persisted to database and should be protected to prevent system flaws.  


# Web applications 

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

One way to access the process engine is, using the REST API. The authentication and, hence, the authorization is disabled by default. Again, that allows all people accessing the engine via REST API to use the full functionality of Camunda BPM. Users could see and modify data in an undesired way. For untrusted environments it thus makes sense to restrict the access. As a countermeasure ships the basic access authentication allowing to have access control. How you can adjust the API in such a way that it uses the authentication is described at [Configure Authorization]({{< relref "authorization-service.md" >}}).

Note that HTTP Basic Authentication does not provide encryption. If the network is open to untrusted people, an attacker can now act as [man-in-the-middle](https://en.wikipedia.org/wiki/Man-in-the-middle_attack). This allows him to monitor the whole network traffic and as such read all the data that is being transmitted between the users and the engine. That includes confidental data, such as username and password. As a consquence, the engine could be compromised, e.g., such that it accepts every request received. Therfore, it is highly recommended to secured the traffic by an SSL connection.

In some cases the basic authentication mechanism shipped with Camunda might not be sufficient as safety requirement or the REST API does only need a subset of the functionality the engine offers. Then consider to implement your own authentication framework according to your needs or restrict the access of the REST API to exactly that subset by [embedding the REST API]({{< relref "embeddability.md" >}}).

If you do not need the REST API in production, consider to fully undeploy the REST API Web Application, since it offers an unnecessary security risk in this case.

# Java API

The second way to access the process engine is, using the Java API. Usually, this way is used, when building your custom java application. However, it might not be required for the custom application or there end users to see or modify all data. Thus, there is the possibility to change data in an unintended way resulting in inappropriate behavior. In order to mitigate this risk, authorization checks for the Java API can be enabled. 

The authorization checks are turned on in the Camunda distributions per default, but need to be switched on manually when you configured your own engine (e.g. via Spring). However, even with authorization check enabled, you still need to tell the engine who is logged in with the current thread to make the check applied. If you access the API without setting the logged in user to the thread, you will provide full access to all data. 

In case you do not require authorizations, make sure that authorization checks are turned off, since they do have a performance impact. You might e.g. not need authorizations if you build your own custom web application handling authentication and authorization itself and just using Camunda in the background.

# File Repository

The process engine offers numerous extension points for customization of process behavior by using [Java Code]({{< relref "delegation-code.md" >}}), [Expression Language]({{< relref "expression-language.md" >}}), [Scripts]({{< relref "scripting.md" >}}) and [Templates]({{< relref "templating.md" >}}). While these extension points allow for great flexibility in process implementation, they open up the possibility to perform malicious actions when in the wrong hands. That means, users that are allowed to access to resources with embedded code to gain unauthorized access to other data. Especially software tampering is a problem, when attackers exploit the embedded code to  modify the systems runtime behavior to gain unauthorzied access. It is therefore advisable to restrict access to API that allows custom code submission to trusted parties only and sanitize the code input. See more in the documentation about [Custom Code & Security](securing-custom-code).

# Database

All the data is accessed, updated or stored in the database using JDBC. The user may choose the driver version of JDBC to obtain the newest version with all security updates. In order to prevent stealing the stored credentials, when the database is compromised, Camunda encrypts the passwords before persisting them. However, the database itself is the responsibility of the user and __not__ of Camunda. So make sure you maintain and protect the database in a sufficient manner. 

If you use Camunda BPM on a shared database, use authentication and authorization to isolate the Camunda engine from other applications. Otherwise, unauthorized users from other applications might change data in the database, which can lead to damage of the Camunda platform or even to a denial of service.
