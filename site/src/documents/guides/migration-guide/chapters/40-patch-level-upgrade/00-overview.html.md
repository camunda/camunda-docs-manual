---

title: 'Overview'
category: 'Patch Level Upgrade'

---

<div class="alert alert-info">
  <strong>Reading the Guide</strong><br>
   Throughout this guide we will use a number of variables to denote common path names and constants:
  <ul>
    <li><code>$DATABASE</code> expresses the target database platform, e.g. DB2, MySql etc.</li>
    <li><code>$DISTRIBUTION_PATH</code> represents the path of the downloaded pre-packaged Camunda BPM distribution, e.g., <code>camunda-bpm-tomcat-$PLATFORM_VERSION.zip</code> or <code>camunda-bpm-tomcat-$PLATFORM_VERSION.tar.gz</code> for Tomcat etc.</li>
    <li><code>$PLATFORM_VERSION</code> denotes the version of the Camunda BPM platform you want to install, e.g., <code>7.1.0</code>.</li>
  </ul>
</div>

<div class="alert alert-warning">
  <p><strong>Enterprise Feature</strong></p>
  Please note that Patch Level Upgrades will only be provided to enterprise customers, they are not available in the community edition.
  <p style="margin-top:10px">Check the <a href="http://camunda.com/bpm/enterprise/ ">camunda enterprise homepage</a> for more information or get your <a href="http://camunda.com/bpm/enterprise/trial/">free trial version.</a></p>
</div>

###Upgrading over multiple Patch Level versions

It is possible to upgrade the camunda BPM platform over multiple patch level versions (e.g., from 7.1.0 to 7.1.4). To do so, follow the steps listed [below](ref:#patch-level-upgrade-upgrade-your-server).
