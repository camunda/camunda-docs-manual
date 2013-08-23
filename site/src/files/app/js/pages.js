/**
 * Listing of indexable documentation pages
 */
CAM_PAGES = [

  // bpmn 2.0 reference documentation

  { module: "bpmn-impl-reference", category: "Introduction", id: "bpmn-overview", name: "BPMN 2.0 Overview and Coverage", url: "overview/bpmn-overview", keywords: "concept bpmn 2.0 introduction overview coverage" },
  { module: "bpmn-impl-reference", category: "Introduction", id: "extensions", name: "Custom Extensions", url: "concepts/custom-extensions", keywords: "concept custom extensions" },
  { module: "bpmn-impl-reference", category: "Introduction", id: "listeners", name: "Listeners", url: "concepts/listeners", keywords: "concept task execution listeners" },
  { module: "bpmn-impl-reference", category: "Tasks", id: "service-task", name: "Service Task", url: "tasks/service-task", keywords: "tasks service task" },
  { module: "bpmn-impl-reference", category: "Tasks", id: "user-task", name: "User Task", url: "tasks/user-task", keywords: "tasks user task" },
  { module: "bpmn-impl-reference", category: "Tasks", id: "script-task", name: "Script Task", url: "tasks/script-task", keywords: "tasks script task" },
  { module: "bpmn-impl-reference", category: "Tasks", id: "business-rule-task", name: "Business Rule Task", url: "tasks/business-rule-task", keywords: "tasks business rule task" },
  { module: "bpmn-impl-reference", category: "Tasks", id: "manual-task", name: "Manual Task", url: "tasks/manual-task", keywords: "tasks manual task" },
  { module: "bpmn-impl-reference", category: "Tasks", id: "receive-task", name: "Receive Task", url: "tasks/receive-task", keywords: "tasks receive task" },
  { module: "bpmn-impl-reference", category: "Tasks", id: "send-task", name: "Send Task", url: "tasks/send-task", keywords: "send task" },
  { module: "bpmn-impl-reference", category: "Tasks", id: "task-markers", name: "Task Markers (Multiple Instance, Loop and Compensation)", shortName: "Task Markers", url: "tasks/task-markers", keywords: "tasks markers multiple instance loop compensation parallel sequential" },

  { module: "bpmn-impl-reference", category: "Gateways and Sequence Flows", id: "exclusive-gateway", name: "Exclusive Gateway (XOR)", url: "gateways/exclusive-gateway", keywords: "exclusive gateways xor" },
  { module: "bpmn-impl-reference", category: "Gateways and Sequence Flows", id: "sequence-flow", name: "Conditional and default Sequence Flows", url: "gateways/sequence-flow", keywords: "sequence flows conditional default" },
  { module: "bpmn-impl-reference", category: "Gateways and Sequence Flows", id: "parallel-gateway", name: "Parallel Gateway (AND)", url: "gateways/parallel-gateway", keywords: "parallel gateways and" },
  { module: "bpmn-impl-reference", category: "Gateways and Sequence Flows", id: "inclusive-gateway", name: "Inclusive Gateway (OR)", url: "gateways/inclusive-gateway", keywords: "inclusive gateways or" },
  { module: "bpmn-impl-reference", category: "Gateways and Sequence Flows", id: "event-based-gateway", name: "Event Based Gateway", url: "gateways/event-based-gateway", keywords: "event based gateways" },

  { module: "bpmn-impl-reference", category: "Events", id: "start-event", name: "Start Event", url: "events/start-events", keywords: "events start blank message timer event" },
  { module: "bpmn-impl-reference", category: "Events", id: "blank-event", name: "Blank Event", url: "events/none-events", keywords: "events blank event" },
  { module: "bpmn-impl-reference", category: "Events", id: "message-event", name: "Message Event", url: "events/message-events", keywords: "events message event" },
  { module: "bpmn-impl-reference", category: "Events", id: "timer-event", name: "Timer Event", url: "events/timer-events", keywords: "events timer event" },
  { module: "bpmn-impl-reference", category: "Events", id: "error-event", name: "Error Event", url: "events/error-events", keywords: "events error event" },
  { module: "bpmn-impl-reference", category: "Events", id: "signal-event", name: "Signal Event", url: "events/signal-events", keywords: "events signal event" },
  { module: "bpmn-impl-reference", category: "Events", id: "compensation-event", name: "Cancel and Compensation Event", url: "events/cancel-and-compensation-events", keywords: "events compensation event" },
  { module: "bpmn-impl-reference", category: "Events", id: "link-event", name: "Link Event", url: "events/link-events", keywords: "events link event" },

  { module: "bpmn-impl-reference", category: "Subprocesses", id: "embedded-subprocess", name: "Embedded Subprocess", url: "subprocesses/embedded-subprocess", keywords: "subprocesses embedded subprocess" },
  { module: "bpmn-impl-reference", category: "Subprocesses", id: "call-activity", name: "Call Activity", url: "subprocesses/call-activity", keywords: "subprocesses call activity" },
  { module: "bpmn-impl-reference", category: "Subprocesses", id: "event-subprocess", name: "Event Subprocess", url: "subprocesses/event-subprocess", keywords: "subprocesses event subprocess" },
  { module: "bpmn-impl-reference", category: "Subprocesses", id: "transaction-subprocess", name: "Transaction Subprocess", url: "subprocesses/transaction-subprocess", keywords: "subprocesses transaction subprocess" },


  // rest api documentation

  { module: "rest-api", category: "Overview", id: "introduction", name: "Introduction", url: "overview/introduction", keywords: "rest overview error exception authorization unauthorized" },
  { module: "rest-api", category: "Overview", id: "distro-use", name: "Use with a pre-built distro", url: "overview/distro-use", keywords: "rest usage distro distribution tomcat jboss glassfish" },
  { module: "rest-api", category: "Overview", id: "embeddability", name: "Embedding the API", url: "overview/embeddability", keywords: "rest usage embed embeddability application jaxrs" },
  { module: "rest-api", category: "Overview", id: "authentication", name: "Configuring Authentication", url: "overview/authentication", keywords: "rest authentication http basic base64 filter" },

  { module: "rest-api", category: "Process Engine", id: "get-engine-names", name: "Get Engine Names", url: "engine/get-names", keywords: "get process engine processengine name list all" },

  { module: "rest-api", category: "Process Definition", id: "get-definition", name: "Get Single Definition", url: "process-definition/get", keywords: "definition get process-definition" },
  { module: "rest-api", category: "Process Definition", id: "get-definitions", name: "Get Definitions", url: "process-definition/get-query", keywords: "definitions get process-definition query filter" },
  { module: "rest-api", category: "Process Definition", id: "get-definitions-count", name: "Get Definitions Count", url: "process-definition/get-query-count", keywords: "definitions get process-definition query filter count" },
  { module: "rest-api", category: "Process Definition", id: "get-definition-xml", name: "Get BPMN 2.0 XML", url: "process-definition/get-xml", keywords: "definition get process-definition xml bpmn 2.0 2" },
  { module: "rest-api", category: "Process Definition", id: "post-start-process-instance", name: "Start Process Instance", url: "process-definition/post-start-process-instance", keywords: "definition post process-definition start instance" },
  { module: "rest-api", category: "Process Definition", id: "get-statistics", name: "Get Process Instance Statistics", url: "process-definition/get-statistics", keywords: "definitions get process-definition instance statistics aggregate sum" },
  { module: "rest-api", category: "Process Definition", id: "get-activity-statistics", name: "Get Activity Instance Statistics", url: "process-definition/get-activity-statistics", keywords: "definitions get process-definition activity statistics aggregate sum" },
  { module: "rest-api", category: "Process Definition", id: "get-start-form-key", name: "Get Start Form Key", url: "process-definition/get-start-form-key", keywords: "definition get process-definition startForm start form key" },

  { module: "rest-api", category: "Process Instance", id: "get-instance", name: "Get Single Instance", url: "process-instance/get", keywords: "instance get process-instance" },
  { module: "rest-api", category: "Process Instance", id: "get-instances", name: "Get Instances", url: "process-instance/get-query", keywords: "instances get process-instance query filter" },
  { module: "rest-api", category: "Process Instance", id: "get-instances-count", name: "Get Instances Count", url: "process-instance/get-query-count", keywords: "instances get process-instance query filter count" },
  { module: "rest-api", category: "Process Instance", id: "post-instances", name: "Get Instances (POST)", url: "process-instance/post-query", keywords: "instances post process-instance query filter" },
  { module: "rest-api", category: "Process Instance", id: "post-instances-count", name: "Get Instances Count (POST)", url: "process-instance/post-query-count", keywords: "instances post process-instance query filter count" },
  { module: "rest-api", category: "Process Instance", id: "get-instance-variable", name: "Get Single Process Variable", url: "process-instance/get-single-variable", keywords: "instances get process-instance variable single" },
  { module: "rest-api", category: "Process Instance", id: "put-instance-variable", name: "Put Single Process Variable", url: "process-instance/put-single-variable", keywords: "instances put process-instance variable single" },
  { module: "rest-api", category: "Process Instance", id: "get-instance-variable", name: "Delete Single Process Variable", url: "process-instance/delete-single-variable", keywords: "instances delete process-instance variable single" },
  { module: "rest-api", category: "Process Instance", id: "get-instance-variables", name: "Get Process Variables", url: "process-instance/get-variables", keywords: "instances get process-instance variables" },
  { module: "rest-api", category: "Process Instance", id: "post-instance-variables", name: "Update/Delete Process Variables", url: "process-instance/post-variables", keywords: "instances post process-instance variables" },
  { module: "rest-api", category: "Process Instance", id: "delete-instance", name: "Delete Process Instance", url: "process-instance/delete", keywords: "instance delete process-instance reason" },
  { module: "rest-api", category: "Process Instance", id: "get-activity-instances", name: "Get Activity Instances", url: "process-instance/get-activity-instances", keywords: "instance get activity activity-instance process-instance tree" },

  { module: "rest-api", category: "Execution", id: "get-execution", name: "Get Single Execution", url: "execution/get", keywords: "executions execution get" },
  { module: "rest-api", category: "Execution", id: "get-executions", name: "Get Executions", url: "execution/get-query", keywords: "executions execution get query filter" },
  { module: "rest-api", category: "Execution", id: "get-executions-count", name: "Get Executions Count", url: "execution/get-query-count", keywords: "executions execution get query filter count" },
  { module: "rest-api", category: "Execution", id: "post-executions", name: "Get Executions (POST)", url: "execution/post-query", keywords: "executions execution post query filter" },
  { module: "rest-api", category: "Execution", id: "post-executions-count", name: "Get Executions Count (POST)", url: "execution/post-query-count", keywords: "executions execution post query filter count" },
  { module: "rest-api", category: "Execution", id: "get-local-execution-variable", name: "Get Local Execution Variable", url: "execution/get-local-variable", keywords: "executions get execution variable local" },
  { module: "rest-api", category: "Execution", id: "put-local-execution-variable", name: "Put Local Execution Variable", url: "execution/put-local-variable", keywords: "executions put execution variable local" },
  { module: "rest-api", category: "Execution", id: "delete-local-execution-variable", name: "Delete Local Execution Variable", url: "execution/delete-local-variable", keywords: "executions delete execution variable local" },
  { module: "rest-api", category: "Execution", id: "get-local-execution-variables", name: "Get Local Execution Variables", url: "execution/get-local-variables", keywords: "executions get execution variables local" },
  { module: "rest-api", category: "Execution", id: "post-local-execution-variables", name: "Update/Delete Local Execution Variables", url: "execution/post-local-variables", keywords: "executions post execution variables local" },
  { module: "rest-api", category: "Execution", id: "signal-execution", name: "Trigger Execution", url: "execution/post-signal", keywords: "executions execution post signal trigger" },
  { module: "rest-api", category: "Execution", id: "get-message-subscription", name: "Get Message Event Subscription", url: "execution/get-message-subscription", keywords: "executions execution get message event subscription" },
  { module: "rest-api", category: "Execution", id: "post-message", name: "Trigger Message Event Subscription", url: "execution/post-message", keywords: "executions execution post message event subscription trigger" },

  { module: "rest-api", category: "Job", id: "get-job", name: "Get Single Job", url: "job/get", keywords: "jobs job get" },
  { module: "rest-api", category: "Job", id: "get-jobs", name: "Get Jobs", url: "job/get-query", keywords: "jobs job get query filter" },
  { module: "rest-api", category: "Job", id: "get-jobs-count", name: "Get Jobs Count", url: "job/get-query-count", keywords: "jobs job get query filter count" },
  { module: "rest-api", category: "Job", id: "post-jobs", name: "Get Jobs (POST)", url: "job/post-query", keywords: "jobs job post query filter" },
  { module: "rest-api", category: "Job", id: "post-jobs-count", name: "Get Jobs Count (POST)", url: "job/post-query-count", keywords: "jobs job post query filter count" },
  { module: "rest-api", category: "Job", id: "put-set-job-retries", name: "Set Job Retries", url: "job/put-set-job-retries", keywords: "jobs put job set retries" },
  { module: "rest-api", category: "Job", id: "put-set-job-duedate", name: "Set Job Due Date", url: "job/put-set-job-duedate", keywords: "jobs put job set due date" },
  { module: "rest-api", category: "Job", id: "post-execute-job", name: "Execute Job", url: "job/post-execute-job", keywords: "jobs post job execute" },
  { module: "rest-api", category: "Job", id: "get-exception-stacktrace", name: "Get Exception Stacktrace", url: "job/get-exception-stacktrace", keywords: "jobs get job exception stacktrace" },

  { module: "rest-api", category: "Task", id: "get-task", name: "Get Single Task", url: "task/get", keywords: "task get" },
  { module: "rest-api", category: "Task", id: "get-tasks", name: "Get Tasks", url: "task/get-query", keywords: "tasks get task filter query" },
  { module: "rest-api", category: "Task", id: "get-tasks-count", name: "Get Tasks Count", url: "task/get-query-count", keywords: "tasks get task filter query count" },
  { module: "rest-api", category: "Task", id: "post-tasks", name: "Get Tasks (POST)", url: "task/post-query", keywords: "tasks post task filter query" },
  { module: "rest-api", category: "Task", id: "post-tasks-count", name: "Get Tasks Count (POST)", url: "task/post-query-count", keywords: "tasks post task filter query count" },
  { module: "rest-api", category: "Task", id: "get-form-key", name: "Get Form Key", url: "task/get-form-key", keywords: "tasks get task form key" },
  { module: "rest-api", category: "Task", id: "post-claim", name: "Claim Task", url: "task/post-claim", keywords: "tasks post task claim" },
  { module: "rest-api", category: "Task", id: "post-unclaim", name: "Unclaim Task", url: "task/post-unclaim", keywords: "tasks post task unclaim" },
  { module: "rest-api", category: "Task", id: "post-complete", name: "Complete Task", url: "task/post-complete", keywords: "tasks post task complete variables" },
  { module: "rest-api", category: "Task", id: "post-resolve", name: "Resolve Task", url: "task/post-resolve", keywords: "tasks post task resolve variables" },
  { module: "rest-api", category: "Task", id: "post-delegate", name: "Delegate Task", url: "task/post-delegate", keywords: "tasks post task delegate assignee" },
  { module: "rest-api", category: "Task", id: "post-assignee", name: "Set Assignee", url: "task/post-assignee", keywords: "post task set assignee" },

  { module: "rest-api", category: "Message", id: "post-message", name: "Deliver a Message", url: "message/post-message", keywords: "message post correlation correlate intermediate start event" },

  { module: "rest-api", category: "Variable Instance", id: "get-variable-instances", name: "Get Variable Instances", url: "variable-instance/get-query", keywords: "variable instances get variable-instance query filter" },
  { module: "rest-api", category: "Variable Instance", id: "get-variable-instances-count", name: "Get Variable Instances Count", url: "variable-instance/get-query-count", keywords: "variable instances get variable-instance query filter count" },
  { module: "rest-api", category: "Variable Instance", id: "post-variable-instances", name: "Get Variable Instances (POST)", url: "variable-instance/post-query", keywords: "variable instances post variable-instance query filter" },
  { module: "rest-api", category: "Variable Instance", id: "post-variable-instances-count", name: "Get Variable Instances Count (POST)", url: "variable-instance/post-query-count", keywords: "variable instances post variable-instance query filter count" },

  { module: "rest-api", category: "User", id: "user-options", name: "OPTIONS", url: "user/options", keywords: "options user" },
  { module: "rest-api", category: "User", id: "create-user", name: "Create single User", url: "user/post-create", keywords: "identity user create new post" },
  { module: "rest-api", category: "User", id: "delete-user", name: "Delete single User", url: "user/delete", keywords: "identity user delete" },
  { module: "rest-api", category: "User", id: "get-user", name: "Get a User's Profile", url: "user/get", keywords: "identity user profile get" },
  { module: "rest-api", category: "User", id: "get-users", name: "Get Users", url: "user/get-query", keywords: "identity user get query" },
  { module: "rest-api", category: "User", id: "get-users-count", name: "Get Users Count", url: "user/get-query-count", keywords: "identity user get query count" },
  { module: "rest-api", category: "User", id: "put-user-profile", name: "Update a User's Profile", url: "user/put-update-profile", keywords: "identity user put update profile save" },
  { module: "rest-api", category: "User", id: "put-user-credentials", name: "Update a User's Credentials", url: "user/put-update-credentials", keywords: "identity user post update save password credential credentials" },

  { module: "rest-api", category: "Group", id: "group-options", name: "OPTIONS", url: "group/options", keywords: "options group" },
  { module: "rest-api", category: "Group", id: "create-group", name: "Create single Group", url: "group/post-create", keywords: "identity group create new post" },
  { module: "rest-api", category: "Group", id: "create-group-member", name: "Create Group Member", url: "group/members/put", keywords: "identity group create add member membership put" },
  { module: "rest-api", category: "Group", id: "delete-group", name: "Delete single Group", url: "group/delete", keywords: "identity group delete" },
  { module: "rest-api", category: "Group", id: "delete-group-member", name: "Delete Group Member", url: "group/members/delete", keywords: "identity group member membership remove delete" },
  { module: "rest-api", category: "Group", id: "get-group", name: "Get single Group", url: "group/get", keywords: "identity group get" },
  { module: "rest-api", category: "Group", id: "get-groups", name: "Get Groups", url: "group/get-query", keywords: "identity group get query" },
  { module: "rest-api", category: "Group", id: "get-groups-count", name: "Get Groups Count", url: "group/get-query-count", keywords: "identity group get query count" },
  { module: "rest-api", category: "Group", id: "put-group", name: "Update single Group", url: "group/put-update", keywords: "identity group put update save" },

  { module: "rest-api", category: "Authorization", id: "authorization-options", name: "OPTIONS", url: "authorization/options", keywords: "options authorization" },
  { module: "rest-api", category: "Authorization", id: "check-authorization", name: "Check Authorization", url: "authorization/get-check", keywords: "authorization check get" },
  { module: "rest-api", category: "Authorization", id: "create-authorization", name: "Create single Authorization", url: "authorization/post-create", keywords: "authorization create new post" },
  { module: "rest-api", category: "Authorization", id: "delete-authorization", name: "Delete single Authorization", url: "authorization/delete", keywords: "authorization delete remove" },
  { module: "rest-api", category: "Authorization", id: "get-authorization", name: "Get Authorizations", url: "authorization/get-query", keywords: "authorization get query search" },
  { module: "rest-api", category: "Authorization", id: "get-authorizations", name: "Get Authorization Count", url: "authorization/get-query-count", keywords: "authorization get count query search" },
  { module: "rest-api", category: "Authorization", id: "get-authorization-count", name: "Get single Authorization", url: "authorization/get", keywords: "authorization get search" },
  { module: "rest-api", category: "Authorization", id: "put-authorization", name: "Update single Authorization", url: "authorization/put-update", keywords: "authorization put update" },

  // deployment descriptor reference

  { module: "deployment-descriptor-reference", category: "Overview", id: "overview", name: "Overview", url: "overview", keywords: "deployment descriptor introduction overview" },

  { module: "deployment-descriptor-reference", category: "Descriptors", id: "descriptors/bpm-platform-xml", name: "bpm-platform.xml", url: "descriptors/bpm-platform-xml", keywords: "process engine" },
  { module: "deployment-descriptor-reference", category: "Descriptors", id: "descriptors/processes-xml", name: "processes.xml", url: "descriptors/processes-xml", keywords: "process engine" },

  { module: "deployment-descriptor-reference", category: "XMLTags", id: "tags/process-archive", name: "<process-archive>", url: "tags/process-archive", keywords: "process engine" },
  { module: "deployment-descriptor-reference", category: "XMLTags", id: "tags/process-engine", name: "<process-engine>", url: "tags/process-engine", keywords: "process engine" },
  { module: "deployment-descriptor-reference", category: "XMLTags", id: "tags/job-executor", name: "<job-executor>", url: "tags/job-executor", keywords: "process engine" }

];

CAM_MODULES = {
  "bpmn-impl-reference": { baseUrl: "api-references/bpmn20/", mainPage: "bpmn-overview" },
  "rest-api": { baseUrl: "api-references/rest/", mainPage: "introduction" },
  "deployment-descriptor-reference": { baseUrl: "api-references/deployment-descriptors/", mainPage: "overview" },
};
