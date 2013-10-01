---

title: 'Process Versioning'
category: 'Process Engine'

---

## Versioning of process definitions

Business Processes are by nature long running. The process instances will maybe last for weeks, or months. In the meantime the state of the process instance is stored to the database. But sooner or later you might want to change the process definition even if there are still running instances.

This is supported by the process engine:

* If you redeploy a changed process definition you get a new version in the database.
* Running process instance will keep running in the version they were started with.
* New process instances will run in the new version - unless specified explicitley. 
* Support for migrating process instances to new a version is supported within certain limits. 

So you can see different version in the process definition table and the process instaces are linked to this:

<center><img src="ref:asset:/assets/img/implementation-java/versioning.png" class="img-responsive"/></center>


## Which version will be used

When you start a process instance

* by **key**: It starts an instance of the **latest deployed version** of the process definition with the key.
* by **id**: It starts an instance of the deployed process definition with the database id. By using this you can start a **specific version**.

The default and recommended usage is to just use `startProcessInstanceByKey` and always use the latest version:

    processEngine.getRuntimeService().startProcessInstanceByKey("invoice"); 
    // will use the latest version (2 in our example)
If you want to specifically start an instance of an old process definition, use a Process Definition Query to find the correct ProcessDefinition id and `startProcessInstanceById`:

    ProcessDefinition pd = processEngine.getRepositoryService().createProcessDefinitionQuery()
        .processDefinitionKey("invoice")
        .processDefinitionVersion(1).singleResult();
    processEngine.getRuntimeService().startProcessInstanceById(pd.getId());

When you use [BPMN CallActivities](ref:/api-references/bpmn20/#subprocesses-call-activity) you can configure which version is used:

    <callActivity id="callSubProcess" calledElement="checkCreditProcess"
      camunda:calledElementBinding="latest|deployment|version"
      camunda:calledElementVersion="17">
    </callActivity>

The options are

* latest: use the latest version of the process definition (as with `startProcessInstanceByKey`).
* deployment: use the process definition in the version matching the version of the calling process. This works if they are deployed within one deployment - as then they are always versioned together (see [Process Application Deployment](ref:/guides/user-guide/#process-applications-the-processesxml-deployment-descriptor-process-application-deployment) for more details). 
* version: specify the version hard coded in the XML.



## Key vs. ID of a process definition

You might have spotted that two different columns exist in the process definition table with different meanings:

* Key: The key is the unique identifier of the process definition in the XML, so its value is read from the id attribute in the XML: 

    ```xml
    <bpmn2:process id="invoice" ...```

* Id: The id is the database primary key and an artificial key normally combined out of the key, the version and a generated id (note that the ID may be shortened to fit into the database column, so there is no guarantee that the id is built this way).




## Version Migration

Sometimes it is necessary to migrate (upgrade) running process instances to a new version, maybe you added an important new task or even fixed a bug. In this case we can migrate the running process instances to the new version.

Please not that migration can only be applied if a process instance is currently in a persistent wait state, see [Transactions in Processes](ref:/guides/user-guide/#process-engine-transactions-in-processes).

<div class="alert alert-warning">
      <strong>Heads-Up</strong>
      Due to the risks and limitations mentioned above this is considered an **advanced use case**. It is not available over the public API - but you can use an internal command.
</div>

    public void migrateVersion() {
       String processInstanceId = "71712c34-af1d-11e1-8950-08002700282e";
       int newVersion = 2;
       SetProcessDefinitionVersionCmd command = 
          new SetProcessDefinitionVersionCmd(processInstanceId, newVersion);
       ((ProcessEngineImpl) ProcessEngines.getDefaultProcessEngine())
            .getProcessEngineConfiguration()
            .getCommandExecutorTxRequired().execute(command);
    }

### Risks and limitations of Version Migration

Process Version Migration is not an easy topic on itself. Migrating process instances to a new version works only if:

* for all currently existing executions and running tokens
* the "current activity" with the same id still exists in the new process definition
* and the scopes, sub executions, jobs and so on are still valid.

Hence the cases, in which this simple instance migration works, are limited. The following examples will cause problems: If the new version introduces a **new (message / signal / timer) boundary event attached to an activity**, process instances which are waiting at this activity **cannot be migrated** (since the activity is a scope in the new version and not a scope in the old version).

* If the new version introduces a new (message / signal / timer) boundary event attached to a subprocess, process instances which are waiting in an activity contained by the subprocess can be migrated, but the event will never trigger (event subscription / timer not created when entering the scope).
* If the new version removes a (message / signal / timer) boundary event attached to an activity, process instances which are waiting at this activity cannot be migrated.
* If the new version removes a timer boundary event attached to a subprocess, process instances which are waiting at an activity contained by the subprocess can be migrated. If the timer job is triggered (executed by the job executor) it will fail. The timer job is removed with the scope execution.
* If the new version removes a signal or message boundary event attached to a subprocess, process instances which are waiting at an activity contained by the subprocess can be migrated.The signal/message subscription already exists but cannot be trigged anymore. The subscription is removed with the scope execution.
* If a new version changes field injection on Java classes, you might want to set attributes on a Java class which doesn't exist any more or the other way round: you are missing attributes.

Other important aspects to think of when doing version migration are:

* Execution: Migration can lead to situations where some activities from the old or new process definition might have never been executed for some process instances. Keep this in mind, you might have to deal with this in some of your own migration scripts.
* Traceability and Audit Trail: Is the produced audit trail still valid if some entries point to version 1 and some to version 2? Do all activities still exist in the new process definition?
* Reporting: Your reports may be broken or showing strange figures if they get confused by version mishmash.
* KPI Monitoring: Let's assume you introduced new KPI's, for migrated process instances you might get only parts of the figures. Does this do any harm to your monitoring?

If you cannot migrate your process instance you have a couple of alternatives, for example:

* Keep running the old version (as described at the beginning).
* Cancel the old process instance and start a new one. The challenge might be to skip activities already executed and "jump" to the right wait state. This is currently a difficult task, you could maybe leverage Message Start Events here. We are currently discussing to provide more support on this in Migration Points. Sometimes you can skip this by adding some magic to your code or deploy some mocks during a migration phase or by another creative solution.
* Cancel the old process instances and start a new one in a completely customized migration process definition.

So there is actually not "the standard" way, in doubt discuss with us right solution for your environment.