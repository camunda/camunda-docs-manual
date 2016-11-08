---

title: 'Authorization Service'
weight: 240

menu:
  main:
    identifier: "user-guide-process-engine-authorization-service"
    parent: "user-guide-process-engine"

---

Camunda allows users to authorize access to the data it manages. This makes it possible to configure which user can access which process instances, tasks, etc...

Authorization has a performance cost and introduces some complexity. It should only be used if required.

# When is Authorization required?

Not every Camunda setup needs to enable authorization. In many scenarios, Camunda is embedded into an application and the application itself ensures that users can only access data they are authorized to access. Generally speaking, authorization is only required if untrusted parties interact with the process engine API directly. If you embed the process engine into a Java application, you usually do not need to enable authorization. The application can control how the API is accessed.

Situations in which authorization is required:

* Camunda Rest API is made accessible to users who should not have full access, even after authentication.
* Camunda Webapplication is made accessible to users who should not have full access, even after authentication.
* Other situations in which an untrusted user can directly construct the queries and commands executed on the process engine.

Situations in which authorization is *not* required

* An application completely controls the API methods invoked on the process engine.
* Camunda Webapplication is made accessible to users who can have full access after authentication.

**Example**

Assume that you have the following authorization requirement: *As a regular user, I can only see the tasks that are assigned to me.*

If the engine is embedded into a Java application, the application can easily ensure this by restricting the task query on the `assignee` property. The application can guarantee this since the Camunda API is not directly exposed to the user.

By contrast, if the Camunda Rest API is directly exposed over the network to a Javascript application, then a malicious user, once authenticated, can send a request to the server querying all tasks, even the ones that are not assigned to this user. In this case, authorization needs to be turned on to ensure the user only sees the tasks which he is authorized to see, regardless of the query parameters.

# Basic Principles

## Authorizations

An Authorization assigns a set of Permissions to an identity to interact with a given Resource.

**Examples**

* User 'jonny' is authorized to create new users
* Group 'marketing' is not authorized to delete the Group 'sales'
* Group 'marketing' is not allowed to use the tasklist application.

## Identities

Camunda BPM distinguishes between two types of identities: users and groups. Authorizations can either range over all users (userId = ANY), an individual user or a group of users.


## Permissions

A Permission defines the way an identity is allowed to interact with a certain resource.

The following permissions are available:

* None
* All
* Read
* Update
* Create
* Delete
* Access
* Read Task
* Update Task
* Task Work
* Task Assign
* Create Instance
* Read Instance
* Update Instance
* Migrate Instance
* Delete Instance
* Read History
* Delete History

Please note that the permission "None" does not mean that no permissions are granted, it stands for "no action".
Also, the "All" permission will vanish from a user if a single permission is revoked.

A single authorization object may assign multiple permissions to a single user and resource:

```java
authorization.addPermission(Permissions.READ);
authorization.addPermission(Permissions.UPDATE);
authorization.addPermission(Permissions.DELETE);
```

## Resources

Resources are the entities the user interacts with.

The following resources are available:

<table class="table matrix-table table-condensed table-hover table-bordered">
  <tr>
    <th>Resource Name</th>
    <th>Integer representation</th>
  </tr>
  <tr>
    <td>Application (Cockpit, Tasklist, ...)</td>
    <td>0</td>
  </tr>
  <tr>
    <td>Authorization</td>
    <td>4</td>
  </tr>
  <tr>
    <td>Batch</td>
    <td>13</td>
  </tr>
  <tr>
    <td>Decision Definition</td>
    <td>10</td>
  </tr>
  <tr>
    <td>Decision Requirements Definition</td>
    <td>14</td>
  </tr>
  <tr>
    <td>Deployment</td>
    <td>9</td>
  </tr>
  <tr>
    <td>Filter</td>
    <td>5</td>
  </tr>
  <tr>
    <td>Group</td>
    <td>2</td>
  </tr>
  <tr>
    <td>Group Membership</td>
    <td>3</td>
  </tr>
  <tr>
    <td>Process Definition</td>
    <td>6</td>
  </tr>
  <tr>
    <td>Process Instance</td>
    <td>8</td>
  </tr>
  <tr>
    <td>Task</td>
    <td>7</td>
  </tr>
  <tr>
    <td>Tenant</td>
    <td>11</td>
  </tr>
  <tr>
    <td>Tenant Membership</td>
    <td>12</td>
  </tr>
  <tr>
    <td>User</td>
    <td>1</td>
  </tr>      
</table>


## Authorization Type

There are three types of authorizations:

