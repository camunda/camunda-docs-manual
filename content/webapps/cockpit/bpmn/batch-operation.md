---

title: 'Batch operation'
weight: 10

menu:
  main:
    identifier: "user-guide-cockpit-bpmn-batch-operation"
    parent: "user-guide-cockpit-bpmn"
    pre: "Perform batch operations on process instances"

---

It is possible to execute batch operations on process instances.

# Batch cancellation of process instances

It is now possible to cancel process instances asynchronously based on search criteria and\or list of process instance Id's.

{{< img src="../../img/cockpit-plugins/batch_cancelation.png" alt="Batch Process Instances Cancellation" caption="" >}}

this page is accessible from process instances search on dashboard in cockpit. [Info](https://docs.camunda.org/manual/latest/webapps/cockpit/bpmn/dashboard/#search)

this operation is backed up by corresponding [REST API](https://docs.camunda.org/manual/7.5/reference/rest/process-instance/post-delete/) enpoint. 
