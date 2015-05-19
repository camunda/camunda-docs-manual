---

title: 'Migrate your Process Application'
category: 'Migrate from Camunda BPM 7.0 to 7.1'

---

To migrate your process application from Camunda BPM 7.0 to Camunda BPM 7.1, you need to follow these steps:

*   If you use `@Inject` with TaskForm, you have to add a `@Named("...")` annotation to the `@Inject` annotation due to backward-compatibility of `camunda.taskForm`.
	There you have two choices: If you are using `camunda.taskForm` in your process application and don't want to update all your jsf pages and beans you should use `@Named("camunda.taskForm")`,
	otherwise you should use `@Named("camundaTaskForm")`. Your application server should write an error or a warning if you use the wrong one. So be careful! However, we recommend that you use the annotation `@Named("camundaTaskForm")`.

In case you have to migrate (upgrade) the version of running process instances, we provide more information in our [User Guide](ref:/guides/user-guide/#process-engine-process-versioning-version-migration).
