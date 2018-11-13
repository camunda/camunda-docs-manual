---

title: 'Custom Code & Security'
weight: 95

menu:
  main:
    identifier: "user-guide-process-engine-securing-custom-code"
    parent: "user-guide-process-engine"

---

The process engine offers numerous extension points for customization of process behavior by using [Java Code]({{< relref "delegation-code.md" >}}), [Expression Language]({{< relref "expression-language.md" >}}), [Scripts]({{< relref "scripting.md" >}}), and [Templates]({{< relref "templating.md" >}}). While these extension points allow for great flexibility in process implementation, they open up the possibility to perform malicious actions when in the wrong hands. It is therefore advisable to restrict access to API that allows custom code submission to trusted parties only. The following concepts exist that allow submitting custom code (via Java or REST API):

* **Deployment**: Most of the custom logic is submitted with the deployment of a process, case, or decision model. For example, an execution listener invocation is defined in the BPMN 2.0 XML.
* **Queries**: Queries offer the ability to include expressions for certain parameters (currently task queries only). This enables users to define reusable queries that can be repeatedly executed and dynamically adapted to changing circumstances. For example, a task query `taskService.createTaskQuery().dueBeforeExpression(${now()}).list();` uses an expression to always return the tasks currently due. Camunda [Tasklist]({{< ref "/webapps/tasklist/_index.md" >}}) makes use of this feature in the form of [task filters]({{< ref "/webapps/tasklist/filters.md" >}}).

Only trusted users should be authorized to interact with these endpoints. How access can be restricted is outlined in the next sections.

# Camunda BPM in a Trusted Environment

When Camunda BPM is deployed in an environment where only trusted parties can access the system (for example due to firewall policies), no untrusted party can access the APIs for submitting custom code and the following suggestions need not be adhered to.

# Deployments

Access to performing deployments can be restricted by using the [authorization infrastructure]({{< relref "authorization-service.md" >}}) and activating authentication checks for any endpoint a potentially untrusted party may access. The crucial permission for making deployments is `Deployment/Create`. Untrusted users should not be granted this permission.

# Queries

Query access cannot be generally restricted with authorizations. Instead, a query's result is reduced to entities a user is authorized to access. Thus, authorization permissions cannot be used to guard expression evaluation in queries.

The process engine configuration offers two flags to toggle expression evaluation in *adhoc* and *stored* queries. Adhoc queries are directly submitted queries. For example, `taskService.createTaskQuery().list();` creates and executes an adhoc query. In contrast, a stored query is persisted along with a filter and executed when the filter is executed. Expressions in adhoc queries can be disabled by setting the configuration property `enableExpressionsInAdhocQueries` to `false`. Accordingly, the property `enableExpressionsInStoredQueries` disables expressions in stored queries. If an expression is used although expression evaluation is disabled, the process engine raises an exception before evaluating any expression, thereby preventing malicious code from being executed.

The following configuration combinations exist:

* `enableExpressionsInAdhocQueries`=`true`, `enableExpressionsInStoredQueries`=`true`: Expression evaluation is enabled for any query. Use this setting if all users are trusted.
* `enableExpressionsInAdhocQueries`=`false`, `enableExpressionsInStoredQueries`=`true`: **Default Setting**. Adhoc queries may not use expressions, however filters with expressions can be defined and executed. Access to filter creation can be restricted by the granting the authorization permission `Filter/Create`. Use this setting if all users authorized to create filters are trusted.
* `enableExpressionsInAdhocQueries`=`false`, `enableExpressionsInStoredQueries`=`false`: Expressions are disabled for all queries. Use this setting if none of the above settings can be applied.
