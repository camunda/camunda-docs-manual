---

title: 'Authorization'
category: 'Migrate from Camunda BPM 7.2 to 7.3'

---

As of version 7.3, it is allowed to authorize access to process related resources such as

* `Deployment`
* `Process Definition`
* `Process Instance`
* `Task`

so that an authenticated user can only see, modify and delete those process definitions, process instances and tasks which the user is authorized to see, modify and delete (for further details please read the [User Guide](ref:/guides/user-guide/#process-engine-authorization-service)).

The upgrade script `$DATABASE_engine_7.2_to_7.3.sql` contains `INSERT`-statements to create a new `GLOBAL` authorization and a new `GRANT` authorization for the group `camunda-admin` for each new authorization resource. This will be done to avoid any effect to your custom (process) applications by the new authorization capabilities.

If these authorizations are not desired, you have the following options to delete them:

* Before executing the upgrade script `$DATABASE_engine_7.2_to_7.3.sql` remove the corresponding `INSERT`-statements inside the script.
* Use the [Camunda Admin application](ref:/guides/user-guide/#admin-administrator-account-authorizations) to delete the created authorizations.

<div class="alert alert-warning">
  <strong>Note:</strong> If you added new authorization resources by yourself in 7.2, please check that they have another id than the newly
  introduced resources (listed above). Otherwise, the new authorizations inserted by the update will allow everyone to access your custom resources.
</div>