* Global Authorizations (`AUTH_TYPE_GLOBAL`) range over all users and groups (`userId = ANY`) and are usually used for fixing the "base" permission for a resource.
* Grant Authorizations (`AUTH_TYPE_GRANT`) range over users and groups and grant a set of permissions. Grant authorizations are commonly used for adding permissions to a user or group that the global authorization revokes.
* Revoke Authorizations (`AUTH_TYPE_REVOKE`) range over users and groups and revoke a set of permissions. Revoke authorizations are commonly used for revoking permissions to a user or group the the global authorization grants.

{{< note class="warning" title="Performance of REVOKE Authorizations" >}}
See the [Performance Considerations]({{< relref "#performance-considerations" >}}) section on this Page.
{{< /note >}}

## Authorization Precedence

Authorizations may range over all users, an individual user or a group of users, or they may apply to an individual resource instance or all instances of the same type (resourceId = ANY). The precedence is as follows:

* An authorization applying to an individual resource instance precedes over an authorization applying to all instances of the same resource type.
* An authorization for an individual user precedes over an authorization for a group.
* A Group authorization precedes over a GLOBAL authorization.
* A Group GRANT authorization precedes over a Group REVOKE authorization.
* A User GRANT authorization precedes over a User REVOKE authorization.

## When are Authorizations checked?

Authorizations are checked if

* the configuration option `authorizationEnabled` is set to `true` (default value is `false`).
* there is a currently authenticated user.

The last item means that even if authorization is enabled, authorization checks are only performed if a user is currently authenticated.
If no user is authenticated, then the engine does not perform any checks.

When using the Camunda Webapps, it is always ensured that a user is authenticated before the user can access any restricted resources.
When embedding the process engine into a custom application, the application needs to take care of authentication if it needs authorization checks to be performed.

