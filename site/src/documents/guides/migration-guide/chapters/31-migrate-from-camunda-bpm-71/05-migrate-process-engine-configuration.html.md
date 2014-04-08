---

title: 'Migrate Process Engine Configuration'
category: 'Migrate from camunda bpm 7.1 to 7.2'

---

### Set autoStoreScriptVariables

With 7.2, the default behavior of script variables is changed. Script
variables are set in e.g. a BPMN Script Task using a script language such as
JavaScript or Groovy. In previous versions, the process engine automatically
stored all script variables as process variables. Starting from 7.2, this
behavior is changed and the process engine does not automatically store script
variables. You can re-enable the legacy behavior by setting the boolean flag
`autoStoreScriptVariables` to `true` in the [process engine
configuration](ref:/guides/user-guide/#process-engine-process-engine-bootstrapping).

Alternatively you can migrate your script code by replacing all implicit
declaration of process variables in script code with an explicit call to
`execution.setVariable('varName', 'value')`.

