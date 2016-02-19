---

title: 'Authorization Management'
weight: 30

menu:
  main:
    identifier: "user-guide-admin-authorization-management"
    parent: "user-guide-admin"

---


{{< img src="../img/admin-authorization.png" title="Authorizations" >}}

Manage authorizations for a variety of resources (e.g., *Applications*, *Groups*, *Filters*). In the following sections you will learn how to use an administrator account with the help of some simple use cases.


# Grant Basic Permissions

In this use case we'll grant some basic permissions. To start out we'll need some users and a group. Create two users in the  [users menu]({{< relref "webapps/admin/user-management.md#user-menu" >}}), create a group called *support* in the [groups menu]({{< relref "webapps/admin/group-management.md#groups-menu" >}}) and add the new users to the group in the [users menu]({{< relref "webapps/admin/user-management.md#user-menu" >}}).


## Application Access

Set the authorizations for the new group and the created users. First you have to define which application the members of your new group have access to. Select the *Application* menu and create a new `Application Authorization` rule. The group members should be able to access Tasklist, so add the following rule:

{{< img src="../img/admin-authorization-application-new-group.png" title="New Group" >}}

Now every member of the group *support* can use Tasklist.

Furthermore, you want one of the new users to get access to Cockpit. Therefore, add a new user-specific rule:

{{< img src="../img/admin-authorization-application-new-user.png" title="Authorization Application New User" >}}

This specific rule is only valid for the user 'lemmy' and provides him with additional authorization for the resource Cockpit.

{{< img src="../img/admin-access.png" title="Admin Access" >}}

Log in with the new user accounts and test if you can access the desired application.


## Filter Access

Currently the users in the *support* group can only see the predefined filters in Tasklist. We want the group members to have `READ` access to another filter, so we create a rule for that filter:

{{< img src="../img/admin-authorization-filter.png" title="Authorization Application New User" >}}

The authorizations set here correspond to the authorizations that can be set in the filter settings in Tasklist. The resource ID can be found in the database table `ACT_RU_FILTER`. See [this section]({{< relref "webapps/tasklist/filters.md" >}}) for more information about filters.


## Member Visibility

Depending on the users authorization, [Tasklist]({{< relref "webapps/tasklist/index.md" >}}) will show you information about your colleagues and groups. Currently you can only see the group folder *support* but not your colleague. To change that, log in to the admin application as administrator, enter the Users Authorization menu and create the following rules:

{{< img src="../img/admin-authorization-users.png" title="Users Authorization" >}}

Now every member of the group *support* is able to see the new users *lemmy* and *Ozzy*.


# Application-Specific Permissions

This use case demonstrates how to give a group access to Cockpit, but restrict them to `READ` access. We will use the *support* group that we created in the previous [example]({{< relref "webapps/admin/authorization-management.md#grant-basic-permissions" >}}).

To limit the access we have to know which resources are accessible in Cockpit so that we can set the proper permissions for them.
Of the predefined resources at the moment this would be:

* Process Definition
* Process Instance
* Task

{{< img src="../img/admin_cockpit_access_group.png" title="Authorization Application New User" >}}

First of all, we have to provide the permission to access Cockpit (also see the [Application Access]({{< relref "#application-acces" >}}) section).

{{< img src="../img/admin_proc_def_group_read_access.png" title="Authorization Application New User" >}}

For all the resources that are accessible from Cockpit we add `READ` permission for every resource id (indicated by the asterisk) for the group, e.g., in the screenshot for all process definitions.

Now every user of the *support* group can access Cockpit and see everything that is inside without being able to change anything (unless the user has special permissions himself, because those take precedence over group permissions).

Now that we have one group that can see everything in Cockpit, we want to have another group managing one single process.


# Restrict Process Permissions

Not every process has to be managed by every user/group and with regards to different organizational levels, not every group should be aware of every process present in the process engine. Therefore it might be necessary to restrict the access of users/groups to certain processes.

In this use case we want to give the group *accounting*, which we will assume is already present and has access to Cockpit (see [Application-Specific Permission]({{< relref "webapps/admin/authorization-management.md#application-specific-permissions" >}}) and [Application Access]({{< relref "#application-acces" >}})), full access to the "invoice" process and only to this process.

For groups and users to be able to see process definitions they need at least `READ` permission for the "Process Definition" resource. To see running process instances the same permission is required for the "Process Instance" resource.

{{< img src="../img/admin_proc_def_group_full_access.png" title="Process Definition Authorization" >}}

