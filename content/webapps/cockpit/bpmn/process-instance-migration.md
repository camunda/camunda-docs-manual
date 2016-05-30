---

title: 'Process Instance Migration'
weight: 55

menu:
  main:
    identifier: "user-guide-cockpit-pi-migration"
    parent: "user-guide-cockpit-bpmn"
    pre: "Migrate running process instances between different process definition versions."
    name: "Instance Migration"

---


{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of the Camunda BPM platform, it is not available in the community edition.
{{< /enterprise >}}

{{< img src="../../img/migration/step1_overview.png" title="Process Instance Migration" >}}

You can migrate running process instances from their current process definition version to another version of that definition or another process definition altogether. You can access the migration page either by clicking on the `Migration` link on the processes section of the Cockpit dashboard, or by navigating to the process definition or instance view of a process with multiple versions.

{{< img src="../../img/migration/accessing_1.png" title="Link to Process Instance Migration Page from Cockpit Dashboard" >}}

{{< img src="../../img/migration/accessing_2.png" title="Link to Process Instance Migration Page from Process Definition Page" >}}

Performing a migration consists of four steps:

1. Create a mapping from the activities of the source definition to activities of the target definition
2. Select running instances to migrate
3. Confirm the migration
4. Observe the results of the migration and check for errors


# Create a Migration Plan

When accessing the migration page from the process definition or instance page, an appropriate source and target definition key and version is already set. Otherwise you can set the process definition key and version for both the source and target at the top of the page. After selecting a source and a target, the diagrams for these process definition versions are displayed. Also, a first draft of a migration plan is [generated]({{< relref "user-guide/process-engine/process-instance-migration.md#generating-a-migration-plan" >}}) and successfully mapped activities are highlighted with a green checkmark symbol <span class="badge" style="border: 1px solid #4cae4c; background-color: #5cb85c;">
  <span class="glyphicon glyphicon-ok"></span>
</span>. Hovering over an activity highlights the corresponding source and target activities for the mapping.

Activities that have running instances, but are not mapped to a target activity, have a yellow warning marker <span class="badge" style="background-color: #f0ad4e; border: 1px solid #eea236;">
  <span class="glyphicon glyphicon-warning-sign"></span>
</span>. If you plan to migrate these instances, you have to create a mapping for these activities, otherwise the migration will fail.

## Create a new mapping

{{< img src="../../img/migration/step1_createMapping.png" title="Creating a new mapping" >}}

To create a mapping for an activity, hover over the activity and click on the arrow button <button class="btn btn-xs"><i class="glyphicon glyphicon-share-alt"></i></button> in the lower right corner of the activity. This enters the mapping mode. An arrow following your mouse movements is created and possible target activities are highlighted. Clicking on one of the highlighted activities in the target diagram creates a mapping from the source activity to the selected target activity. Clicking anywhere else or pressing ESC exits the edit mode.

You can only create a mapping for activities that are not mapped yet.


## Remove an existing mapping

You can remove an existing mapping by hovering over the mapped activity and clicking the <button class="btn btn-xs"><i class="glyphicon glyphicon-remove"></i></button> button in the lower right corner.


## Link diagrams navigation

Checking the link diagrams navigation checkbox causes view changes of one diagram to be displayed on the other diagram, too. If you move, zoom or reset one diagram, the same change is applied to the other diagram, too. To move both diagrams independently from each other, uncheck this box.


## Check incorrect mappings

{{< img src="../../img/migration/step1_errorPopover.png" title="Report for an incorrect mapping" >}}

If you create a mapping that is incorrect, a red error indicator <span class="badge" style="background-color: #d9534f; border: 1px solid #d43f3a;">
  <span class="glyphicon glyphicon-remove"></span>
</span> is displayed in the top right corner of the source and target activity of the faulty mapping. Clicking on the error indicator opens a tooltip showing details of the error.


## Set Update Event Trigger flag

To set the [update event trigger flag]({{< relref "user-guide/process-engine/process-instance-migration.md#events" >}}) for events, first create a mapping for the event. Then click on the green checkmark indicator to open the details tooltip. The opened popup contains a checkbox to update the event trigger.


## Show migration plan

You can visualize the migration plan in two ways: You can hover over an activity to highlight the activity that is mapped to the hovered activity. E.g., if you hover over a mapped source activity, the corresponding target activity is highlighted. If you hover over a target activity, the corresponding source activities are highlighted as well.

You can also click on an activity to show a green arrow pointing from the source activity to the mapped target activity. Clicking on the activity again hides the arrow. If the mapping contains errors, the arrow is displayed in red. You can also use the checkbox at the bottom of the screen reading "show migration plan" to toggle the display of all arrows on the diagram.


# Select instances

{{< img src="../../img/migration/step2.png" title="Select instances for migration" >}}

After finishing the migration plan, click the `Select Instances` button to proceed to instance selection. Initially, all instances of the source process definition version are displayed. You can use the filter bar above the list of instances to filter the displayed instances. Using the checkboxes to the left of the instances, you can mark them for migration. All instances you select on this page are migrated.

If you do not explicitly select any instances, all instances of the source process definition version are migrated to the target version.


# Confirm Migration

{{< img src="../../img/migration/step3.png" title="Confirm Migration" >}}

In the next step, you see an overview of the migration that you are about to execute. This page displays the exact id of the source and target process definition as well as the number of process instances you are about to migrate. It also contains a tabular display of the migration plan. You can configure options for the migration such as whether the migration should be performed asynchronously as a batch and whether custom listeners and IO mappings should be skipped.

By clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-eye-open"></i></button> button on the bottom of the page, you can assess the request payload that is sent to the server to perform the migration.


# Check Migration Result

{{< img src="../../img/migration/step4_batch.png" title="Executing migration asynchronously" >}}

After clicking `Execute Migration`, the result screen is displayed. If the migration was performed successfully, that is indicated on this page. For asynchronous migrations, a link to the [batch page]({{< relref "user-guide/webapps/cockpit/batches.md" >}}) is displayed where the progress of the batch can be observed.

## Error: Migration Plan invalid

{{< img src="../../img/migration/step4_error.png" title="Invalid migration plan" >}}

If the migration plan contains errors, they are displayed on this page. No instances are migrated in this case. You can go back to the first step to fix the errors.

## Error: Failed to apply the Migration Plan

If the migration plan itself is correct, but could not be applied to a specific instance, an error is shown. This error contains the instance id that produced the error as well as the cause of the failure.

## Error: Migration Failed

If the migration failed for other reasons, the error is displayed.
