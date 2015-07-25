---

title: 'Overview'
category: 'Introduction'

---


This document will guide you through the installation of Camunda BPM and its components on an IBM WebSphere Application Server.

<div class="alert alert-info">
  We support the Camunda BPM platform for IBM WebSphere on

  <ul>
    <li>IBM WebSphere Application Server v 8.0.x</li>
    <li>IBM WebSphere Application Server v 8.5.x</li>
  </ul>

  For older Versions of IBM WebSphere, we only support the Camunda BPM engine.
</div>

<div class="alert alert-warning">
 <p><strong>Enterprise Feature</strong></p>
 Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not available in the community edition.
 <p style="margin-top:10px">Check the <a href="http://camunda.com/bpm/enterprise/ ">Camunda enterprise homepage</a> for more information or get your <a href="http://camunda.com/bpm/enterprise/trial/">free trial version.</a></p></div>

<div class="alert alert-info">
  <p><strong>Reading the Guide</strong></p><br> 
  Throughout this guide we will use a number of variables to denote common path names and constants.<br>
  <code>$WAS_HOME</code> points to the IBM WebSphere application server main directory (typically something like <code>/opt/IBM/WebSphere/AppServer</code>). <br>
  <code>$PLATFORM_VERSION</code> denotes the version of the Camunda BPM platform you want to install or already have installed, e.g., <code>7.2.0</code>. <br>
  <code>$WAS_DISTRIBUTION</code> represents the downloaded Camunda BPM distribution for the IBM WebSphere Application Server, e.g., <code>camunda-ee-ibm-was-$PLATFORM_VERSION.zip</code>.
  <p style="margin-top:10px">
    The distribution is available at the <a href="http://camunda.org/enterprise-release/camunda-bpm/ibm-was/">Camunda enterprise release page</a>.
    You will be asked to enter the credentials you received during the trial or subscription process.
  </p>
</div>