---

title: 'Invoke Decisions from Processes and Cases'
weight: 30

menu:
  main:
    name: "Decisions in BPMN & CMMN"
    identifier: "user-guide-process-engine-decisions-bpmn"
    parent: "user-guide-process-engine-decisions"
    pre: "Invoke Decisions from BPMN Processes and CMMN Cases"
---

Inside BPMN processes they can be references by Business Rule Tasks. For more information
on this please refer to the [BPMN 2.0 reference]({{< relref "reference/bpmn20/tasks/business-rule-task.md" >}}).

```xml
<businessRuleTask id="businessRuleTask"
    camunda:decisionRef="myDecision"
    camunda:mapDecisionResult="singleValue"
    camunda:resultVariable="result" />
```


# BPMN Integration

## DMN Business Rule Task

# CMMN Integration

Nothing yet :)

# The Decision Result

## Mapping the Decision Result to a Process Variable

## Custom Mapping of the Decision Result

-  Typed Values

# Accessing Process Variables from Decision Tables

## Process Variables in Input Expressions

- typed values & variableContext

## Process Varianbles in Input Entries

## Process Variables in Output Entries

# Expression Language Integration

## Accessing Beans

## Extending the Expression Lanaguage
