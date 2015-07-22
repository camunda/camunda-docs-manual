---

title: 'Timer Events'
category: 'Events'

keywords: 'timer start intermediate boundary event definition'

---


Timer events are events which are triggered by a defined timer. They can be used as start event, intermediate event or boundary event. Boundary events can be interrupting or not.

<div data-bpmn-diagram="implement/event-timer" ></div>

A timer definition must have exactly one of the following elements:

* **timeDate**: This format specifies a fixed time and date in adhering to the <a href="http://en.wikipedia.org/wiki/ISO_8601#Dates">ISO 8601</a> format, when the trigger will be fired. Example:

    ```xml
    <timerEventDefinition>
      <timeDate>2011-03-11T12:13:14Z</timeDate>
    </timerEventDefinition>
    ```

* **timeDuration**: To specify how long the timer should run before it is fired, a timeDuration can be specified as a sub-element of timerEventDefinition. The format used is the <a href="http://en.wikipedia.org/wiki/ISO_8601#Durations">ISO 8601</a> format (as required by the BPMN 2.0 specification). Example (interval lasting 10 days):

    ```xml
    <timerEventDefinition>
      <timeDuration>P10D</timeDuration>
    </timerEventDefinition>
    ```

* **timeCycle**: Specifies repeating intervals, which can be useful for starting process periodically, or for sending multiple reminders for overdue user tasks. A time cycle element can be in two formats. One option is the format of recurring time duration, as specified by the <a href="http://en.wikipedia.org/wiki/ISO_8601#Repeating_intervals">ISO 8601</a> standard. Example (3 repeating intervals, each lasting 10 hours):

    ```xml
    <timerEventDefinition>
    <timeCycle>R3/PT10H</timeCycle>
    </timerEventDefinition>
    ```
    Additionally, you can specify a time cycle using cron expressions, the example below shows a trigger firing every 5 minutes, starting at full hour:

    ```
    0 0/5 * * * ?
    ```

    Please see the <a href="http://www.quartz-scheduler.org/docs/tutorials/crontrigger.html">CronTrigger Tutorial</a> for additional information about using cron expressions.

    Note: The first symbol denotes seconds, not minutes as in normal Unix cron.

    The recurring time duration option is better suited for handling relative timers, which are calculated in respect to some particular point in time (e.g. time when user task was started), while cron expressions can handle absolute timers - which is particularly useful for timer start events.


You can use expressions for the timer event definitions. By doing so you can influence the timer definition based on process variables. The process variables must contain the <a href="http://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> (or cron for cycle type) string for the appropriate timer type.

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
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaasyncbefore">camunda:asyncBefore</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaasyncafter">camunda:asyncAfter</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaexclusive">camunda:exclusive</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundajobpriority">camunda:jobPriority</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-elements-camundafailedjobretrytimecycle">
        camunda:failedJobRetryTimeCycle</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundainputoutput">
        camunda:inputOutput</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>&ndash;</td>
  </tr>
</table>


## Timer Start Event


A timer start event is used to create process instance at a given time. It can be used both for processes which should start only once and for processes that should start in specific time intervals.

Note: A subprocess cannot have a timer start event.

Note: A start timer event is scheduled as soon as process is deployed. There is no need to call `startProcessInstanceBy...`, although calling start process methods is not restricted and will cause one more starting of the process at the time of the `startProcessInstanceBy...` invocation.

The XML representation of a timer start event is the normal start event declaration, with a timer definition sub-element. The following example process will start 4 times, in 5 minute intervals, starting on 11th of March 2016, at 12:13 (24 hour clock system):


```xml
<startEvent id="theStart">
    <timerEventDefinition>
        <timeCycle>R4/2016-03-11T12:13/PT5M</timeCycle>
    </timerEventDefinition>
</startEvent>
```

and this process will start once, on a selected date:

```xml
<startEvent id="theStart">
    <timerEventDefinition>
        <timeDate>2016-03-11T12:13:14</timeDate>
    </timerEventDefinition>
</startEvent>
```

<div class="alert alert-info">
  <p>
    <strong>A note on time zones:</strong> The configuration <code>2016-03-11T12:13:14</code> does not specify a time zone. At runtime, such a date is interpreted in the local time zone of the JVM executing the process. This can be problematic in various cases, such as when running multiple Camunda nodes in different time zones or when you cannot assume the time zone the platform runs in. Furthermore, there can be glitches with respect to daylight saving time (DST). If in doubt, specify the time in UTC (e.g. <code>2016-03-11T12:13:14Z</code>) or with a UTC-relative offset (e.g. <code>2016-03-11T12:13:14+01</code>).
  </p>
</div>


## Timer Intermediate Catching Event

A timer intermediate event acts as a stopwatch. When an execution arrives in catching event activity, a timer is started. When the timer fires (e.g. after a specified interval), the sequence flow going out of the timer intermediate event is followed.

A timer intermediate event is defined as a intermediate catching event. The specific type sub-element in this case is a timerEventDefinition element.

```xml
<intermediateCatchEvent id="timer">
    <timerEventDefinition>
        <timeDuration>PT5M</timeDuration>
    </timerEventDefinition>
</intermediateCatchEvent>
```

## Timer Boundary Event

A timer boundary event acts as a stopwatch and as an alarm clock. When an execution arrives in the activity to which the boundary event is attached, a timer is started. When the timer fires (e.g. after a specified interval), the activity is interrupted and the sequence flow going out of the timer boundary event are followed.

There is the difference between an interrupting and a non interrupting timer event. The interrupting event is the default. The non-interruptingevent leads to the original activity not being interrupted, the activity stays there. Instead, an additional execution is created and sent over the outgoing transition of the event. In the XML representation, the cancelActivity attribute is set to false:

```xml
<boundaryEvent id="escalationTimer" cancelActivity="false" attachedToRef="firstLineSupport"/>
   <timerEventDefinition>
    <timeDuration>PT4H</timeDuration>
  </timerEventDefinition>
</boundaryEvent>
```

Note: Timers are only fired when the [Job Executor](ref:/guides/user-guide/#process-engine-the-job-executor) is enabled.


<div class="alert alert-warning">
  <strong>Known issue with boundary events</strong>
  <p>
    There is a known issue regarding concurrency when using boundary events of any type. Currently, it is not possible to have multiple outgoing sequence flow attached to a boundary event. A solution to this problem is to use one outgoing sequence flow that goes to a parallel gateway.
  </p>
</div>

<div data-bpmn-diagram="implement/event-timer-multiple-flows"> </div>

