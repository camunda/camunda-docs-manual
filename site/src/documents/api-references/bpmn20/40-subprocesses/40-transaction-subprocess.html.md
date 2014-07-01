---

title: 'Transaction Subprocess'
category: 'Subprocesses'

keywords: 'transaction subprocess'

---


A transaction subprocess is an embedded subprocess which can be used to group multiple activities to a transaction. A transaction is a logical unit of work which allows grouping of a set of individual activities, so that they either succeed or fail collectively.

A transaction can have three different outcomes, with these three possible outcomes:

*   A transaction is successful if it is neither canceled not terminated by a hazard. If a transaction subprocess is successful, it is left using the outgoing sequenceflow(s). A successful transaction might be compensated if a compensation event is thrown later in the process.<br/>

    Note: just as "ordinary" embedded subprocesses, a transaction may be compensated after successful completion using an intermediate throwing compensation event.

*   A transaction is canceled if an execution reaches the cancel end event. In that case all executions are terminated and removed. A single remaining execution is then set to the cancel boundary event, which triggers compensation. After compensation is completed the transaction subprocess is left, using the outgoing sequence flow(s) of the cancel boundary event.

*   A transaction is ended by a hazard if an error event is thrown which is not caught within the scope of the transaction subprocess. (This also applies if the error is caught on the boundary of the transaction subprocess.) In this case, compensation is not performed.

The following diagram illustrates the three different outcomes:

<div data-bpmn-diagram="implement/business-transaction"></div>

A transaction subprocess is represented in xml using the transaction element:

```xml
<transaction id="myTransaction" >
  <!-- ... -->
</transaction>
```

<div class="alert alert-warning">
  <strong>Relation to ACID transactions:</strong>

  It is important not to confuse the BPMN transaction subprocess with technical (ACID) transactions. The BPMN transaction subprocess is not a way to scope technical transactions. In order to understand transaction management in camunda BPM, read the <a href="ref:/guides/user-guide/#process-engine-transactions-in-processes">Transactions in Processes</a> section of the <a href="ref:/guides/user-guide/">User Guide</a>.
</div>

A BPMN transaction differs from a technical transaction in the following ways:

*   While an ACID transaction is typically short lived, a BPMN transaction may take hours, days or even months to complete. (Consider a case where one of the activities grouped by a transaction is a usertask; typically, people have longer response times than applications. Or, in another situation, a BPMN transaction might wait for some business event to occur, like the fact that a particular order has been fulfilled.) Such operations usually take considerably longer to complete than updating a record in a database or storing a message using a transactional queue.

*   Because it is impossible to scope a technical transaction to the duration of a business activity, a BPMN transaction typically spans multiple ACID transactions.

*   Since a BPMN transaction spans multiple ACID transactions, we loose ACID properties. Consider the example given above. Let's assume the "book hotel" and the "charge credit card" operations are performed in separate ACID transactions. Let's also assume that the "book hotel" activity is successful. Now we have an intermediate inconsistent state because we have performed a hotel booking but have not yet charged the credit card. Now, in an ACID transaction, we would also perform different operations sequentially and therefore also have an intermediate inconsistent state. What is different here is that the inconsistent state is visible outside of the scope of the transaction. For example, if the reservations are made using an external booking service, other parties using the same booking service might already see that the hotel is booked. This means that when implementing business transactions, we completely lose the isolation property (granted, we usually also relax isolation when working with ACID transactions to allow for higher levels of concurrency, but there we have fine grained control and intermediate inconsistencies are only present for very short periods of times).

*   A BPMN business transaction can also not be rolled back in the traditional sense. As it spans multiple ACID transactions, some of these ACID transactions might already be committed at the time the BPMN transaction is canceled. At that point they cannot be rolled back anymore.


Since BPMN transactions are long-running in nature, the lack of isolation and a rollback mechanism needs to be dealt with differently. In practice there is usually no better solution than to deal with these problems in a domain specific way:

*   The rollback is performed using compensation. If a cancel event is thrown in the scope of a transaction, the effects of all activities that executed successfully and have a compensation handler are compensated.
*   The lack of isolation is also often dealt with by using domain specific solutions. For instance, in the example above, a hotel room might appear to be booked to a second customer before we have actually made sure that the first customer can pay for it. Since this might be undesirable from a business perspective, a booking service might choose to allow for a certain amount of overbooking.
* In addition, since the transaction can be aborted in case of a hazard, the booking service has to deal with the situation where a hotel room is booked but payment is never attempted (since the transaction was aborted). In that case, the booking service might choose a strategy where a hotel room is reserved for a maximum period of time and, if payment is not received until then, the booking is canceled.

To sum it up: while ACID transactions offer a generic solution to such problems (rollback, isolation levels and heuristic outcomes), we need to find domain specific solutions to these problems when implementing business transactions.

<div class="alert alert-warning">
  <strong>Current limitations:</strong>

  The BPMN specification requires that the process engine reacts to events issued by the underlying transaction protocol and, in case a transaction is canceled, if a cancel event occurs, in the underlying protocol. As an embeddable engine, the camunda engine currently does not support this. (For some ramifications of this, see the paragraph on consistency below.)
</div>

Consistency on top of ACID transactions and optimistic concurrency: A BPMN transaction guarantees consistency in the sense that either all activities compete successfully, or, if some activity cannot be performed, the effects of all other successful activities are compensated. So either way, we end up in a consistent state. However, it is important to recognize that in camunda BPM, the consistency model for BPMN transactions is superposed on top of the consistency model for process execution. The camunda engine executes processes in a transactional way. Concurrency is addressed using optimistic locking. In the engine BPMN, error, cancel and compensation events are built on top of the same ACID transactions and optimistic locking. For example, a cancel end event can only trigger compensation if it is actually reached. It is not reached if some undeclared exception is thrown by a service task before. The effects of a compensation handler can not be committed if some other participant in the underlying ACID transaction sets the transaction to the state rollback-only. Also, when two concurrent executions reach a cancel end event, compensation might be triggered twice and fail with an optimistic locking exception. All of this is to say that when implementing BPMN transactions in the core engine, the same set of rules apply as when implementing "ordinary" processes and subprocesses. So, to effectively guarantee consistency, it is important to implement processes in a way that takes the optimistic, transactional execution model into consideration.

## camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaasyncbefore">camunda:asyncBefore</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaasyncafter">camunda:asyncAfter</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaexclusive">camunda:exclusive</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-elements-camundafailedjobretrytimecycle">camunda:failedJobRetryTimeCycle</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundainputoutput">camunda:inputOutput</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      The <code>camunda:exclusive</code> attribute is only evaluated if the attribute
      <code>camunda:asyncBefore</code> or <code>camunda:asyncAfter</code> is set to <code>true</code>
    </td>
  </tr>
</table>

## Additional Resources

*   [Transactions in Processes](ref:/guides/user-guide/#process-engine-transactions-in-processes)
