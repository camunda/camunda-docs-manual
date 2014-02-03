---

title: 'Administrator Account'
category: 'Admin'

---

Users who belong to the group camunda-admin have administrator privileges. At least there must be one member in this group otherwise the initial setup screen appears. Beside user and group management as administrator you are able to define authorization rules for users and groups to control access permissions for applications and set the visibility of users and groups.

In the following you will learn how to use an administrator account by the help of a simple use cases. You will create a group with two users who will be able to work together in Tasklist.

## Users

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin-users.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>The Users administration menue allows you to add, edit and delete user profiles.</p>
    <p>Login with your admin account and add two new users. Give them an unique ID and a password you can remember.</p>
  </div>
</div>

## Groups

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin-groups.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>The Groups administration menue allows you to add, edit and delete user groups.</p>
    <p>Create a new group called <em>support</em> and add the new users to the group. Therefore go back to the Users menue and edit the new accounts. In the menue Groups you can add the user to the support group.</p>
  </div>
</div>

## Authorizations

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin-authorization.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>Manage authorizations for users, groups and applications. Define which user or group has access to the applications, which users are visible for other groups or direct group members.</p>
  </div>
</div>

### Application Access

Set the authorizations for the new group and the created users. First you have to define to which application the members of your new group have access to. Select the _Application_ menue and create a new `Application Authorization` rule. The group members should be able to access Tasklist, so add the following rule:

<center><img class="img-responsive" src="ref:asset:/assets/img/implementation-admin/admin-authorization-application-new-group.png" /></center>

Now every member of the group support can use Tasklist.

Furthermore you want one of the new users to get access to Cockpit. Therefore add a new user specific rule:

<center><img class="img-responsive" src="ref:asset:/assets/img/implementation-admin/admin-authorization-application-new-user.png" /></center>

This specific rule is valid for the user lemmy only and provides him additional access authorization.

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin-access.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>Login with the new user accounts and test if you can access the desired application.</p>
  </div>
</div>

### Member Visibility

Depending on the users authorization [Tasklist](ref:#tasklist) will show you information about your colleagues and groups. Currently you can only see the group folder support but not your colleague. To change that login to the admin application as administrator, enter the Users Authorization menue and create the following rules:

<center><img class="img-responsive" src="ref:asset:/assets/img/implementation-admin/admin-authorization-users.png" /></center>

Now every member of the group_ support_ is able to see the new users _lemmy_ and _ozzy_.
