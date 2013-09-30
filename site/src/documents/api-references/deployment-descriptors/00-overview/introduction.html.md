---

title: 'Deployment Descriptor Reference'
category: 'Overview'

---


This reference explains the syntax of the camunda BPM deployment descriptors. The deployment descriptors are xml configuration files which allow to configure the camunda BPM platform and declaratively specify the BPMN 2.0 deployments to the process engine.

camunda BPM provides the following deployment descriptors:

* [bpm-platform.xml](#descriptors-bpm-platformxml): packaged as part of the camunda BPM platform and allows configuring shared process engines and the job executor.
* [processes.xml](#descriptors-processesxml): packaged as part of a process application and allows configuring additional process engines and BPMN 2.0 process deployments.

<div class="alert alert-warning">
  <p>
    <strong>Syntax Reference</strong>
  </p>
  <p>This guide is a syntax reference for the above mentioned files. The <a href="ref:/guides/user-guide/">User Guide</a> explains when and how to use the deployment descriptors.</p>
</div>
