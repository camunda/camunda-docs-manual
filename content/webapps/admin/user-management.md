---

title: 'User Management'
weight: 10

menu:
  main:
    identifier: "user-guide-admin-dashboard"
    parent: "user-guide-admin"

---


# Users Menu

{{< img src="../img/admin-users.png" title="User Menu" >}}

The Users menu allows you to add, edit and delete user profiles. Furthermore, you can manage group membership and change passwords.


# My Profile

By clicking on your user name in the Users menu, you can access the My Profile menu. In the My Profile menu you can edit your personal account settings, such as:

* Profile: Change your name or email address. You cannot change the user account ID!
* Account: Change your password or delete your account. Be careful, deletion cannot be undone.
* Groups: This menu lists all groups of which you are member. With administrator rights you can assign your account to the available groups.

You can also access the My Profile menu from any of the web applications by clicking on your user name at the top right and selecting *My Profile*.


# Initial User Setup

{{< img src="../img/admin-initial-user-setup.png" title="Initial User Setup" >}}

If no administrator account is configured, a setup screen will be shown on first access of a process engine through Cockpit or Tasklist . This screen allows you to configure an initial user account with administrator rights.
Administrator users are not global but per engine. Thus, you will need to set up an admin user for each separate engine.

If you installed the default Camunda webapps and demo content, Camunda was configured with several demo users. The default admin user can be accessed with the following credentials:

* Username: `demo`
* Password: `demo`


# Administrator Account

Users who belong to the group *camunda-admin* (default set by the invoice receipt demo process application) have administrator privileges. There must be at least one member in this group, otherwise the [initial setup screen]({{< relref "#initial-user-setup" >}}) appears. Besides user- and groupmanagement, as administrator you are able to define authorization rules for a variety of resources. See the chapter on [Authorizations]({{< relref "webapps/admin/authorization-management.md" >}}) for more details.
