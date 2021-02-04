---

title: 'Process Application Event Listeners'
weight: 30

menu:
  main:
    identifier: "user-guide-process-application-event-listeners"
    parent: "user-guide-process-applications"

---


The process engine supports defining two types of event listeners: [Task Event Listeners and Execution Event Listeners]({{< ref "/user-guide/process-engine/delegation-code.md#execution-listener" >}}).
Task Event listeners allow to react to Task Events (Tasks are Created, Assigned, Completed). Execution Listeners allow to react to events fired as execution progresses through the diagram: Activities are Started, Ended and Transitions are being taken.

When using the process application API, the process engine makes sure that Events are delegated to the right process application. For example, assume there is a process application deployed as "invoice.war" which deploys a process definition named "invoice". The invoice process has a task named "archive invoice". The application "invoice.war" further provides a Java Class implementing the [ExecutionListener]({{< ref "/user-guide/process-engine/delegation-code.md#execution-listener" >}}) interface and is configured to be invoked whenever the END event is fired on the "archive invoice" activity. The process engine makes sure that the event is delegated to the listener class located inside the process application:

{{< img src="../img/process-application-events.png" title="Process Application Events" >}}

On top of the Execution and Task Listeners which are [explicitly configured in the BPMN 2.0 XML]({{< ref "/user-guide/process-engine/delegation-code.md#execution-listener" >}}), the process application API supports defining a global ExecutionListener and a global TaskListener which are notified about *all events* happening in the processes deployed by a process application:

    @ProcessApplication
    public class InvoiceProcessApplication extends ServletProcessApplication {

      public TaskListener getTaskListener() {
        return new TaskListener() {
          public void notify(DelegateTask delegateTask) {
            // handle all Task Events from Invoice Process
          }
        };
      }

      public ExecutionListener getExecutionListener() {
        return new ExecutionListener() {
          public void notify(DelegateExecution execution) throws Exception {
            // handle all Execution Events from Invoice Process
          }
        };
      }
    }

To use the global process application Event Listeners, you need to activate the corresponding [Process Engine Plugin]({{< ref "/user-guide/process-engine/process-engine-plugins.md" >}}):

    <process-engine name="default">
      ...
      <plugins>
        <plugin>
          <class>org.camunda.bpm.application.impl.event.ProcessApplicationEventListenerPlugin</class>
        </plugin>
      </plugins>
    </process-engine>

Note that the plugin is activated by default in the pre-packaged Camunda Platform distributions.

The process application Event Listener interface is also a good place for adding the CdiEventListener bridge if you want to [use CDI Events in combination with the shared process engine]({{< ref "/user-guide/cdi-java-ee-integration/the-cdi-event-bridge.md" >}}).
