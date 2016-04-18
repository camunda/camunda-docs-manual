---

title: 'Upgrade your Database'
category: 'Patch Level Upgrade'

---

Within a minor version we will not change anything in our database structure. The database structure
of all patch releases is backwards compatible to the corresponding minor version.

However, we do provide patch scripts for certain bugs that are caused by the database configuration.
If you are affected by those bugs you have the option to run a patch script.
We ship the patch scripts with the prepackaged distribution in the following location:
`$DISTRIBUTION_PATH/sql/upgrade`, named: `$DATABASE_engine_$VERSION_patch_$A_to_$B`.
Please execute all patch scripts that are within the bounds of your upgrade path. This means if
your current patch version is `X.X.1` and you upgrade to `X.X.5` you have to execute all
patch scripts first where `$A` &ge; `X.X.1` and `$B` &le; `X.X.5`.

Each patch script contains a comment what the fixes are related to and a link to the corresponding [Camunda Jira](https://app.camunda.com/jira/browse/CAM) issue.

### Available SQL Patch scripts

<table class="table desc-table">
  <thead>
    <tr>
      <th>Camunda Version</th>
      <th>Patch file</th>
      <th>Description</th>
      <th>Affected databases</th>
      <th>Issue link</th>
    <tr>
  </thead>
  <tbody>
    <tr>
      <td>7.1</td>
      <td>$DATABASE_engine_7.1_patch_7.1.4_to_7.1.5.sql</td>
      <td>Add a missing index on foreign key to prevent deadlocks</td>
      <td>H2, MySQL, Oracle, PostgreSQL</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-2567">CAM-2567</td>
    </tr>
    <tr>
      <td>7.1</td>
      <td>$DATABASE_engine_7.1_patch_7.1.9_to_7.1.10.sql</td>
      <td>Add a missing index on foreign key to prevent deadlocks</td>
      <td>DB2, SQL Server</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-3565">CAM-3565</td>
    </tr>
    <tr>
      <td>7.2</td>
      <td>$DATABASE_engine_7.2_patch_7.2.4_to_7.2.5.sql</td>
      <td>Add a missing index on foreign key to prevent deadlocks. <strong>This is the same patch as $DATABASE_engine_7.1_patch_7.1.9_to_7.1.10.sql</strong>.</td>
      <td>DB2, SQL Server</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-3565">CAM-3565</td>
    </tr>
    <tr>
      <td>7.2</td>
      <td>$DATABASE_engine_7.2_patch_7.2.6_to_7.2.7.sql</td>
      <td>Add indices to improve deployment performance.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-4497">CAM-4497</td>
    </tr>
	<tr>
      <td>7.2</td>
      <td>engine_7.2_patch_7.2.8_to_7.2.9.sql</td>
      <td>Adjust column size of ACT_RU_JOB.PROCESS_DEF_KEY_ to 255.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-4328">CAM-4328</td>
    </tr>
  </tbody>
</table>
