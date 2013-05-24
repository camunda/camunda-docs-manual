/**
 * Listing of indexable documentation pages
 */
CAM_PAGES = [


  // engine api documentation

  { module: "implementation-java", category: "Introduction", id: "impl-java-engine-bootstrap", name: "Startup and Configuration Options", url: "engine/configuration-and-startup", keywords: "engine startup configuration bootstrap overview ProcessEngineConfiguration" },
  { module: "implementation-java", category: "Introduction", id: "impl-pa", name: "Process Applications", url: "engine/process-application", keywords: "process application" },
  { module: "implementation-java", category: "Introduction", id: "impl-concepts", name: "Important Concepts", url: "engine/concepts", keywords: "concepts" },
  { module: "implementation-java", category: "Introduction", id: "impl-activiti-migration", name: "Activiti Migration Guide", url: "engine/activiti-migration-guide", keywords: "activiti migration fox" },

  { module: "implementation-java", category: "Programming", id: "impl-java-services", name: "Services", url: "engine/services", keywords: "services api" },
  { module: "implementation-java", category: "Programming", id: "impl-java-query-api", name: "Query API", url: "engine/query-api", keywords: "query api" },
  { module: "implementation-java", category: "Programming", id: "impl-java-expressions", name: "Expression Language", url: "engine/expressions", keywords: "expression language el uel juel" },
  { module: "implementation-java", category: "Programming", id: "impl-java-testing", name: "Testing", url: "engine/testing", keywords: "testing" },
  { module: "implementation-java", category: "Programming", id: "impl-java-process-visualization", name: "Process Diagram API", url: "engine/process-diagram-api", keywords: "process diagram api visualization" },

  { module: "implementation-java", category: "Spring Integration", id: "impl-spring-engine-bootstrap", name: "Engine Startup via Spring", url: "spring/configuration-and-startup", keywords: "spring engine startup bootstrap" },
  { module: "implementation-java", category: "Spring Integration", id: "impl-spring-expressions", name: "Expression Language", url: "spring/expressions", keywords: "spring expression language el uel juel" },
  { module: "implementation-java", category: "Spring Integration", id: "impl-spring-testing", name: "Testing", url: "spring/testing", keywords: "spring testing" },
  { module: "implementation-java", category: "CDI Integration", id: "impl-cdi-engine-bootstrap", name: "Engine Startup in CDI", url: "cdi/configuration-and-startup", keywords: "cdi engine startup bootstrap" },
  { module: "implementation-java", category: "CDI Integration", id: "impl-cdi-contextual", name: "Contextual Process Execution", url: "cdi/contextual-process-execution", keywords: "cdi Contextual Process Execution" },


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
  { module: "bpmn-impl-reference", category: "Tasks", id: "task-markers", name: "Task Markers (Multiple Instance, Loop and Compensation)", shortName: "Task Markers", url: "tasks/task-markers", keywords: "tasks markers multiple instance loop compensation parallel sequential" },

  { module: "bpmn-impl-reference", category: "Gateways and Sequence Flows", id: "exclusive-gateway", name: "Exclusive Gateway (XOR)", url: "gateways/exclusive-gateway", keywords: "exclusive gateways xor" },
  { module: "bpmn-impl-reference", category: "Gateways and Sequence Flows", id: "sequence-flow", name: "Conditional and default Sequence Flows", url: "gateways/sequence-flow", keywords: "sequence flows conditional default" },
  { module: "bpmn-impl-reference", category: "Gateways and Sequence Flows", id: "parallel-gateway", name: "Parallel Gateway (AND)", url: "gateways/parallel-gateway", keywords: "parallel gateways and" },
  { module: "bpmn-impl-reference", category: "Gateways and Sequence Flows", id: "inclusive-gateway", name: "Inclusive Gateway (OR)", url: "gateways/inclusive-gateway", keywords: "inclusive gateways or" },
  { module: "bpmn-impl-reference", category: "Gateways and Sequence Flows", id: "event-based-gateway", name: "Event Based Gateway", url: "gateways/event-based-gateway", keywords: "event based gateways" },

  { module: "bpmn-impl-reference", category: "Events", id: "blank-event", name: "Blank Event", url: "events/none-events", keywords: "events blank event" },
  { module: "bpmn-impl-reference", category: "Events", id: "message-event", name: "Message Event", url: "events/message-events", keywords: "events message event" },
  { module: "bpmn-impl-reference", category: "Events", id: "timer-event", name: "Timer Event", url: "events/timer-events", keywords: "events timer event" },
  { module: "bpmn-impl-reference", category: "Events", id: "error-event", name: "Error Event", url: "events/error-events", keywords: "events error event" },
  { module: "bpmn-impl-reference", category: "Events", id: "signal-event", name: "Signal Event", url: "events/signal-events", keywords: "events signal event" },
  { module: "bpmn-impl-reference", category: "Events", id: "compensation-event", name: "Cancel and Compensation Event", url: "events/cancel-and-compensation-events", keywords: "events compensation event" },

  { module: "bpmn-impl-reference", category: "Subprocesses", id: "embedded-subprocess", name: "Embedded Subprocess", url: "subprocesses/embedded-subprocess", keywords: "subprocesses embedded subprocess" },
  { module: "bpmn-impl-reference", category: "Subprocesses", id: "call-activity", name: "Call Activity", url: "subprocesses/call-activity", keywords: "subprocesses call activity" },
  { module: "bpmn-impl-reference", category: "Subprocesses", id: "event-subprocess", name: "Event Subprocess", url: "subprocesses/event-subprocess", keywords: "subprocesses event subprocess" },
  { module: "bpmn-impl-reference", category: "Subprocesses", id: "transaction-subprocess", name: "Transaction Subprocess", url: "subprocesses/transaction-subprocess", keywords: "subprocesses transaction subprocess" },


  // rest api documentation

  { module: "rest-api", category: "Overview", id: "introduction", name: "Introduction", url: "overview/introduction", keywords: "rest overview" },
  { module: "rest-api", category: "Overview", id: "distro-use", name: "Use with a pre-built distro", url: "overview/distro-use", keywords: "rest usage distro distribution tomcat jboss glassfish" },
  { module: "rest-api", category: "Overview", id: "embeddability", name: "Embedding the API", url: "overview/embeddability", keywords: "rest usage embed embeddability application jaxrs" },

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
  { module: "rest-api", category: "Process Instance", id: "patch-instance-variables", name: "Update/Delete Process Variables", url: "process-instance/patch-variables", keywords: "instances patch process-instance variables" },
  { module: "rest-api", category: "Process Instance", id: "delete-instance", name: "Delete Process Instance", url: "process-instance/delete", keywords: "instance delete process-instance reason" },

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
  
  { module: "rest-api", category: "Message", id: "post-message", name: "Deliver a Message", url: "message/post-message", keywords: "message post correlation correlate intermediate start event" },
  
  { module: "rest-api", category: "Identity", id: "get-group-info", name: "Get a User's Groups", url: "identity/get-group-info", keywords: "identity get groups user" }
];

CAM_MODULES = {
  "bpmn-impl-reference": { baseUrl: "api-references/bpmn20/", mainPage: "bpmn-overview" },
  "rest-api": { baseUrl: "api-references/rest/", mainPage: "introduction" }
};