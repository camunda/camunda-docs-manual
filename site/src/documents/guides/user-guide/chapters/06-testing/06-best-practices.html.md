---

title: 'Best Practices'
category: 'Testing'

---

### Assertions

Apart from JUnit assertions, there is the community extension [camunda-bpm-assert](https://github.com/camunda/camunda-bpm-assert) that adds a fluent API for asserting typical scenarios in a process integrating with [AssertJ](https://joel-costigliola.github.io/assertj/).

### Writing Focused Tests

The feature to [start a process instance at a set of activities](ref:#process-engine-process-engine-concepts-starting-a-process-instance-at-any-set-of-activities) can be used to to create a very specific scenario without much setup. Similarly, certain activities can be skipped by using [process instance modification](ref:#cockpit-process-instance-modification).