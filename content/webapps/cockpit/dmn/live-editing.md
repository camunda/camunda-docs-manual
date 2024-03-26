---

title: 'Live Editing of DMN Decisions'
weight: 30

menu:
  main:
    name: "Live Editing"
    identifier: "user-guide-cockpit-dmn-live-edit"
    parent: "user-guide-cockpit-dmn"
    pre: "Edit a deployed DMN decision"

---

{{< enterprise >}}
  Please note that this feature is only included in the enterprise edition of Camunda 7, it is not available in the community edition.
{{< /enterprise >}}

DMN tables can be changed directly in Cockpit. Clicking on the {{< glyphicon name="pencil" text=" Edit">}} button will open a dialog which contains an editable version of the DMN table. This button is only available for DMN resources. The edit dialog can also be opened by clicking on the {{< glyphicon name="pencil">}} icon on the [DMN definition page]({{< ref "/webapps/cockpit/dmn/decision-definition-view.md" >}}).

{{< img src="../../img/cockpit-edit-dmn-dialog.png" title="Cockpit Edit DMN Dialog" >}}

Gray cells on the table display technical details like variable names and types. Changing this data might lead to incompatibility with existing definitions, especially if the decision table is integrated in a BPMN process.

You can download the changed table with the {{< glyphicon name="save" text=" Download changed version">}} button. The downloaded file contains all changes you made to the table, but does not deploy it.

You can use a local DMN file from your computer to overwrite the table. Clicking on the `Choose File` button opens a dialog where you can select a DMN file. The file ending must be `.dmn` or `.dmn11.xml`. After selecting the file, the table gets replaced. You can then perform additional changes to the table before deploying it.

By clicking `Proceed`, a new dialog opens containing the changed table. The changes should be carefully reviewed as confirming the change and clicking `Deploy` will immediately create a new deployment containing the new DMN file as resource. All process and case definitions which use the latest version of the decision definition will then use the new version.

The new deployment will have the name provided in the confirmation dialog and will also have the string `cockpit` set as deployment source.

{{< note title="Heads-up!" class="warning" >}}
Ensure to sync live-edited DMN files with other deployment sources (e.g. process applications).

If DMN tables in Cockpit and a process application go out of sync, they might overwrite each other, leading to an unwanted outcome.
{{< /note >}}

