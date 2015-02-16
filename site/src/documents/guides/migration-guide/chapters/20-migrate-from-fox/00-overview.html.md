---

title: 'Overview'
category: 'Migrate from Camunda fox'

---


<div class="alert alert-info">
  <strong>Reading the Guide</strong><br>
   Throughout this guide we will use a number of variables to denote common path names and constants:
  <ul>
    <li><code>$DATABASE</code> expresses the target database platform, e.g. DB2, MySql etc.</li>
    <li><code>$DISTRIBUTION_PATH</code> represents the path of the downloaded pre-packaged Camunda BPM distribution, e.g. <code>camunda-bpm-tomcat-$PLATFORM_VERSION.zip</code> or <code>camunda-bpm-tomcat-$PLATFORM_VERSION.tar.gz</code> for Tomcat etc.</li>
    <li><code>$PLATFORM_VERSION</code> denotes the version of the Camunda BPM platform you want to install, e.g. <code>7.0.0</code>.</li>
    <li><code>$FOX_HOME</code> points to the Camunda fox server main directory.</li>
    <li><code>$FOX_VERSION</code> denotes the version of the Camunda fox platform you have installed, e.g. <code>6.2.4</code>.</li>
  </ul>
</div>

As Camunda fox included the Activiti engine you have to perform the [above steps](ref:#migrate-from-activiti) as well.

Before you can start with the migration from Camunda fox to Camunda BPM, we recommend that you [download](http://camunda.org/download) the pre-packaged distribution corresponding to your Camunda fox server.