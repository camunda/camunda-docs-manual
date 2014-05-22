---

title: 'Administrator Account'
category: 'Admin'

---

Users who belong to the group camunda-admin have administrator privileges. There must be at least one member in this group, otherwise the initial setup screen appears. Besides user- and groupmanagement, as administrator you are able to define authorization rules for users and groups to control access permissions for applications and set the visibility of users and groups.

In the following sections you will learn how to use an administrator account with the help of a simple use cases. You will create a group with two users who will be able to work together in Tasklist.

## Users

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin-users.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>The Users menu allows you to add, edit and delete user profiles.</p>
    <p>Login with your admin account and add two new users. Give them a unique ID and a password you can remember.</p>
  </div>
</div>

## Groups

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin-groups.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>The Groups menu allows you to add, edit and delete user groups.</p>
    <p>Create a new group called <em>support</em> and add the new users to the group. To do so, go back to the Users menu and edit the new accounts. In the menu Groups you can add the users to the support group.</p>
  </div>
</div>

## Authorizations

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin-authorization.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>Manage authorizations for users, groups and applications. Define which users or groups have access to the applications, which users are visible to other groups or direct group members.</p>
  </div>
</div>

### Application Access

Set the authorizations for the new group and the created users. First, you have to define which application the members of your new group have access to. Select the _Application_ menu and create a new `Application Authorization` rule. The group members should be able to access Tasklist, so add the following rule:

<center><img class="img-responsive" src="ref:asset:/assets/img/implementation-admin/admin-authorization-application-new-group.png" /></center>

Now every member of the group 'support' can use Tasklist.

Furthermore, you want one of the new users to get access to Cockpit. Therefore add a new user-specific rule:

<center><img class="img-responsive" src="ref:asset:/assets/img/implementation-admin/admin-authorization-application-new-user.png" /></center>

This specific rule is only valid for the user 'lemmy'  and provides him with additional authorization.

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin-access.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>Login with the new user accounts and test if you can access the desired application.</p>
  </div>
</div>

### Member Visibility

Depending on the users authorization, [Tasklist](ref:#tasklist) will show you information about your colleagues and groups. Currently you can only see the group folder support but not your colleague. To change that, login to the admin application as administrator, enter the Users Authorization menu and create the following rules:

<center><img class="img-responsive" src="ref:asset:/assets/img/implementation-admin/admin-authorization-users.png" /></center>

Now every member of the group_ support_ is able to see the new users _lemmy_ and _ozzy_.
