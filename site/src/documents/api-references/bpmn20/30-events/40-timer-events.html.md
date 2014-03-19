---

title: 'Timer Events'
category: 'Events'

keywords: 'timer start intermediate boundary event definition'

---


Timer events are events which are triggered by defined timer. They can be used as start event, intermediate event or boundary event. Boundary events can be interrupting or not.

<div data-bpmn-diagram="implement/event-timer" ></div>

A timer definition must have exactly one element from the following:

* **timeDate**: This format specifies fixed date in <a href="http://en.wikipedia.org/wiki/ISO_8601#Dates">ISO 8601</a> format, when trigger will be fired. Example:

    ```xml
    <timerEventDefinition>
      <timeDate>2011-03-11T12:13:14</timeDate>
    </timerEventDefinition>
    ```

* **timeDuration**: To specify how long the timer should run before it is fired, a timeDuration can be specified as sub-element of timerEventDefinition. The format used is the <a href="http://en.wikipedia.org/wiki/ISO_8601#Durations">ISO 8601</a> format (as required by the BPMN 2.0 specification). Example (interval lasting 10 days):

    ```xml
    <timerEventDefinition>
      <timeDuration>P10D</timeDuration>
    </timerEventDefinition>
    ```

* **timeCycle**: Specifies repeating interval, which can be useful for starting process periodically, or for sending multiple reminders for overdue user task. Time cycle element can be in two formats. First is the format of recurring time duration, as specified by <a href="http://en.wikipedia.org/wiki/ISO_8601#Repeating_intervals">ISO 8601</a> standard. Example (3 repeating intervals, each lasting 10 hours):

    ```xml
    <timerEventDefinition>
    <timeCycle>R3/PT10H</timeCycle>
    </timerEventDefinition>
    ```
    Additionally, you can specify time cycle using cron expressions, example below shows trigger firing every 5 minutes, starting at full hour:

    ```
    0 0/5 * * * ?
    ```

    Please see <a href="http://www.quartz-scheduler.org/docs/tutorials/crontrigger.html">tutorial</a> for using cron expressions.

    Note: The first symbol denotes seconds, not minutes as in normal Unix cron.

    The recurring time duration is better suited for handling relative timers, which are calculated with respect to some particular point in time (e.g. time when user task was started), while cron expressions can handle absolute timers - which is particularly useful for timer start events.


You can use expressions for the timer event definitions, by doing so you can influence the timer definition based on process variables. The process variables must contain the <a href="http://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> (or cron for cycle type) string for appropriate timer type.

```xml
<boundaryEvent id="escalationTimer" cancelActivity="true" attachedToRef="firstLineSupport">
   <timerEventDefinition>
    <timeDuration>${duration}</timeDuration>
  </timerEventDefinition>
</boundaryEvent>
```

Note: timers are only fired when the [Job Executor](ref:/guides/user-guide/#process-engine-the-job-executor) is enabled.

## Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaexclusive">camunda:exclusive</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-elements-camundafailedjobretrytimecycle">camunda:failedJobRetryTimeCycle</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>&ndash;</td>
  </tr>
</table>


## Timer Start Event


A timer start event is used to create process instance at given time. It can be used both for processes which should start only once and for processes that should start in specific time intervals.

Note: a subprocess cannot have a timer start event.

Note: start timer event is scheduled as soon as process is deployed. There is no need to call `startProcessInstanceBy...`, although calling start process methods is not restricted and will cause one more starting of the process at the time of `startProcessInstanceBy...` Invocation.

The XML representation of a timer start event is the normal start event declaration, with timer definition sub-element. The following example process will start 4 times, in 5 minute intervals, starting on 11th march 2011, 12:13:


```xml
<startEvent id="theStart">
    <timerEventDefinition>
        <timeCycle>R4/2011-03-11T12:13/PT5M</timeCycle>
    </timerEventDefinition>
</startEvent>
```

and this process will start once, on a selected date:

```xml
<startEvent id="theStart">
    <timerEventDefinition>
        <timeDate>2011-03-11T12:13:14</timeDate>
    </timerEventDefinition>
</startEvent>
```




## Timer Intermediate Catching Event

A timer intermediate event acts as a stopwatch. When an execution arrives in catching event activity, a timer is started. When the timer fires (e.g. after a specified interval), the sequence flow going out of the timer intermediate event is followed.

A timer intermediate event is defined as a intermediate catching event. The specific type sub-element is in this case a timerEventDefinition element.

```xml
<intermediateCatchEvent id="timer">
    <timerEventDefinition>
        <timeDuration>PT5M</timeDuration>
    </timerEventDefinition>
</intermediateCatchEvent>
```






## Timer Boundary Event

A timer boundary event acts as a stopwatch and alarm clock. When an execution arrives in the activity where the boundary event is attached to, a timer is started. When the timer fires (e.g. after a specified interval), the activity is interrupted and the sequence flow going out of the timer boundary event are followed.

There is the difference between the interrupting and non interrupting timer event. The interrupting is the default. The non-interrupting leads to the original activity is not interrupted but the activity stays there. Instead an additional executions is created and send over the outgoing transition of the event. In the XML representation, the cancelActivity attribute is set to false:

```xml
<boundaryEvent id="escalationTimer" cancelActivity="false" attachedToRef="firstLineSupport"/>
   <timerEventDefinition>
    <timeDuration>PT4H</timeDuration>
  </timerEventDefinition>
</boundaryEvent>
```

Note: timers are only fired when the [Job Executor](ref:/guides/user-guide/#process-engine-the-job-executor) is enabled.


<div class="alert alert-warning">
  <strong>Known issue with boundary events</strong>
  <p>
    There is a known issue regarding concurrency when using boundary events of any type. Currently, it is not possible to have multiple outgoing sequence flow attached to a boundary event. A solution to this problem is to use one outgoing sequence flow that goes to a parallel gateway.
  </p>
</div>

<div data-bpmn-diagram="implement/event-timer-multiple-flows"> </div>

