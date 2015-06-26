---

title: 'Patch SQL Scripts'
category: 'SQL Scripts'

---

When our customers or community users discover SQL schema related problems during a minor version, we create so called SQL patch level scripts.
These scripts apply the necessary fixes for the bug, nothing more. `Patch-level` and `upgrade` scripts have **no intersection**, meaning they do not contain the same statement/s.
They are released in a patch level version for a specific minor version.

### Development
To create a patch level scripts follow these guidelines:

1. Identify which database and Camunda BPM patch versions are affected.

2. Following the [naming convention](ref:#sql-scripts-patch-sql-scripts-naming-convention)

  1. Create the corresponding patch scripts with the fix for each affected minor version branch. Start by creating them on `master` in the `upgrade`-folder of the `sql-scripts` project of the distribution located [here].
If `master` is affected too, the patch for it will be done in the `create` and `drop` scripts only. Because it is not yet released, database changes are not done in a patch script.

  2. Add the fix to the `create` and `drop` scripts of each affected database on each minor version branch, except `master` where it is already done through the `create` scripts.

  3. Make sure you have added **all** patch scripts for **all** versions on master in the `upgrade`-folder. On **each** minor version branch, only patch scripts are add which **belong to the version of the minor branch and previously released minor versions**.
Eg. on `master`, all patch scripts are available. On `7.2`, only patch scripts affecting `7.2` and lower minor versions are available, that means `7.1` and `7.0`. On `7.1`, only patch scripts regarding `7.1` and lower are available.

3. To get the testing right, some modifications must be done to the `patch-new-schema` section of the `sql-maven-plugin` and the `generate-test-resources` phase configuration of the `maven-antrun-plugin` in the [database upgrade] and [instance migration] tests.

  1. Regarding the `maven-antrun-plugin`, it is necessary to add a `touch` command for the patch script of the branch you are currently working on. This action generates a `dummy` patch file during testing for databases where no patch is required.

  2. The `sql-maven-plugin` is responsible for creating the old schema of the previous minor version, patching the old schema, upgrading to new minor version, patching the new minor version and finally dropping the schema after the tests.
**BUT** you only have to do a manual modification if the bug is not also
present in the previous minor version. If the bug is present in the previous
minor version it is automatically applied in the `patch-old-schema` execution
of the `pom.xml`. If this is not the case you have to add it manually to the
`patch-new-schema` execution of the `pom.xml`.

4. Document the new patch level scripts by adding them to the list of [available SQL Patch scripts](ref:/guides/migration-guide/#patch-level-upgrade-upgrade-your-database-available-sql-patch-scripts) in the migration guide.
Describe for each patch script file: Affected Camunda BPM minor version, the full name of the patch file, a description what it fixes, the affected databases and a link to the concrete CAM issue in our issue tracker.
If the **same** fix is in multiple patch scripts, eg. on different branches, then also **mention** those patch scripts. This is **important**, so the users know that they may have already applied the fix through another patch script from a previous minor version branch.


###Complete example for creating a patch level script

The context:
* Camunda BPM minor version `7.1` and `7.2` are affected also the currently developed version `7.3` (i.e. the `master` branch)

Steps:
1. Identify affected database and Camunda BPM minor versions:

  1. Affected database is `db2`
  2. Affected versions are `7.1.9`, `7.2.4` and `7.3.0-SNAPSHOT`

2. Creation of the corresponding patch scripts for each affected branch:

  1. For `7.2`, create the patch file `db2_engine_7.2_patch_7.2.4_to_7.2.5.sql`. For `7.1`, create the patch file `db2_engine_7.1_patch_7.1.9_to_7.1.10.sql`.
Put all created patch scripts into the `upgrade`-folder on `master`.
Since `master` is also affected, the fix for it has to be done in the `activiti.db2.create.engine.sql` and `activiti.db2.drop.engine.sql` scripts.

  2. Add fix to the `activiti.db2.create.engine.sql` and `activiti.db2.drop.engine.sql` on `master`, `7.2` and `7.1` branches.

  3. Overview of the new files on each affected branch in the `upgrade`-folder:
`master`'s `upgrade`-folder now looks like this:
```
upgrade
  |-- db2_engine_7.1_patch_7.1.9_to_7.1.10.sql
  |-- db2_engine_7.2_patch_7.2.4_to_7.2.5.sql
```
On `7.2`, add the `db2_engine_7.2_patch_7.2.4_to_7.2.5.sql` and `db2_engine_7.1_patch_7.1.9_to_7.1.10.sql` patch scripts. The `upgrade`-folder should now look like this:
```
upgrade
  |-- db2_engine_7.1_patch_7.1.9_to_7.1.10.sql
  |-- db2_engine_7.2_patch_7.2.4_to_7.2.5.sql
```
On `7.1`, only the `db2_engine_7.1_patch_7.1.9_to_7.1.10.sql` patch script is added. The `upgrade`-folder looks like this:
```
upgrade
  |-- db2_engine_7.1_patch_7.1.9_to_7.1.10.sql
```

3. The following lines need to be added to the `pom.xml` of [database upgrade] and [instance migration] tests. For each test project, add the lines to the `maven-antrun-plugin` and `sql-maven-plugin`.
On `master` and `7.2` nothing is added, because the patches of the previous minor version are applied automatically. On `7.1`, the patch scripts for the 7.1 must be added to the `patch-new-schema` section.
This must be done because the `7.0` minor version doesn't apply the patch script as an old version like it is happening on `master` and `7.2`.
For 7.1:
```
...
<artifactId>maven-antrun-plugin</artifactId>
...
  <target>
  ...
  <!-- patches for current minor version if any -->
  ...
  <!-- NEWLY ADDED FILES -->
  <touch
    file="${project.build.directory}/scripts-current/sql/upgrade/${database.type}_engine_${camunda.current.majorVersion}.${camunda.current.minorVersion}_patch_${camunda.current.majorVersion}.${camunda.current.minorVersion}.9_to_${camunda.current.majorVersion}.${camunda.current.minorVersion}.10.sql" />
  </target>
```
```
...
<artifactId>sql-maven-plugin</artifactId>
<executions>
...
  <execution>
    <id>patch-new-schema</id>
    ...
    <configuration>
      <srcFiles>
      ...
        <!-- NEWLY ADDED FILES -->
        <srcFile>${project.build.directory}/scripts-current/sql/upgrade/${database.type}_engine_${camunda.current.majorVersion}.${camunda.current.minorVersion}_patch_${camunda.current.majorVersion}.${camunda.current.minorVersion}.9_to_${camunda.current.majorVersion}.${camunda.current.minorVersion}.10.sql</srcFile>
      </srcFiles>
    </configuration>
  </execution>
...
```

4. Add notes on the patch scripts to the list of [available SQL Patch scripts](ref:/guides/migration-guide/#patch-level-upgrade-upgrade-your-database-available-sql-patch-scripts).

For the patch script fixing 7.1.9, following values are added:

  * affected Camunda BPM minor version: `7.1`
  * patch filename:	`$DATABASE_engine_7.1_patch_7.1.9_to_7.1.10.sql`
  * description: Add a missing index on foreign key to prevent deadlocks. This is the same patch as `$DATABASE_engine_7.2_patch_7.2.4_to_7.2.5.sql`.
  * Affected databases: `DB2`
  * Issue: `CAM-3565`

For the patch script fixing 7.2.4, following values are added:

  * affected Camunda BPM minor version: `7.2`
  * patch filename:	`$DATABASE_engine_7.2_patch_7.2.4_to_7.2.5.sql`
  * description: Add a missing index on foreign key to prevent deadlocks. This is the same patch as `$DATABASE_engine_7.1_patch_7.1.9_to_7.1.10.sql`.
  * Affected databases: `DB2`
  * Issue: `CAM-3565`


### Naming convention
The naming convention for creating a patch level script is:

```
${database_type}_${purpose}_${minor_version}_patch_${patch_version_with_bug}_to_${fix_patch_version}.sql
```

where

  * `${database_type}` describes the affected database, eg. db2, mysql and so on. The placeholder `${purpose}` denotes what is affected when you execute the script. Currently the only purpose is `engine`.
  * `${minor version}` is the version of the current branch you are on, eg. it is `7.2` on `7.2` branch.
  * `${patch_version_with_bug}` describes the patch level version affected by the bug and `${fix_patch_version}` describes the fix patch version.

Example: `db2_engine_7.2_patch_7.2.4_to_7.2.5.sql` or `mssql_engine_7.1_patch_7.1.9_to_7.1.10.sql`

### Testing
The patch level scripts are tested using the same mechanism as the [upgrade](ref:/guides/developer-guide/#sql-scripts-upgrade-sql-scripts-testing) scripts.


### Location
The files can be found [here] together with the `upgrade` scripts.

[here]: https://github.com/camunda/camunda-bpm-platform/tree/master/distro/sql-script/upgrade
[database upgrade]: https://github.com/camunda/camunda-bpm-platform/tree/master/qa/test-db-upgrade
[instance migration]: https://github.com/camunda/camunda-bpm-platform/tree/master/qa/test-db-instance-migration
