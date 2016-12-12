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

# <font color="red">&#9312;</font>  User 

The main web applications of Camunda BPM (Tasklist (link), Cockpit (link) and Admin (link)) are relevant when looking into the security aspects. The users of these web applications could be misused in an unwanted way. The details are described in the following. 
The user interfaces of the web applications display data of Camunda BPM to the user and offer possibilities to modify data. Therefore there exists a security risk that the users of these web applications are misused in order to get unwanted access to data or to trigger unwanted modifications of the data. 

The following features and options can be used in order to mitigate that risk.

1. Are the web applications actually used? If no, the solution is not to deploy them. 
2. User Management
2.1.1. Build in (incl password hashing) 
2.1.2 LDAP
2.2. Authorization
Authorization solves the problem that each user only has access to the data that he is allowed to see. The same applies to operations that allow the modification of data. Camunda BPM offers a wide range of different authorizations so that users are onyl allowed the stuff they should do. The authorizations are part of the backend, stored in the database and checked on the server side.
Management done in Camunda Admin...
3. Sessions of Web Apps
We do something with sessions...
4. Basic Assumption/Recommendations
Our security measures for the web apps are based on the assumption that customers operate them behind a firewall. We do not recomment to make them publictly available
Use HTTPS




The user's logging into the web applications (Tasklist, Cockpit, Admin) can always be a potential risk, as they might have access to confidential data or they want to modify the system in an undesirable way. For example, a task worker in the tasklist that checks, if a formular for loan application is correctly filled out, should not be able to see data such as the customers income. Therefore, it might be desired to restrict the scope of the task worker. Another problem could be a be malicios attackers that want to compromise the system, e.g., the customer approving the loan application although it should be rejected. 

In order to prevent that from happening, Camunda provides two mechanism:

1. **Authentication** allows to verify that the user is the one he claims to be. Hence, only users that are supposed to have access to the system, can log in by providing the credentials known to the system. By default, is a form based authentication turned on. So there is no further need for explicitely securing those systems.
2. **Authorization** allows to set permissions and restrictions for specific users or groups to access resources within Camunda, such as process definitions. Read more about it at [Authorization Service]({{< relref "authorization-service.md" >}}). Camunda already comes with a dedicated web interface, called [Authorization Management]({{< relref "authorization-management.md" >}}) to manage the authorizations. 

Please be aware, that if you are not using the the web applications or you do not need to restrict the user's accessibility (e.g. all system user's are fully trusted), this safety hazard is not a concern for you and you might omit it.

# <font color="red">&#9313;</font> REST API

One way to access the process engine is, using the REST API. In order to get a quick experience, the authentication and hence the authorization is disabled by default. If the network is open to untrusted people, an attacker can now act as [man-in-the-middle](https://en.wikipedia.org/wiki/Man-in-the-middle_attack). This allows him to monitor the whole network traffic and as such read all the data that is being transmitted between the users and the engine. As a consquence, again confidential data could be picked off or the engine could be compromised, e.g., such that it accepts every request received. 

For untrusted environments it thus makes sense to restrict the access. As a countermeasure ships the basic access authentication allowing to have access control. How you can adjust the API in such a way that it uses the authentication is described at [Configure Authentication]({{< relref "authorization-service.md" >}}).

In some cases the basic authentication mechanism shipped with Camunda might not be sufficient as safety requirement or the REST API does only need a subset of the functionality the engine offers. Then consider to implement your own authentication framework according to your needs or restrict the access of the REST API to exactly that subset by [embedding the REST API]({{< relref "embeddability.md" >}}).

If you do not need the REST API in production, consider to fully undeploy the REST API Web Application, since it offers an unnecessary security risk in this case.


# <font color="red">&#9314;</font> Java API

Java API

Full Access

Restrict access

You can switch authorization checks on or off for the Camunda engine itself. Authorisations will only be checked if you turn authorization checks on and tell the engine who is logged in with the current thread:

identityService.setAuthenticatedUserId("fozzie");

If you directly use the API and do not tell the process engine who is logged in with the current thread, it will provide full access to all data!

Authorization is switched on in the Camunda distributions per default, but if you configure and run your own engine (e.g. via Spring) it is disabled by default.
	For the authorization checks (to access specific resources), the engine does not question whether the authenticated user is known to the used IdentityService. As mentioned above, the engine treats users, groups and tenants as strings and grants access if those strings match with the defined authorization rules.

In case you do not require authorizations, make sure that authorization checks are turned off, since they do have a performance impact. You might e.g. not need authorizations if you build your own custom web application handling authentication and authorization itself and just using Camunda in the background.

If you have authorization switched on you might not want to have authorization checks when you execute Java code as part of your workflow. One example could be loading the number of running process instances to be used for some decision. In this case you can turn authorization checks for use code off.


# <font color="red">&#9315;</font> File Repository

The process engine offers numerous extension points for customization of process behavior by using Java Code, Expression Language, Scripts and Templates. While these extension points allow for great flexibility in process implementation, they open up the possibility to perform malicious actions when in the wrong hands. It is therefore advisable to restrict access to API that allows custom code submission to trusted parties only. Find more information on that topic in the User Guide.

-> wrong hand: specify that

# <font color="red">&#9316;</font> Database

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

The process engine offers numerous extension points for customization of process behavior by using [Java Code]({{< relref "delegation-code.md" >}}), [Expression Language]({{< relref "expression-language.md" >}}), [Scripts]({{< relref "scripting.md" >}}) and [Templates]({{< relref "templating.md" >}}). While these extension points allow for great flexibility in process implementation, they open up the possibility to perform malicious actions when in the wrong hands. It is therefore advisable to restrict access to API that allows custom code submission to trusted parties only. The following concepts exist that allow submitting custom code (via Java or REST API)

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
