---
title: 'Model a Process'
category: 'Tutorial'
---

In this section you learn how to create your first BPMN 2.0 process with the camunda Modeler.

<section id="model/create">
  <h3>Create a new BPMN 2.0 diagram</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/eclipse-new-bpmn-diagram.png"/>
    </div>
    <div class="col-xs-9 col-sm-9 col-md-9">
      <p>
        In the eclipse <em>Package Explorer</em> select the <code>src/main/resources</code> folder. Right-click and select <code>New &gt; Other ...</code>. Go to the folder <code>BPMN</code> and select <em>BPMN 2.0 Diagram</em>. Click Next.
      </p>
      <p>
        On the second page, you must specify the file name of the process. Insert <em>loan-approval.bpmn</em>. Click Finish.
      </p>
    </div>
  </div>
  <h3>Start with a Simple Process</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/eclipse-simple-process.png"/>
    </div>
    <div class="col-xs-9 col-sm-9 col-md-9">
      <p>
        Start by modeling a simple process. From the Palette on the right hand side of the canvas, drag a <em>Start Event</em> onto the canvas.
      </p>
      <p>
        Double-click on the Start Event. A text box opens. Type <em>&quot;Loan Request Received&quot;</em>.
      </p>
      <p class="alert alert-info">
        When editing Labels, you can add line breaks by hitting <code>Shift + Enter</code>.
      </p>
      <p>
        Add a User Task to the process. Name it &quot;<em>Approve Loan</em>&quot;. Add an End Event named &quot;<em>Loan Request Approved</em>&quot;.
      </p>
    </div>
  </div>
  <h3>Configure a User Task</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/eclipse-simple-process-property.png"/>
    </div>
    <div class="col-xs-9 col-sm-9 col-md-9">
      <p>
        Next, Open the properties view. If the properties view is not visible, select it from the menu: <code>Window / Show View / Other ...</code> This opens a dialog. From the dialog select <code>Properties</code>.
      </p>
      <p>
        Select the User Task on the canvas. This updates the selection in the Properties View. Scroll to the Property named <code>Assignee</code>. Type <em>&quot;john&quot;</em>.
      </p>
      <p>
        When you are done, save your changes.
      </p>
    </div>
  </div>
  <h3>Configure an executable Process</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-process-applications/eclipse-simple-process-config.png"/>
    </div>
    <div class="col-xs-9 col-sm-9 col-md-9">
      <p>
        Since we are modeling an executable process, we should give it an ID and set the <code>isExecutable</code> property to <code>true</code>. Open the properties view and click on a free spot of the modeling canvas. This displays the properties of the process itself.
      </p>
      <ol>
        <li>
          First, configure an ID for the process. Type &quot;approve-loan&quot; in the property field <em>Process Id</em>. The property ID is used by the process engine as identifier for the executable process and it is best practice to set it to a human-readable name.
        </li>
        <li>
          Second, configure the Name of the process. Type &quot;Loan Approval&quot; in the property field <em>Name</em>.
        </li>
        <li>
          Finally, check the box of the <em>Is Executable</em> property. If you do not check this box, the process definition is ignored by the process engine.
        </li>
      </ol>
      <p>
        When you are done, save your changes.
      </p>
    </div>
  </div>
  <%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started", tag: "Step-3"}) %>
</section>
