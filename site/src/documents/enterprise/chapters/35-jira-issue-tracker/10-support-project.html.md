---

category: 'JIRA Issue Tracker'
title: 'Support Project'

---


Based on the agreed SLA (Service Level Agreement), you have the chance to contact our Support service with your questions, wishes and problems.


## Create a support ticket

We distinguish three types of issues:

<table class="table table-bordered">
  <thead>
  <tr class="success">
    <th>Issue Type</th>
    <th>Description</th>
    <th>Important Notes</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>Bug Report<img class="img-responsive" src="ref:asset:/assets/img/jira-support/jira-bug.png"/></td>
    <td>File a Bug Report if a feature of the system doesn't work properly.</td>
    <td>Do not file Feature Requests as Bug Reports, even if you think that it is a really vital feature without which the product seems unusable.</td>
  </tr>
  <tr>
    <td>Feature Request<img class="img-responsive" src="ref:asset:/assets/img/jira-support/jira-newfeature.png"/></td>
    <td>Any missing features can be filed here.</td>
    <td>A Feature Request might be declined with an explanation about why it will not be part of the product. Otherwise, it is usually placed on the road-map and we inform you about status changes. Please add some information about your use case and why the feature is important to you.</td>
  </tr>
  <tr>
    <td>Help Request<img class="img-responsive" src="ref:asset:/assets/img/jira-support/jira-help.png"/></td>
    <td>File any questions you have that are unrelated to Bug Reports or Feature Requests as Help Requests.</td>
    <td></td>
  </tr>
  </tbody>
</table>

You can prioritize issues. Please note that according to your SLA's, a prioritization is only possible for bug tickets. Feature Requests and Help Requests are always prioritized as default.

<table class="table table-bordered">
  <thead>
  <tr class="success">
    <th>Priority Level</th>
    <th>Description</th>
    <th>Important Notes</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>L1 <img class="img-responsive" src="ref:asset:/assets/img/jira-support/jira-blocker.png"/>blocker</td>
    <td>Core components (i.e. process engine) of camunda BPM do not work at all / produce critical errors that prevent usage in production mode.</td>
    <td>Bug Tickets only! Production mode only!</td>
  </tr>
  <tr>
    <td>L2 <img class="img-responsive" src="ref:asset:/assets/img/jira-support/jira-major.png"/>critical</td>
    <td>Usage of camunda BPM seriously affected, a workaround is urgently needed. </td>
    <td>Bug Tickets only!</td>
  </tr>
  <tr>
    <td>L3 <img class="img-responsive" src="ref:asset:/assets/img/jira-support/jira-minor.png"/>default</td>
    <td>Non-critical errors, Help Requests, Feature Requests</td>
    <td>Bug Tickets, Feature Requests, Help Requests</td>
  </tr>
  </tbody>
</table>

To create a new Support ticket follow the instructions below. To shorten the processing time please provide us as much information as possible.

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/jira-support/jira-support-create-support-issue.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      <ul>
        <li>Go to our <a href="https://app.camunda.com/jira/browse/SUPPORT">JIRA Support system</a></li>
        <li>select <code>Create Issue</code></li>
        <li>Select <code>Support</code> as project and choose the desired issue type.</li>
        <li>Give the ticket a meaningful <code>Summary</code></li>
        <li>You can give your ticket a <code>Priority</code> depending on how urgent the issue is for you. Provide us with a date in case of important <code>deadlines</code> that need to be reached.</li>
        <li>Enter a detailed <code>description</code> of your issue. In case of <b>Bug Reports</b> please use the template (<b>Reproduce steps</b>, <b>Problem</b>, <b>Expected behavior</b>, etc.).</li>
        <li><code>Attachments</code> like screenshots, log files or BPMN files help us to find and reproduce your bug faster. </li>
      </ul>
    </p>
  </div>
</div>


### Message formatting in JIRA

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/jira-support/jira-message.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      In JIRA tickets, messages are formatted using the Wiki Style Renderer. This offers a variety of formatting options, among which the option of adding preformatted code to your issues. You can display a preview of your text in formatted form by hitting the preview button at the bottom left of the message box and you can find additional help by clicking on the question mark at the bottom left.
    </p>
    <p>
      This functionality is available both in the <strong>description</strong> field when creating a new ticket as well as in the <strong>comment</strong> field when responding to an existing ticket.
    </p>
  </div>
</div>



In this example, we show how to add a section of Java code with a title bar:

```
{code:title=Bar.java|borderStyle=solid}
// Some comments here
public String getFoo()
{
    return foo;
}
{code}
```  

This is rendered in JIRA as follows:
<center><img class="img-responsive" src="ref:asset:/assets/img/jira-support/jira-comment-java.png" /></center>  

This example shows how to add a section of XML code, this time without a title bar:  

```
{code:xml}
    <test>
        <another tag="attribute"/>
    </test>
{code}
```

This in turn is rendered in JIRA as follows:
<center><img class="img-responsive" src="ref:asset:/assets/img/jira-support/jira-comment-xml.png" /></center>  

A detailed description and explanation of the functionalities of the Wiki Style Renderer can be found [here](https://app.camunda.com/jira/secure/WikiRendererHelpAction.jspa?section=all).

For further information please have a look at the Atlassian tutorial <a href="https://confluence.atlassian.com/display/Support/How+Atlassian+Uses+JIRA+for+Support">How Atlassian uses JIRA for Support</a>  


## Visibility of JIRA tickets

JIRA tickets will be shared with all your support contacts automatically. 

<div class="row">
  <div class="col-xs-6 col-sm-6 col-md-3">
    <img data-img-thumb src="ref:asset:/assets/img/jira-support/jira-watcher.png" />
  </div>
  <div class="col-xs-6 col-sm-6 col-md-9">
    <p>
      By clicking the watcher bubble you can see who is following the ticket. Here you can add or remove watchers. Please note you can only add users who are entitled camunda enterprise support contacts, otherwise you will get an error message stating that the user with that email address is not found.
    </p>
  </div>
</div>    

## The camunda Support process

The camunda Support process is structured as follows:

#### Basic Support process overview

<img class="img-responsive" src="https://editor.signavio.com/p/model/bce64c7a6f024a75b7b4a1ec14a5ae74/png?inline&authkey=d42f468784d4cba5c557c72ac2ed7f479f7d25cfa5efcb6597d6b03f81bfafc4" />


#### The camunda Support process in detail

<img class="img-responsive" src="https://editor.signavio.com/p/model/3e335121371f436d94f1ecf656adf76a/png?inline&authkey=6f567f3ce34fa31ef6c842f83832b9c4b4bcd4eed54e00c3885d6b92588271" />