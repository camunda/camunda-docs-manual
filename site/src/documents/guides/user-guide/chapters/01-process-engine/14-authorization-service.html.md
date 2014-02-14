---

title: 'Authorization Service'
category: 'Process Engine'

---

camunda BPM provides a resource oriented authorization framework.

<strong>Authorizations</strong>
An Authorization assigns a set of Permissions to an identity to interact with a given Resource.

<em>Examples</em>

* User 'jonny' is authorized to start new instances of the 'invoice' process
* Group 'marketing' is not authorized to cancel process instances.
* Group 'marketing' is not allowed to use the tasklist application.
* Nobody is allowed to edit process variables in the cockpit application, except the distinct user 'admin'.

<strong>Identities</strong>
camunda BPM distinguished two types of identities: users and groups. Authorizations can either range over all users (userId = ANY), an individual User or a Group of users.

<strong>Permissions</strong>
A Permission defines the way an identity is allowed to interact with a certain resource. Examples of permissions are CREATE, READ, UPDATE, DELETE, ... See Permissions for a set of built-in permissions.

A single authorization object may assign multiple permissions to a single user and resource:

    authorization.addPermission(Permissions.READ);
    authorization.addPermission(Permissions.WRITE);
    authorization.addPermission(Permissions.DELETE);

On top of the built-in permissions, camunda BPM allows using custom permission types.

<strong>Resources</strong>
Resources are the entities the user interacts with. Examples of resources are GROUPS, USERS, process-definitions, process-instances, tasks ...

<div class="alert alert-info">
  <p>
    <strong>Built-In Resources</strong>
  </p>
  <p>
    The following resources are currently supported by the authorization framework:
    <ul>
      <li>Application (cockpit, tasklist, ...)</li>
      <li>Authorization</li>
      <li>Group</li>
      <li>Group Membership</li>
      <li>User</li>
    </ul>
  </p>
</div>

On top of the built-in resources, the camunda BPM framework supports defining custom resources. Authorization on custom resources will not be automatically performed by the framework but can be performed by a process application.

<strong>Authorization Type</strong>
There are three types of authorizations:

Global Authorizations (`AUTH_TYPE_GLOBAL`) range over all users and groups (`userId = ANY`) and are usually used for fixing the "base" permission for a resource.
Grant Authorizations (`AUTH_TYPE_GRANT`) range over users and groups and grant a set of permissions. Grant authorizations are commonly used for adding permissions to a user or group that the global authorization revokes.
Revoke Authorizations (`AUTH_TYPE_REVOKE`) range over users and groups and revoke a set of permissions. Revoke authorizations are commonly used for revoking permissions to a user or group the the global authorization grants.

<strong>Authorization Precedence</strong>
Authorizations may range over all users, an individual user or a group of users or they may apply to an individual resource instance or all instances of the same type (resourceId = ANY). The precedence is as follows:

* An authorization applying to an individual resource instance precedes over an authorization applying to all instances of the same resource type.
* An authorization for an individual user precedes over an authorization for a group.
* A Group authorization precedes over a GLOBAL authorization.
* A Group REVOKE authorization precedes over a Group GRANT authorization.

## Creating an Authorization

An authorization is created between a user/group and a resource. It describes the user/group's permissions to access that resource. An authorization may express different permissions, such as the permission to READ, WRITE, DELETE the resource. (See Authorization for details).

In order to grant the permission to access a certain resource, an authorization object is created:

    Authorization auth = authorizationService.createNewAuthorization();

    // The authorization object can be configured either for a user or a group:
    auth.setUserId("john");
    //  -OR-
    auth.setGroupId("management");

    //and a resource:
    auth.setResource("processDefinition");
    auth.setResourceId("2313");

    // finally the permissions to access that resource can be assigned:
    auth.addPermission(Permissions.READ);

    // and the authorization object is saved:
    authorizationService.saveAuthorization(auth);

As a result, the given user or group will have permission to READ the referenced process definition.

## The Administrator Authorization Plugin

camunda BPM has no explicit concept of "administrator". An administrator in camunda BPM is a user who has been granted all authorizations on all resources.

When downloading the camunda BPM distribution, the invoice example application creates a user with id `demo` and assigns administrator authorizations to this user. In addition, the [camunda Admin Web application](ref:#admin-initial-user-setup) allows you to create an initial administrator user if no user is present in the database (when using the [Database Identity Service](ref:#process-engine-identity-service-the-database-identity-service) or a custom implementation providing READ / WRITE access to the user repository).

This is not the case when using the [LDAP Identity Service](ref:#process-engine-identity-service-the-ldap-identity-service). The LDAP idenitity service only has read access to the user repository and the "Create Initial User" dialog will not be displayed.

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
