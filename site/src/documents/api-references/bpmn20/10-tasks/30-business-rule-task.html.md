---

title: 'Business Rule Task'
category: 'Tasks'

keywords: 'service task business rule'

---

A Business Rule task is used to synchronously execute one or more rules. 

<div data-bpmn-symbol="businessruletask" data-bpmn-symbol-name="Businss Rule Task"></div>

You might use the rule engine of your choice, on the open source side we made good experiences with JBoss Drools. Therefor You have to plug in your implementation of the rule task exactly like in a Service Task. So the difference is only that it has a different icon in the BPMN process model - but this can make already a huge difference for acceptance of the process model.

```xml
<businessRuleTask id="businessRuleTask" camunda:class="${MyRuleServiceDelegate}" />
```
## Additional Resources

* [Service Task](ref:/api-references/bpmn20/#tasks-service-task)
* [Tasks in the BPMN Tutorial](http://camunda.org/design/reference.html#!/activities/tasks)
* [Demo using Drools on the Business Rule Task](https://github.com/camunda/camunda-consulting/tree/master/showcases/order-confirmation-rules)
