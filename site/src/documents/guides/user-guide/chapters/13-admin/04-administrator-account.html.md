---

title: 'Administrator Account'
category: 'Admin'

---

Users who belong to the group camunda-admin (default set by the invoice receipt demo process application) have administrator privileges. There must be at least one member in this group, otherwise the [initial setup screen](ref:#admin-initial-user-setup) appears. Besides user- and groupmanagement, as administrator you are able to define authorization rules for a variety of resources. See the chapter on [Authorizations](ref:#admin-administrator-account-authorizations) for more details.

In the following sections you will learn how to use an administrator account with the help of some simple use cases. First, you will create a group with two users who will be able to work together in Tasklist.

## Create users, groups and grant basic permissions

### Users

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin-start-page-view.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>The Users menu allows you to add, edit and delete user profiles.</p>
    <p>Log in with your admin account and add two new users. Give them a unique ID and a password you can remember.</p>
  </div>
</div>

### Groups

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin-groups.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>The Groups menu allows you to add, edit and delete user groups.</p>
    <p>Create a new group called <em>support</em> and add the new users to the group. To do so, go back to the Users menu and edit the new accounts. In the menu Groups you can add the users to the support group.</p>
  </div>
</div>

### Authorizations

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin-authorization.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>Manage authorizations for users, groups, applications and <a href="ref:#tasklist-filters">Filters</a>. Define which users or groups have access to the applications, which users are visible to other groups or direct group members and which users can see which filters in <a href="ref:#tasklist">Tasklist</a>.</p>
  </div>
</div>

#### Application Access

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

#### Filter access

Currently the users in the support group can only see the predefined filters in Tasklist. We want the group members to have read access to another filter, so we create a rule for that filter:

<center><img class="img-responsive" src="ref:asset:/assets/img/implementation-admin/admin-authorization-filter.png" /></center>

The authorizations set here correspond to the authorizations that can be set in the filter settings in Tasklist. The resource ID can be found in the database table `ACT_RU_FILTER`. See [this section](ref:#tasklist-filters) for more information about filters.

#### Member Visibility

Depending on the users authorization, [Tasklist](ref:#tasklist) will show you information about your colleagues and groups. Currently you can only see the group folder support but not your colleague. To change that, login to the admin application as administrator, enter the Users Authorization menu and create the following rules:

<center><img class="img-responsive" src="ref:asset:/assets/img/implementation-admin/admin-authorization-users.png" /></center>

Now every member of the group_ support_ is able to see the new users _lemmy_ and _ozzy_.

In the next use case we will limit application access to read-only.

## Application specific permissions

This use case demonstrates how to give a group access to Cockpit but restrict them to read access. We will use the "support" group that has been created in the [Groups](ref:#admin-administrator-account-groups) section.

To limit the access we have to know which resources are accessible in Cockpit, so we can set the proper permissions for them.
Of the predefined resources at the moment this would be:
- Filter
- Process Definition
- Process Instance
- Task


<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin_cockpit_access_group.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>First of all, we have to provide the permission to access Cockpit (see also <a href="ref:#application-access">Application Access</a>).</p>
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin_proc_def_group_read_access.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>For all the resources that are accessible from Cockpit we add the read permission for the group for every resource id (indicated by the asterisk), e.g. in the screenshot for all process definitions.</p>
  </div>
</div>

Now every user of the support group can access the Cockpit and see everything that is inside without being able to change anything (unless the user has special permissions himself, because those would take precedence over group permissions).

Having one group that can see everything in Cockpit we now want to have another group managing one and only one process.

## Restrict process permissions

Not every process has to be managed by every user/group and with regards to different organizational levels not every group should be aware of every process present in the process engine. Therefore it might be necessary to restrict the access of users/groups to certain processes.

In this use case we want to give the group "accounting", which we will assume is already present and has access to Cockpit (see [Application specific permission](ref:#admin-administrator-account-application-specific-permissions) and [Application Access](ref:#application-access)), full access to the "invoice" process but only to this process.

For groups and users to be able to see process definitions they need at least the "READ" permission for the "Process Definition" resource. To see running process instances the same permission is required for the "Process Instance" resource.  

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin_proc_def_group_full_access.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>We grant the "accounting" group all permissions for the "invoice" process because they shall be able to manage their process completely. The resource id references to the key of the process definition.</p>
  </div>
</div>

After we got to know how to grant certain permissions we might need a second user who serves as administrator.

## Create a user with all permissions

During the [setup](ref:#admin-initial-user-setup) you had to create one administrator. In a real-world scenario it could be beneficial to have a second administrator account to manage the users. Basically an administrator is a user with the "ALL" permission for every possible resource and resource id. For example to grant the "accounting" group all permissions for authorizations the following entry has to be made:

<center><img class="img-responsive" src="ref:asset:/assets/img/implementation-admin/admin_auth_edit_full_access.png" /></center>

To create an administrator there are several options:

1. If you kept the group "camunda-admin" in your application, you can add the user to this group.
2. If you use the [Administrator Authorization Plugin](ref:#process-engine-authorization-service-the-administrator-authorization-plugin), you can configure the plugin to grant the user or a certain group all permissions.
3. You can create your own "administrator" group (see also [Groups](ref:#admin-administrator-account-groups)), grant it all permissions and assign a user to it.
4. Grant one certain user all permissions.

Now, after creating a new admin we may want to start working and start processes. To be able to do that we also need a certain combination of permissions.

## Grant permission to start processes from Tasklist

Processes are being started from Tasklist. For a user or group to be able to start processes we need, again, a certain combination of permissions.
In this use case we want to give the "accounting" group the permission to start the "invoice" process from Tasklist.

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin_tasklist_access_group.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>To start, we will grant the group access to Tasklist (also see <a href="#admin-administrator-account-application-specific-permissions">Application specific permission</a>).</p>
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin_proc_def_acc_read_create_inst_access.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>Next, we grant the "accounting" group the "READ" and "CREATE_INSTANCE" permission for the "invoice" process to be able to see the process definition and create instances in Tasklist.</p>
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin_proc_inst_acc_create.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>After that we grant the "CREATE" permssion for the process instances. The "CREATE" permission is necessary for the group to be able to create new process instances. The resource id references the generated process instance ids, therefore we use the asterisk, because we can't know in advance the generated id.</p>
  </div>
</div>

Now that we know how to start a process we may want to restrict permissions to certain running processes.

## Grant permission for single process instance

It is possible to restrict a group's/user's permissions to a single process instance, i.e. after the process ended the group/user will not be able to change any other running process instance. We will use the "accounting" again in this example, assume the group has access to Cockpit (see also [Application Access](ref:#application-access)) and a process with the name and key "OrderProcess" is present.

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin_proc_def_acc_read.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>To enable the group to see the process in cockpit we have to grant the "READ" permission for the process definition.</p>
  </div>
</div>

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin_cockpit_proc_inst_id.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>Now we have to get the process instance id from Cockpit. You can find the ids of all running processes after clicking on a process definition name or diagram preview on the <a href="ref:#cockpit-dashboard-deployed-processes">dashboard</a>.
  </div>
</div>
<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin_proc_inst_id_acc.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>This id then has to be used as resource id when granting the user all permissions for the "Process Instance" resource.</p>
  </div>
</div>

This will limit the groups permissions to this running process instance. Like restricting access to a certain process instance it is also possible to apply similar limitations for a single task.

## Restrict task permissions

Since several groups can participate in a process it could be useful to restrict certain tasks to certain persons/groups. This can also be done with the Admin and will take effect inside Tasklist. We will reuse the "accouting" group and the "invoice" process from the previous sections therefore. At least one instance of the process has to be running.

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin_filter_acc_read.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>First of all, we have to grant the "accounting" group "READ" permission for filters so that tasks will be displayed in Tasklist.</p>
  </div>
</div>
<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/implementation-admin/admin_task_acc_edit.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>Next we go into Cockpit and <a href="ref:#cockpit-process-instance-detail-view-detailed-information-panel">assign the desired task</a> to the "accounting" group.
    This will automatically create an entry for the task with the task id as resource id in Admin and grant the "READ" and "UPDATE" permissions.</p>
</div>

Those are the most common use cases for possible combinations of resources, permissions and resource ids.