{{< note class="info" title="Authentication vs. Authorization" >}}
Authentication and Authorization are two distinct concepts as explained [here](https://en.wikipedia.org/wiki/Authentication#Authorization).
{{< /note >}}

# Permissions by Resource

This section explains which permissions are available on which resources.

## Read, Update, Create, Delete

The permissions Read, Update, Create and Delete are available for most of the resources.
The following table gives an overview for which resources they are available:

<table class="table matrix-table table-condensed table-hover table-bordered">
<thead>
  <tr>
    <th></th>
    <th>Read</th>
    <th>Update</th>
    <th>Create</th>
    <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Authorization</th>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>Batch</th>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>Decision Definition</th>
      <td>X</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Decision Requirements Definition</th>
      <td>X</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Deployment</th>
      <td>X</td>
      <td></td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>Filter</th>
      <td>X</td>
      <td>X</td>
      <td></td>
      <td>X</td>
    </tr>
    <tr>
      <th>Group</th>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>Group Membership</th>
      <td></td>
      <td></td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>Process Definition</th>
      <td>X</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Process Instance</th>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>Task</th>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>Tenant</th>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>Tenant Membership</th>
      <td></td>
      <td></td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>User</th>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
    </tr>
  </tbody>
</table>

## Additional Task Permissions

This section explains the additional permissions that are available on the Task resource (in addition to Create, Update, Read and Delete).

A user can perform different actions on a task, like assigning the task, claiming the task or completing the task.
If a user has "Update" permission on a task (or "Update Task" permission on the corresponding process definition) then the user is authorized to perform _all_ these task actions.
If finer grained authorizations are required, the permissions "Task Work" and "Task Assign" can be used.
The intuition behind "Task Work" is that it only authorizes the user to _work_ on a task (i.e., claim and complete it) but not assign it to another user or in another way "distribute work" to colleagues.

The table below shows a detailed overview on which permissions authorize a user to perform which task actions:

<table class="table matrix-table table-condensed table-hover table-bordered">
<thead>
  <tr>
    <th></th>
    <th>Task Work</th>
    <th>Task Assign</th>
    <th>Update</th>
    </tr>
  </thead>
  <tbody>
     <tr>
      <th>Claim</th>
      <td>X</td>
      <td></td>
      <td>X</td>
    </tr>
    <tr>
      <th>Complete</th>
      <td>X</td>
      <td></td>
      <td>X</td>
    </tr>
    <tr>
      <th>Add Candidate User</th>
      <td></td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>Delete Candidate User</th>
      <td></td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>Set Assignee</th>
      <td></td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>Set Owner</th>
      <td></td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>Add Candidate Group</th>
      <td></td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>Delete Candidate Group</th>
      <td></td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>Save Task</th>
      <td></td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>Set Task Priority</th>
      <td></td>
      <td>X</td>
      <td>X</td>
    </tr>
	<tr>
      <th>Set Task Variable</th>
      <td></td>
      <td></td>
      <td>X</td>
    </tr>
	<tr>
      <th>Remove Task Variable</th>
      <td></td>
      <td></td>
      <td>X</td>
    </tr>
  </tbody>
</table>

GRANT and REVOKE authorizations with Task Work and Task Assign permissions precede over Update and Update Task.

### Default Task Permissions

When a user is related to a task by being an assignee, a candidate user, a part of a candidate group or an owner, then these users
get the default permission as either "Task Work" or "Update", based on the configuration setting "defaultUserPermissionNameForTask". 

If the "defaultUserPermissionNameForTask" is not set, then by default UPDATE permission is granted.

## Additional Process Definition Permissions

In Addition to Update, Read and Delete, the following permissions are available on the Process Definition Resource:

* Read Task
* Update Task
* Task Work
* Task Assign
* Create Instance
* Read Instance
* Update Instance
* Migrate Instance
* Delete Instance
* Read History
* Delete History

The "Create Instance" permission is required to start new process instances.

## Additional Decision Definition Permissions

In Addition to Update, Read and Delete, the following permissions are available on the Decision Definition Resource:

* Create Instance
* Read History
* Delete History

The "Create Instance" permission is required to evaluate decisions with the decision service.

## Application Permissions

The resource "Application" uniquely supports the "Access" permission.
The Access permission controls whether a user has access to a Camunda webapplication or not. Out of the box, it can be granted for the following applications (resource ids):

* `admin`
* `cockpit`
* `tasklist`
* `*` (Any / All)

# Administrators

Camunda BPM has no explicit concept of "administrator" beyond it being a user who has been granted all authorizations on all resources.

## The "camunda-admin" Group

When downloading the Camunda BPM distribution, the invoice example application creates a group with id `camunda-admin` and grants all authorizations on all resources to this group.

In absense of the demo application, this task is performed by the [Camunda Admin Web Application]({{< relref "webapps/admin/user-management.md#initial-user-setup" >}}). If the Camunda webapplication is started for the first time and no user exists in the database, it asks you to perform the "initial setup". In this process, the `camunda-admin` group is created and granted all permissions on all resources. 

{{< note title="LDAP" class="info" >}}
The group "camunda-admin" is not created when using LDAP (since LDAP is only accessed in a read-only way). Also see the below section on the administrator authorization plugin.
{{< /note >}}

## The Administrator Authorization Plugin

The administrator authorization plugin is a process engine plugin with the following functionality: when the process engine is started, it grants administrative access to a configured group or user. Effectively this means that it grants all permissions on all resources to the configured group or user.

Usually this is used to bootstrap an LDAP installation: granting administrative access to an initial user who can then log in to Admin and configure additional authorizations using the UI.

The following is an example of how to configure the administrator authorization plugin in bpm-platform.xml / processes.xml:

```xml
<process-engine name="default">
  ...
  <plugins>
    <plugin>
      <class>org.camunda.bpm.engine.impl.plugin.AdministratorAuthorizationPlugin</class>
      <properties>
        <property name="administratorUserName">admin</property>
      </properties>
    </plugin>
  </plugins>
</process-engine>
```

The plugin will make sure that administrator authorizations (ALL permissions) are granted on all resources whenever the process engine is started.

{{< note title="" class="info" >}}
  It is not necessary to configure all LDAP users and groups which should have administrator authorization. It is usually enough to configure a single user and use that user to log into the webapplication and create additional authorizations using the User Interface.
{{< /note >}}

Complete list of configuration properties:

<table class="table table-striped">
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>administratorUserName</code></td>
    <td>The name of the administrator user. If this name is set to a non-null and non-empty value, the plugin will create user-level Administrator authorizations on all built-in resources.</td>
  </tr>
  <tr>
    <td><code>administratorGroupName</code></td>
    <td>The name of the administrator group. If this name is set to a non-null and non-empty value, the plugin will create group-level Administrator authorizations on all built-in resources.</td>
  </tr>
</table>

# Configuration Options

This section expains available process engine configuration options related to authorization.

## Enable Authorization Checks

Authorization checks can be globally enabled or disabled using the configuration option `authorizationEnabled`. The default setting for this configuration option is `false`.

## Enable Authorization Checks for User Code

The configuration option `authorizationEnabledForCustomCode` controls whether authorization checks are performed for commands executed by delegation code (i.e., a Java Delegate). The default setting for this configuration option is `false`.

## Check Revoke Authorizations

The configuration option `authorizationCheckRevokes` controls whether authorization checks take into account authorizations of type `Revoke`.

Available values are:

* `always`: Always enables check for revoke authorizations. This mode is equal to the &lt; 7.5 behavior. *NOTE:* Checking revoke authorizations is very expensive for resources with a high potential cardinality like tasks or process instances and can render authorized access to the process engine effectively unusable on most databases. You are therefore strongly discouraged from using this mode.

* `never`: Never checks for revoke authorizations. This mode has best performance and effectively disables the use of revoke authorizations. *Note*: It is strongly recommended to use this mode.

* `auto` (**default value**): This mode only checks for revoke authorizations if at least one revoke authorization currently exits for the current user or one of the groups the user is a member of. To achieve this it is checked once per command whether potentially applicable revoke authorizations exist. Based on the outcome, the authorization check then uses revoke or not. *NOTE:* Checking revoke authorizations is very expensive for resources with a high potential cardinality like tasks or process instances and can render authorized access to the process engine effectively unusable on most databases.

Also see the [Performance Considerations]({{< relref "#performance-considerations" >}}) section on this page.

# Java API Example

An authorization is created between a user/group and a resource. It describes the user/group's permissions to access that resource. An authorization may express different permissions, such as the permission to READ, UPDATE, DELETE the resource. (See Authorization for details).

To grant the permission to access a certain resource, an authorization object is created. For example, to give access to a certain filter:

```java
Authorization auth = authorizationService.createNewAuthorization(AUTH_TYPE_GRANT);

// The authorization object can be configured either for a user or a group:
auth.setUserId("john");
//  -OR-
auth.setGroupId("management");

//and a resource:
auth.setResource("filter");
auth.setResourceId("2313");
// a resource can also be a process definition
auth.setResource(Resources.PROCESS_INSTANCE);
// the process defintion key is the resource id
auth.setResourceId("invoice");

// finally the permissions to access that resource can be assigned:
auth.addPermission(Permissions.READ);
// more than one permission can be granted
auth.addPermission(Permissions.CREATE);

// and the authorization object is saved:
authorizationService.saveAuthorization(auth);
```

As a result, the given user or group will have permission to READ the referenced filter.

Another possible example would be to restrict the group of persons who are allowed to start a specific process:

```java
//we need to authorizations, one to access the process definition and another one to create process instances
Authorization authProcessDefinition = authorizationService.createNewAuthorization(AUTH_TYPE_GRANT);
Authorization authProcessInstance = authorizationService.createNewAuthorization(AUTH_TYPE_GRANT);

authProcessDefinition.setUserId("johnny");
authProcessInstance.setUserId("johnny");

authProcessDefinition.setResource(Resources.PROCESS_DEFINITION);
authProcessInstance.setResource(Resources.PROCESS_INSTANCE);
//the resource id for a process definition is the process definition key
authProcessDefinition.setResourceId("invoice");
//asterisk to allow the start of a process instance
authProcessInstance.setResourceId("*")
// allow the user to create instances of this process definition
authProcessDefinition.addPermission(Permissions.CREATE_INSTANCE);
// and to create processes
authProcessInstance.addPermission(Permissions.CREATE);

authorizationService.saveAuthorization(authProcessDefinition);
authorizationService.saveAuthorization(authProcessInstance);
```
# Camunda Admin Webapp

The Camunda Admin Webapplication provides an out of the box [UI for configuring Authorizations]({{< relref "webapps/admin/authorization-management.md" >}}).

# Performance Considerations

Authorizations are calculated by the database which is most efficient. Example: when performing a task query, the database query only returns the tasks for which the user has a READ authorization.

## Performance of Checking Grant Authorizations

When only Grant authorizations are used, the check is very efficient since the authorization table can be joined with the resource table (task table, process instance table,    etc...).

## Performance of Checking Revoke Authorizations

Revoke authorizations are expensive to check. The check needs to consider the precedence of authorizations. Example: a user level Grant is stronger than a group level Revoke. A sequence of nested SQL `CASE` statements and a subselect is used to account for the precedence. This has two downsides:

* The check scales linearly with the cardinality of the resource table (doubling the number of tasks makes the query twice as slow)
* The particular construct based on `CASE` statements performs extremely poorly on the following databases: PostgreSQL, DB2

On these databases, revoke authorizations are effectively unusable.

Also see the [Configuration Options](#check-revoke-authorizations) section on this page.
