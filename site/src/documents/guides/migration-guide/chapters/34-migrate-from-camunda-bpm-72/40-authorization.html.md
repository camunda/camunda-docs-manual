---

title: 'Authorization'
category: 'Migrate from Camunda BPM 7.2 to 7.3'

---

As of version 7.3, it is possible to authorize access to process-related resources such as

* `Deployment`
* `Process Definition`
* `Process Instance`
* `Task`

so that an authenticated user can only see, modify, and delete those process definitions, process instances, and tasks for which the user is authorized to do so (for further details please read the [User Guide](ref:/guides/user-guide/#process-engine-authorization-service)).

The upgrade script `$DATABASE_engine_7.2_to_7.3.sql` contains `INSERT`-statements that create a new `GLOBAL` authorization and a new `GRANT` authorization for the group `camunda-admin` for each new authorization resource. These authorizations ensure that all users are able to access above-mentioned resources such that the process engine behaves after the upgrade in the same way as before the upgrade.

If these authorizations are not desired and you want to restrict access to the listed resources, you have the following options:

* Before executing the upgrade script `$DATABASE_engine_7.2_to_7.3.sql` remove the corresponding `INSERT`-statements inside the script.
* Use the [Camunda Admin application](ref:/guides/user-guide/#admin-administrator-account-authorizations) to delete the created authorizations.
* Use the [Camunda Admin application](ref:/guides/user-guide/#admin-administrator-account-authorizations) to add authorizations that restrict access.

<div class="alert alert-warning">
  <strong>Note:</strong> If you use custom authorization resources with 7.2, make sure to check that they have a different id than the newly introduced resources (listed above). Otherwise, granted/restricted authorizations apply to both resources which may result in undesired behavior.
</div>
