---

title: 'Overview'
category: 'Migrate from Camunda BPM 7.2 to 7.3'

---

The following guide covers these use cases:

1. For administrators and developers: [Migrate the database](ref:#migrate-from-camunda-bpm-72-to-73-migrate-your-database)
2. For administrators and developers: [Migrating a shared process engine setting](ref:#migrate-from-camunda-bpm-72-to-73-migrating-a-shared-process-engine-setting)
3. For administrators and developers: [Migrating an embedded process engine setting](ref:#migrate-from-camunda-bpm-72-to-73-migrating-an-embedded-process-engine-setting)
4. For developers: [Migrating a Cockpit plugin](ref:#migrate-from-camunda-bpm-72-to-73-migrating-a-cockpit-plugin)
5. For administrators: [Migrating a Tasklist translation file](ref:#migrate-from-camunda-bpm-72-to-73-migrating-a-tasklist-translation-file)
6. For administrators and developers: [Checking authorizations for newly introduced authorization resources](ref:#migrate-from-camunda-bpm-72-to-73-authorization)

This guide covers mandatory migration steps as well as optional considerations for initial configuration of new functionality included in Camunda BPM 7.3. The following concepts were introduced with Camunda BPM 7.3 and are relevant for migration:

* **Authorization:** With [Authorization](ref:/guides/user-guide/#admin-administrator-account-authorizations) being used for restricting access to applications and identity-related data in Camunda BPM 7.2, 7.3 extends authorization checks to execution-related concepts like process instances and tasks.
