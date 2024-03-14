---

title: 'Performance'
weight: 60
menu:
  main:
    identifier: "user-guide-process-engine-database-performance"
    parent: "user-guide-process-engine-database"

---

This page explains specific performance-related topics of database queries. It does not attempt to provide tools and guidance for general performance analysis and optimization of Camunda 7 installations. 

As the impact of the settings discussed here largely depends on the setup and workload of Camunda 7, the recommendations may or may not help in your case. Performance improvements are not guaranteed.

# Task Query

The task query is one of the heaviest used and most powerful queries of the process engine API. Due to its rich feature set, it can also become complex in SQL and may perform badly. 

## Disabling CMMN and Standalone Tasks

To perform transparent access checks, the task query joins the authorization table (`ACT_RU_AUTHORIZATION`). For any kind of process-related filters, it joins the process definition table (`ACT_RE_PROCDEF`). By default, the query uses a left join for these operations. If CMMN and standalone tasks (tasks that are neither related to a BPMN process, nor a CMMN case) are not used, the engine configuration flags `cmmnEnabled` and `standaloneTasksEnabled` can be set to `false`. Then, the left joins are replaced by inner joins which perform better on some databases. See the [configuration properties reference]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#configuration-properties" >}}) for details on these settings.
