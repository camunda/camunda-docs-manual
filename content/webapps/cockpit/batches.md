---

title: 'Batch View'
weight: 80

menu:
  main:
    name: "Batch View"
    identifier: "user-guide-cockpit-batches"
    parent: "user-guide-cockpit"
    pre: "Display status of running and completed batches."

---

{{< img src="../img/batch.png" title="Batch View Page" >}}

The batch page displays the status of running and completed batches. It allows displaying details of a batch such as the start- and end-time or the number of remaining jobs. For failed jobs, it displays the error message and allows a retry or deletion of the job.

# Overview

On the left side of the page, a list of running and finished batches is displayed. You can click on any entry to display details of the batch on the right side of the page.

## In Progress

For batches that are currently in progress, the ID, type, number of failed jobs as well as the progress is displayed. Please note that if a batch has failed jobs, the batch cannot be completed. You have to go to the details view of the batch and resolve the failed jobs (e.g. retrying or deleting them). Also, it can take some time after the progress is at 100% for the batch to actually finish. See the [process engine section]({{< relref "user-guide/process-engine/batch.md" >}}) for details.

## Completed

Below the currently running batches, completed batches along with their start- and end-time are displayed.

# Batch Details

When selecting a batch, the details of the batch are displayed on the right side of the page. The displayed information corresponds to the response of the [REST API query]({{< relref "reference/rest/batch/get-statistics-query.md#result" >}}). If the batch is in progress and has failed jobs, the failed jobs and their exception message are displayed below the details table. You can access the complete stacktrace for every job by clicking on the `Full stack trace` link at the end of the exception message summary. Using the <button class="btn btn-xs"><i class="glyphicon glyphicon-repeat"></i></button> button you can increment the number of retries for this job. Using the <button class="btn btn-xs"><i class="glyphicon glyphicon-trash"></i></button> button you can delete this job. You can also increment the number of retries for all jobs by clicking the <button class="btn btn-xs"><i class="glyphicon glyphicon-repeat"></i></button> button above the details table.

You can suspend a batch that is in progress by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-pause"></i></button> button above the details table. Likewise, you can resume a suspended batch with the <button class="btn btn-xs"><i class="glyphicon glyphicon-play"></i></button> button.

Clicking the <button class="btn btn-xs btn-danger"><i class="glyphicon glyphicon-trash"></i></button> button above the details table deletes a running batch.
