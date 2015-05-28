---
title: 'Create a CMMN Case'
category: 'Tutorial'
---

In this section you learn how to create your first CMMN 1.0 case in XML. Don't worry, the XML is not going to be complex.

<section id="model/create">
  <h3>Create an empty CMMN 1.0 file</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-cmmn-applications/eclipse-new-file.png"/>
    </div>
    <div class="col-xs-9 col-sm-9 col-md-9">
      <p>
        In the eclipse <em>Package Explorer</em> select the <code>src/main/resources</code> folder. Right-click and select <code>New &gt; Other ...</code>. Select <em>File</em>. Click Next.
      </p>
      <p>
        On the second page, you must specify the file name of the case. Insert <code>loan-approval.cmmn10.xml</code>. Click Finish.
      </p>
    </div>
  </div>

  <h3>Set Up the Case Plan Model</h3>

  <div class="row">
    <div class="col-xs-3 col-sm-3 col-md-3"></div>
    <div class="col-xs-4 col-sm-4 col-md-4">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-cmmn-applications/cmmn-1.png"/>
    </div>
  </div>

  <p>
    Open the newly created file and copy-paste the following contents into it:
  </p>

  <div class="app-source" data-source-code="loan-application-01.cmmn10.xml" annotate="code-annotations"></div>

  <p>
    This snippet declares a <em>case plan model</em>, the essential part of any CMMN case definition.
  </p>

  <h3>Add Human Tasks</h3>

  <div class="row">
    <div class="col-xs-3 col-sm-3 col-md-3"></div>
    <div class="col-xs-4 col-sm-4 col-md-4">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/developing-cmmn-applications/cmmn-2.png"/>
    </div>
  </div>
  <p>
    As the first part of the loan application case, the loan application should be reviewed for any formal errors. We therefore add a <em>human task</em> to the case. Tasks are always specified by two parts: A <em>plan item</em> and a <em>plan item definition</em>. While the plan item definition is a blue print for the task's behavior, the plan item represents the actual task instantiation. Update your CMMN definition as follows (insert the highlighted parts at the appropriate positions or simply replace the entire content):
  </p>

  <div class="app-source" data-source-code="loan-application-02.cmmn10.xml" annotate="code-annotations" highlight="4-16"></div>

  <p>
    In addition, the customer's creditworthiness has to be assessed. We add another user task:
  </p>

  <div class="app-source" data-source-code="loan-application-03.cmmn10.xml" annotate="code-annotations" highlight="6;18-26"></div>

  <p>
    Note how there is no direct relation between the two plan items. There is no sequence flow connecting the two tasks as in BPMN. In CMMN, this expresses that the tasks can be executed concurrently.
  </p>

  <p>
    To learn more about human tasks, consider checking the <a href="ref:/api-references/cmmn10/#tasks-human-task">Human Task section</a> of our CMMN implementation guide.
  </p>
  <%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started-cmmn", tag: "Step-3"}) %>
</section>
