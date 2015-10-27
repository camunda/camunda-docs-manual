---

title: 'Special Considerations'
category: 'Patch Level Upgrade'

---

### 7.3.2 to 7.3.3

By default it is not possible anymore to pass arbitrary expressions as parameters of task queries.

Reason: Passing EL expressions in a task query enables execution of arbitrary code when the query is evaluated.

The process engine no longer evaluates these expressions by default and throws an exception instead. The pevious behavior can be re-enabled by setting the process configuration `enableExpressionsInAdhocQueries` to true.

See the user guide on [security considerations for custom code](ref:/guides/user-guide/#process-engine-custom-code-and-security) for details.
