---

title: 'Batch operation'
weight: 10

menu:
  main:
    identifier: "user-guide-cockpit-batches-operations"
    parent: "user-guide-cockpit-batch"
    pre: "Perform batch operations on process instances"

---

{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not available in the community edition.
{{< /enterprise >}}

{{< img src="../../img/batch/batch_operation_definition.png" alt="Batch Operation Definition" caption="" >}}

# Definition Of Operation

It is possible to execute following batch operations on process instances:

- Cancel running process instances
- Delete historic process instances
- Set retries of jobs

after selecting operation, fields with additional data required to perform operation might appear. In addition to ability to specify
desired operation one can also specify a search query which will define affected process instances. Please not that some operations
can be only performed on running process instances, while others can be executed only on finished process instances. You will see
appropriate notice, once operation type is selected.

Navigation to the next step will be disabled as long as all required data to perform operation is not filled out.

# Confirmation Of Operation

{{< img src="../../img/batch/batch_operation_confirmation.png" alt="Batch Operation Confirmation" caption="" >}}

On the next step of the process you can review operation that is going to be performed. One can see short summary of affected instances
count as well as <button class="btn btn-xs"><i class="glyphicon glyphicon-eye-open"></i></button> button that toggles display of extended information. In the section with extended information, you see a path to REST
endpoint that will process request as well as payload of request.

# Review Results

{{< img src="../../img/batch/batch_operation_result.png" alt="Batch Operation Result" caption="" >}}

On results screen you will see current status of batch operation creation. Upon successful batch creation user is able to
navigate to [batch monitoring]({{< relref "webapps/cockpit/batch/monitoring.md" >}}). In case of error, this screen will display corresponding error message.
