---

title: 'Overview'
category: 'Introduction'

---

This document will guide you through the installation of camunda BPM and its components on a IBM WebSphere Application Server.

<div class="alert alert-info">
  We support the camunda BPM platform for IBM WebSphere Application Server on

  <ul>
    <li>IBM WebSphere Application Server v 8.0.x</li>
    <li>IBM WebSphere Application Server v 8.5.x</li>
  </ul>

  For older Versions of WebSphere, we only support the camunda BPM engine.
</div>

<div class="alert alert-warning">
  <p><strong>Enterprise Feature</strong></p>
  Please note, that this feature is included only in the enterprise edition of the camunda BPM platform, it is not available in the community edition.
  <p style="margin-top:10px">Check the <a href="http://www.camunda.com">camunda</a> product homepage for more information or to get your free trial version.</p>
</div>

<div class="alert alert-info">
  <p><strong>Reading the Guide</strong></p> Throughout this guide we will use a number of variables to denote common path names and constants.<br><br>
  <code>$WAS_HOME</code> points to the WebSphere application server main directory (typically something like <code>/opt/IBM/WebSphere/AppServer</code>). <br>
  <code>$PLATFORM_VERSION</code> denotes the version of the camunda BPM platform you want to or have installed, e.g. <code>7.0.0</code>. <br>
  <code>$WAS_DISTRIBUTION</code> represents the downloaded camunda BPM distribution for the WAS, e.g. <code>camunda-ee-ibm-was-$PLATFORM_VERSION.zip</code>.
  <p style="margin-top:10px">
    The distribution is available at the <a href="http://www.camunda.org/enterprise-release/camunda-bpm/ibm-was">camunda enterprise release page</a>.
    You will be asked to enter the credentials you received during the trial or subscription process.
  </p>
</div>