We grant the *accounting* group all permissions for the *invoice* process because they shall be able to manage their process completely. The resource id references the key of the process definition.

Now that we know how to grant certain permissions, we might need a second user who serves as an administrator.


# Create a User with All Permissions

During the [setup]({{< relref "webapps/admin/user-management.md#initial-user-setup" >}}) you had to create one administrator account. In a real-world scenario it could be beneficial to have a second administrator account to manage the users. Basically, an administrator is a user with the `ALL` permission for every possible resource and resource id. For example, to grant the *accounting* group all permissions for authorizations the following entry has to be made:

{{< img src="../img/admin_auth_edit_full_access.png" title="Edit Access" >}}

To create an administrator account, there are several options:

1. If you kept the group *camunda-admin* in your application, you can add the user to this group.
2. If you use the [Administrator Authorization Plugin]({{< relref "user-guide/process-engine/authorization-service.md#the-administrator-authorization-plugin" >}}), you can configure the plugin to grant the user or a certain group all permissions.
3. You can create your own *administrator* group (also see [Groups]({{< relref "webapps/admin/group-management.md#groups-menu" >}})), grant it all permissions and assign a user to it.
4. Grant one specific user all permissions.

Now, after creating a new administrator account, we may want to start working and start processes.


# Grant Permission to Start Processes from Tasklist

Processes are started from Tasklist. For a user or group to be able to start processes we need, again, a certain combination of permissions.
In this use case we want to give the *accounting* group the permission to start the *invoice* process from Tasklist.

{{< img src="../img/admin_tasklist_access_group.png" title="Access Group" >}}

To start, we will grant the group access to Tasklist (also see [Application Specific Permission]({{< relref "#application-specific-permissions" >}}).

{{< img src="../img/admin_proc_def_acc_read_create_inst_access.png" title="Instance Access" >}}

Next, we grant the *accounting* group the `READ` and `CREATE_INSTANCE` permission for the *invoice* process to be able to see the process definition and create instances in Tasklist.

{{< img src="../img/admin_proc_inst_acc_create.png" title="Create Access" >}}

After that, we grant the `CREATE` permission for process instances. The `CREATE` permission is necessary for the group to be able to create new process instances. The resource id references the generated process instance ids, therefore we use the asterisk, because we can't know the generated id in advance.

Now that we know how to start a process, we may want to restrict permissions to certain running processes.


# Grant Permission for Single Process Instance

It is possible to restrict a group's/user's permissions to a single process instance, i.e., after the process ends, the group/user will not be able to change any other running process instances. We will use the *accounting* group again in this example. We assume that the group has access to Cockpit (also see [Application Access]({{< relref "#application-access" >}})) and that a process with the name and key *OrderProcess* is present.

{{< img src="../img/admin_proc_def_acc_read.png" title="Definition Access" >}}

To enable the group to see the process in Cockpit, we have to grant the `READ` permission for the process definition.

{{< img src="../img/admin_cockpit_proc_inst_id.png" title="Running Instances" >}}

Now we have to get the process instance id from Cockpit. You can find the ids of all running processes after clicking on a process definition name or diagram preview on the [Cockpit dashboard]({{< relref "webapps/cockpit/dashboard.md" >}}).

{{< img src="../img/admin_proc_inst_id_acc.png" title="Instance Access" >}}

This id then has to be used as the resource id when granting the user all permissions for the *Process Instance* resource.

This will limit the group's permissions to this running process instance. As with restricting access to a certain process instance, it is also possible to apply similar limitations for a single task.


# Grant Permission for Single Tasks

Since several groups can participate in a process, it could be useful to restrict certain tasks to certain people/groups. For this example, we will reuse the *accouting* group and the *invoice* process from the previous sections. At least we need one running instance of the process.

{{< img src="../img/admin_filter_acc_read.png" title="Read Permissions" >}}

First of all, we have to grant the *accounting* group `READ` permission for filters so that tasks will be displayed in Tasklist.

{{< img src="../img/admin_task_acc_edit.png" title="Edit Access" >}}

Next we go into Cockpit and [assign the desired task]({{< relref "webapps/cockpit/bpmn/process-instance-view.md#detailed-information-panel" >}}) to the *accounting* group.
This will automatically create an entry for the task with the task id as resource id in Admin and grant the `READ` and `UPDATE` permissions.


Those are the most common use cases for possible combinations of resources, permissions and resource ids.
