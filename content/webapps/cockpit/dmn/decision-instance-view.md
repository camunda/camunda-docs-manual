---

title: 'Decision Instance View'
weight: 20

menu:
  main:
    identifier: "user-guide-cockpit-dmn-instance"
    parent: "user-guide-cockpit-dmn"
    pre: "Inspect an executed decision instance"

---

On the decision instance page you find the table or literal expression of the decision that was executed as well as the values for the input variables and the decision result.

{{< img src="../../img/cockpit-decision-instance-view.png" title="Decision Instance View" >}}

The input and output values for this decision instance are shown directly on the table in the corresponding cells as well as in the Inputs and Outputs tabs below the table. Complex variables like Objects, Files and Bytes are not displayed on the table. You have to use the Inputs and Outputs tabs to access the values of these variables.

Rules that have matched during the execution of the decision table are highlighted.

Furthermore, you can maximize the diagram view or the detailed information panel by clicking on the <button class="btn btn-xs"><i class="glyphicon glyphicon-resize-full"></i></button> button, respectively the <button class="btn btn-xs"><i class="glyphicon glyphicon-menu-up"></i></button> button, at the bottom left of the diagram view.