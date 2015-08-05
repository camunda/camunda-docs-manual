---

title: 'Deployment Descriptor Reference'
weight: 80

menu:
  main:
    identifier: "descriptor-ref"

---

This reference explains the syntax of the camunda BPM deployment descriptors. The deployment descriptors are xml configuration files which allow configuration of the camunda BPM platform and declaratively specify the BPMN 2.0 deployments to the process engine.

camunda BPM provides the following deployment descriptors:

* [bpm-platform.xml](ref:#descriptors-bpm-platformxml): packaged as part of the camunda BPM platform and allows configuration of shared process engines and the job executor.
* [processes.xml](ref:#descriptors-processesxml): packaged as part of a process application and allows configuration of additional process engines and BPMN 2.0 process deployments.

<div class="alert alert-warning">
  <p>
    <strong>Syntax Reference</strong>
  </p>
  <p>This guide is a syntax reference for the above mentioned files. The <a href="ref:/guides/user-guide/">User Guide</a> explains when and how to use the deployment descriptors.</p>
</div>
