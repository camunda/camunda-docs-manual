---

title: 'Authorization Service'
category: 'Process Engine'

---

camunda BPM provides a resource oriented authorization framework.

####Authorizations

An Authorization assigns a set of Permissions to an identity to interact with a given Resource.

<em>Examples</em>

* User 'jonny' is authorized to create new users
* Group 'marketing' is not authorized to delete the Group 'sales'
* Group 'marketing' is not allowed to use the tasklist application.

####Identities

camunda BPM distinguished two types of identities: users and groups. Authorizations can either range over all users (userId = ANY), an individual User or a Group of users.

####Permissions

A Permission defines the way an identity is allowed to interact with a certain resource.

<div class="alert alert-info">
  <p>
    <strong>Built-In Permissions</strong>
  </p>
  <p>
    The following permissions are currently supported by the authorization framework:
    <ul>
      <li>None</li>
      <li>All</li>
      <li>Read</li>
      <li>Update</li>
      <li>Create</li>
      <li>Delete</li>
      <li>Access</li>
      <li>Read Task</li>
      <li>Update Task</li>
      <li>Create Instance</li>
      <li>Read Instance</li>
      <li>Update Instance</li>
      <li>Delete Instance</li>
      <li>Read History</li>
      <li>Delete History</li>
    </ul>
  </p>
</div>

Please note that the permission "None" does not mean that no permissions are granted, it stands for "no action".
Also, the "All" permission will vanish from a user if a single permission is revoked.

A single authorization object may assign multiple permissions to a single user and resource:

    authorization.addPermission(Permissions.READ);
    authorization.addPermission(Permissions.UPDATE);
    authorization.addPermission(Permissions.DELETE);

On top of the built-in permissions, camunda BPM allows using custom permission types.

####Resources

Resources are the entities the user interacts with.

<div class="alert alert-info">
  <p>
    <strong>Built-In Resources</strong>
  </p>
  <p>
    The following resources are currently supported by the authorization framework (integer representation in brackets):
    <ul>
      <li>Application (cockpit, tasklist, ...) (0)</li>
      <li>Authorization (4)</li>
      <li>Deployment (9)</li>
      <li>Filter (5)</li>
      <li>Group (2)</li>
      <li>Group Membership (3)</li>
      <li>Process Definition (6)</li>
      <li>Process Instance (8)</li>
      <li>Task (7)</li>
      <li>User (1)</li>
    </ul>
  </p>
</div>

On top of the built-in resources, the camunda BPM framework supports defining custom resources. Authorization on custom resources will not be automatically performed by the framework but can be performed by a process application.

####Combination of authorizations and resources

Not every possible permission can be granted for every possible resource.
For the "Application" resource you can exclusively grant the "Access" permission.

The "Process Definition" resource is the only resource for which you can grant the permissions
<ul>
  <li>Read Task</li>
  <li>Update Task</li>
  <li>Create Instance</li>
  <li>Read Instance</li>
  <li>Update Instance</li>
  <li>Delete Instance</li>
  <li>Read History</li>
  <li>Delete History</li>
</ul>

The remaining, valid combinations can be found in the following table.

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
      <th>User</th>
      <td>X</td>
      <td>X</td>
      <td>X</td>
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
      <th>Authorization</th>
      <td>X</td>
      <td>X</td>
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
      <th>Process Definition</th>
      <td>X</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Task</th>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>Process Instance</th>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>Deployment</th>
      <td>X</td>
      <td></td>
      <td>X</td>
      <td>X</td>
    </tr>
  </tbody>
</table>

####Authorization Type

There are three types of authorizations:

Global Authorizations (`AUTH_TYPE_GLOBAL`) range over all users and groups (`userId = ANY`) and are usually used for fixing the "base" permission for a resource.
Grant Authorizations (`AUTH_TYPE_GRANT`) range over users and groups and grant a set of permissions. Grant authorizations are commonly used for adding permissions to a user or group that the global authorization revokes.
Revoke Authorizations (`AUTH_TYPE_REVOKE`) range over users and groups and revoke a set of permissions. Revoke authorizations are commonly used for revoking permissions to a user or group the the global authorization grants.

####Authorization Precedence

Authorizations may range over all users, an individual user or a group of users or they may apply to an individual resource instance or all instances of the same type (resourceId = ANY). The precedence is as follows:

* An authorization applying to an individual resource instance precedes over an authorization applying to all instances of the same resource type.
* An authorization for an individual user precedes over an authorization for a group.
* A Group authorization precedes over a GLOBAL authorization.
* A Group REVOKE authorization precedes over a Group GRANT authorization.

## Creating an Authorization

An authorization is created between a user/group and a resource. It describes the user/group's permissions to access that resource. An authorization may express different permissions, such as the permission to READ, UPDATE, DELETE the resource. (See Authorization for details).

In order to grant the permission to access a certain resource, an authorization object is created. For example, to give access to a certain filter:

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

As a result, the given user or group will have permission to READ the referenced Filter.

Another possible example would be to restrict the group of persons who are allowed to start a special process:

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

## The Administrator Authorization Plugin

camunda BPM has no explicit concept of "administrator". An administrator in camunda BPM is a user who has been granted all authorizations on all resources.

When downloading the camunda BPM distribution, the invoice example application creates a user with id `demo` and assigns administrator authorizations to this user. In addition, the [camunda Admin Web application](ref:#admin-user-management-initial-user-setup) allows you to create an initial administrator user if no user is present in the database (when using the [Database Identity Service](ref:#process-engine-identity-service-the-database-identity-service) or a custom implementation providing READ / UPDATE access to the user repository).

This is not the case when using the [LDAP Identity Service](ref:#process-engine-identity-service-the-ldap-identity-service). The LDAP identity service only has read access to the user repository and the "Create Initial User" dialog will not be displayed.

In this case you can use the *Administrator Authorization Plugin* for making sure administrator authorizations are created for a particular LDAP User or Group.

The following is an example of how to configure the Administrator Authorization Plugin in bpm-platform.xml / processes.xml:

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

The plugin will make sure that administrator authorizations (ALL permissions) are granted on all resources whenever the process engine is started.

<div class="alert alert-info">
  <p>
    <strong>Note</strong>
    It is not necessary to configure all LDAP users and groups which should have administrator authorization. It is usually enough to configure a single user and use that user to log into the webapplication and create additional authorizations using the User Interface.
  </p>
</div>

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
