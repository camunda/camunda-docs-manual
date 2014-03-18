---

title: 'Migrate your Process Application'
category: 'Migrate from camunda fox'

---

You have to follow these steps:

*   Do the Activiti migration as described above as camunda fox included the Activiti engine.
*   Remove the `fox-platform-client.x.jar` from your deployment - it is not needed anymore.
*   Add a Process Application Class, see [Process Applications](ref:/guides/user-guide/#process-applications-the-process-application-class).
*   If you don't use our engine as embedded jar, you should set your maven-dependency for it to **provided-scope**
*   Adjust the `processes.xml` to the new format, see [Process Applications](ref:/guides/user-guide/#process-applications-the-processesxml-deployment-descriptor).
*   If you migrate completely to our new distro you have to adjust your `presistence.xml` from **FoxEngineDS** to **ProcessEngine**
*   If you use the new camunda Tasklist component you have to adjust the `formKey`, as described in the [Getting Started](http://camunda.org/implement/getting-started.html). We provide more information soon. For JSF-Formkeys your formkey should have the following format: `/<application-context-path>/<form>.jsf`. E.g.: `/loan-approval/request-loan.jsf`
*   If you use the `fox.taskForm` bean as described in [Add forms to your Process Application](https://app.camunda.com/confluence/display/foxUserGuide/Add+forms+to+your+Process+Application) you have to make sure to have the `camunda-engine-cdi` dependency on your classpath:

    ```xml
    <dependency>
      <groupId>org.camunda.bpm</groupId>
      <artifactId>camunda-engine-cdi</artifactId>
      <version>$PLATFORM_VERSION</version>
    </dependency>
    ```
*   If you use `@Inject` with TaskForm, you have to add a `@Named("...")` annotation to the `@Inject` annotation due to backward-compatibility of `fox.taskForm`. There you have two choices: If you are using `fox.taskForm` in your process application and don't want to update all your jsf pages and beans you should use `@Named("fox.taskForm")` else you should use `@Named("camundaTaskForm")`. Your application server should write an error or a warning if you use the wrong one. So be carefull! However, we recommend you to use the annotation `@Named("camundaTaskForm")`.
*   Since camunda BPM 7.0 the unique constraint for the business key is removed in the runtime and history tables and the database schema create and drop scripts. The [migration scripts](https://app.camunda.com/nexus/index.html#view-repositories;camunda-bpm~browsestorage~/org/camunda/bpm/distro/camunda-sql-scripts/) does not include the drop statements of the unique constraint for the business key. So if you do not rely on the unique constraint for the business key, you are able to delete the unique constraint by your own. See the following documentation about the [Business Key](ref:/guides/user-guide/#process-engine-database-configuration-business-key) to delete the unique constraint corresponding to your database.
*   If you do a JNDI lookup to get one of the Platform Services (i.e. `ProcessArchiveService` or `ProcessEngineService`), you have to adjust the JNDI name to do the lookup as following:
    *   ProcessArchiveService:
        *   Old JNDI name: `java:global/camunda-fox-platform/process-engine/PlatformService!com.camunda.fox.platform.api.ProcessArchiveService`
        *   New JNDI name: `java:global/camunda-bpm-platform/process-engine/ProcessApplicationService!org.camunda.bpm.ProcessApplicationService`
        *   **Note:** The name of `ProcessArchiveService` has changed to `ProcessApplicationService`.
    *   ProcessEngineService:
        *   Old JNDI name: `java:global/camunda-fox-platform/process-engine/PlatformService!com.camunda.fox.platform.api.ProcessEngineService`
        *   New JNDI name: `java:global/camunda-bpm-platform/process-engine/ProcessEngineService!org.camunda.bpm.ProcessEngineService`

<div class="panel-group" >
  <div class="panel panel-default" id="foxClasses">
    <div class="panel-heading">
      <a class="accordion-toggle" data-toggle="collapse" data-parent="#foxClasses" href="#foxClassesCollapsed">
        <i class="glyphicon glyphicon-question-sign"></i>
        Which camunda fox class names have changed?
      </a>
    </div>
    <div id="foxClassesCollapsed" class="panel-collapse collapse">
      <div class="panel-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>component</th>
              <th>camunda fox class name</th>
              <th>camunda BPM class name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>fox-platform-api</td>
              <td>ProcessArchiveService</td>
              <td>ProcessApplicationService</td>
            </tr>
            <tr>
              <td>fox-platform-client</td>
              <td>ProcessArchiveSupport</td>
              <td>DefaultEjbProcessApplication</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>