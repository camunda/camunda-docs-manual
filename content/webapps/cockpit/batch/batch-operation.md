---

title: 'Batch operation'
weight: 10

menu:
  main:
    identifier: "user-guide-cockpit-batches-operations"
    parent: "user-guide-cockpit-batch"
    pre: "Perform batch operations"

---

{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of the Camunda Platform, it is not available in the community edition.
{{< /enterprise >}}

{{< img src="../../img/batch/batch_operation_definition.png" alt="Batch Operation Definition" caption="" >}}

# Definition Of Operation

It is possible to execute the following batch operations:

- Delete running process instances. 
- Delete finished process instances.
- Set retries of Jobs belonging to process instances.
- Set retries of external tasks belonging to process instances.
- Set variables to process instances.
- Suspend running process instances.
- Activate suspended process instances.
- Delete decision instances.
- Set a Removal Time to Historic Process Instances.
- Set a Removal Time to Historic Decision Instances.
- Set a Removal Time to Historic Batches.

After selecting the operation, fields may appear with additional data that is either optional or required to perform the operation. 
When canceling running process instances, you can optionally select to skip custom listeners and provide a cancellation reason. In addition to the
ability to specify the desired operation, a search query can be specified which defines the affected process instances.

You can copy a link to the current search query to your clipboard by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-link"></i></button> button and you can save search queries to your local browser storage by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button> button and inserting a name in the drop down menu that appears. You can then retrieve the search query by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-floppy-disk"></i></button> button and selecting the chosen name in the drop down menu.

Please note that 
some operations can only be executed on running instances, while others can only be executed on finished instances. You will see an
appropriate notice once the operation type is selected. 

Navigation to the next step is disabled as long as all required data to perform the operation is not filled out.

{{< note title="Heads-up!" class="info" >}}
  The instance search operates on the history endpoint of the engine. In case the requested historic data is not persisted to the database, then the search does not deliver the desired results.
{{< /note >}}

# Confirmation Of Operation

{{< img src="../../img/batch/batch_operation_confirmation.png" alt="Batch Operation Confirmation" caption="" >}}

In the next step of the process, you can review the operation that is going to be performed. One can see a short summary of affected instances
count as well as a <button class="btn btn-xs"><i class="glyphicon glyphicon-eye-open"></i></button> button which toggles display of extended information. In the section with extended information, you see a path to the REST endpoint that will process the request as well as the payload of the request.

# Review Results

{{< img src="../../img/batch/batch_operation_result.png" alt="Batch Operation Result" caption="" >}}

On the results screen you will see the current status of the batch operation creation. Upon successful batch creation, the user is able to
navigate to [batch monitoring]({{< ref "/webapps/cockpit/batch/monitoring.md" >}}). In case of error, this screen will display a corresponding error message.
