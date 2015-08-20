---

title: 'Overview'
category: 'General migration hints for Camunda BPM'

---

<div class="alert alert-info">
  <strong>Reading the Guide</strong><br>
   Throughout this guide we will use a number of variables to denote common path names and constants:
  <ul>
    <li><code>$DATABASE</code> expresses the target database platform, e.g. DB2, MySql etc.</li>
    <li><code>$DISTRIBUTION_PATH</code> represents the path of the downloaded pre-packaged Camunda BPM distribution, e.g. <code>camunda-bpm-tomcat-$PLATFORM_VERSION.zip</code> or <code>camunda-bpm-tomcat-$PLATFORM_VERSION.tar.gz</code> for Tomcat etc.</li>
    <li><code>$MINOR_VERSION</code> denotes the current minor version of the Camunda BPM platform you are currently using, e.g. <code>7.1</code>.</li>
    <li><code>$NEW_MINOR_VERSION</code> denotes the next minor version of the Camunda BPM platform you want to upgrade to, e.g. <code>7.2</code>.</li>
    <li><code>$PLATFORM_VERSION</code> denotes the version of the Camunda BPM platform you are currently using, e.g. <code>7.1.0</code>.</li>
    <li><code>$NEW_PLATFORM_VERSION</code> denotes the version of the Camunda BPM platform you want to upgrade to, e.g. <code>7.2.0</code>.</li>
  </ul>
</div>

**Getting Help:** If you have any trouble, ask for assistance in the [Forum](http://camunda.org/community/forum.html). As an enterprise customer, you can contact our [support team](https://app.camunda.com/jira/browse/SUPPORT) if you need further assistance.

This guide gives some hints and general guidelines / steps to follow when upgrading Camunda BPM from one minor version to the next one.
It is _NOT_ a migration guide by its own. Always check the concrete migration guide of the version from where you start the migration.

The migration guides usually cover following migration topics in detail:

  * Database
  * Engine (and plugins)
  * Camunda web applications (and plugins)
  * Process applications

###Upgrading from a minor version to next one

The general approach to migrate from one minor version to the next involves the following steps:

1. [Download](http://camunda.org/download/) the pre-packaged distribution corresponding to the next minor version from the Camunda website, e.g., `camunda-bpm-tomcat-7.2.0.zip`. As an enterprise customer, use the [enterprise edition download](/enterprise/download) page instead. 
2. Migrate your database using the SQL scripts packaged inside the `$DISTRIBUTION_PATH/sql/upgrade`.
3. Upgrade the Camunda libraries and web applications in your server.
4. Upgrade your process applications.

Depending if you are running Camunda BPM as a shared engine or an embedded one, if differs what you have to do during steps 3 and 4.
Check the concrete migration guide if there are any special steps you have to make.
