---
title: 'What you will learn'
category: 'Tutorial'
---

This tutorial guides you through setting up Camunda BPM and developing your first application with a CMMN case. You will learn to

<dl class="dl-horizontal">
  <dt>
    <a href="ref:#tutorial-download-and-installation">Install</a>
  </dt>
  <dd>
     the Camunda BPM platform on your machine. In this tutorial we use the Apache Tomcat based distribution.
  </dd>
  <dt>
    <a href="ref:#tutorial-set-up-your-project">Set up</a>
  </dt>
  <dd>
    an Apache Maven based process application inside eclipse and deploy it to the Camunda BPM platform.
  </dd>
  <dt>
    <a href="ref:#tutorial-create-a-cmmn-case">Create a Case</a>
  </dt>
  <dd>
    We will create and configure a fully executable CMMN case in XML.
  </dd>
  <dt>
    <a href="ref:#tutorial-create-a-cmmn-case-modelcreate-add-human-tasks">Create Human Tasks</a>
  </dt>
  <dd>
    We will add human tasks to the CMMN case and use the Camunda Tasklist to complete the tasks.
  </dd>
  <dt>
    <a href="#tutorial-add-a-milestone">Event-driven Actions</a>
  </dt>
  <dd>
     You will learn how to activate and cancel tasks in CMMN, based on events.
  </dd>
</dl>

<div class="alert alert-info">
  <p><strong>Modeling CMMN cases</strong></p>
  <p>CMMN is a young standard for which there are not many modeling tools yet. Currently, Camunda does not offer a modeling tool. We have had good experiences with the <a href="http://www.cmmnwebmodeler.com/">Trisotech CMMN modeler</a> that offers a free 30 day trial. You can use it to graphically model along the steps we perform in this tutorial. However, this tutorial does not teach you how to use that modeler.</p>
</div>
