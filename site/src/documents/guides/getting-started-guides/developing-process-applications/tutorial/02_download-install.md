---
title: 'Download and Installation'
category: 'Tutorial'
---

<div class="alert alert-info">
  <p>
    <strong>Before you start</strong><br>
    Make sure you have the following set of tools installed:
  </p>
  <ul>
    <li>Java JDK 1.6+</li>
    <li>Apache Maven (optional, if not installed you can use embedded Maven inside eclipse.)</li>
    <li>A modern Web browser (recent Firefox, Chrome, or Internet Explorer 9+ will work fine)</li>
  </ul>
</div>

###Install camunda BPM platform

First, download a distribution of the camunda BPM platform. You can choose from different distributions for various application servers. In this tutorial, we will use the Apache Tomcat 7 based distribution. Download it [here](http://camunda.org/download).

After having downloaded the distribution, unpack it inside a directory of your choice. We will call that directory `$CAMUNDA_HOME`.

After you have successfully unpacked your distribution of the camunda BPM platform, execute the script named `start-camunda.bat` (for Windows users), respectively `start-camunda.sh` (for Unix users).

This script will start the application server and open a welcome screen in your Web browser. If the page does not open, go to [http://localhost:8080/camunda-welcome/index.html](http://localhost:8080/camunda-welcome/index.html).

<div class="alert alert-info">
  <strong>Getting Help:</strong>
  If you have trouble setting up the camunda BPM platform, you can ask for assistance in the <a href="http://camunda.org/community/forum.html">Process Application Development Forum</a>.
</div>

###Install the camunda Modeler

Follow the instructions in the [camunda Modeler](ref:/guides/installation-guide/camunda-modeler/) section.

<%- @partial('get-code.html.eco', @, {repo: "camunda-get-started"}) %>
