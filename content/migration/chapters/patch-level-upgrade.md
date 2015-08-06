---

title: "Patch level upgrades"
weight: 50

menu:
  main:
    identifier: "migration-guide-patch"
    parent: "migration-guide"

---

<div class="alert alert-info">
  <strong>Reading the Guide</strong><br>
   Throughout this guide we will use a number of variables to denote common path names and constants:
  <ul>
    <li><code>$DATABASE</code> expresses the target database platform, e.g., DB2, MySql etc.</li>
    <li><code>$DISTRIBUTION_PATH</code> represents the path of the downloaded pre-packaged Camunda BPM distribution, e.g., <code>camunda-bpm-tomcat-$PLATFORM_VERSION.zip</code> or <code>camunda-bpm-tomcat-$PLATFORM_VERSION.tar.gz</code> for Tomcat etc.</li>
    <li><code>$PLATFORM_VERSION</code> denotes the version of the Camunda BPM platform you want to install, e.g., <code>7.1.0</code>.</li>
  </ul>
</div>

<div class="alert alert-warning">
  <p><strong>Enterprise Feature</strong></p>
  Please note that Patch Level Upgrades will only be provided to enterprise customers, they are not available in the community edition.
  <p style="margin-top:10px">Check the <a href="http://camunda.com/bpm/enterprise/ ">Camunda enterprise homepage</a> for more information or get your <a href="http://camunda.com/bpm/enterprise/trial/">free trial version.</a></p>
</div>

###Upgrading over multiple Patch Level versions

It is possible to upgrade the Camunda BPM platform over multiple patch level versions (e.g., from 7.1.0 to 7.1.4). To do so, follow the steps listed [below](ref:#patch-level-upgrade-upgrade-your-server).


# Upgrade your Database

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
      <td>7.3</td>
      <td>$DATABASE_engine_7.3_patch_7.3.0_to_7.3.1.sql</td>
      <td>Adjust column size of ACT_HI_JOB_LOG.ACT_ID_ to 255.</td>
      <td>All databases</td>
      <td><a href="https://app.camunda.com/jira/browse/CAM-4037">CAM-4037</td>
    </tr>
  </tbody>
</table>


# Upgrade your Server

Depending on the scenario in which the Camunda BPM platform is deployed, you have to adjust the upgrade process. Please note that the following procedure may differ for cluster scenarios. Contact our [support team](https://app.camunda.com/jira/browse/SUPPORT) if you need further assistance.

* Shut down your server
* Exchange Camunda BPM libraries, tools and webapps (EAR, RAR, Subsystem (JBoss), Shared Libs) - essentially, follow the [installation guide](ref:/guides/installation-guide/) for your server.
* Restart your server