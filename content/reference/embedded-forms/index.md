---

title: 'Embedded Forms Reference'
weight: 50

menu:
  main:
    name: "Forms"
    identifier: "embedded-forms-ref"
    parent: "references"

---

This reference covers the features of the Camunda BPM Forms SDK. The Forms SDK simplifies the
implementation of user task forms in HTML5 / JavaScript based Applications. The Forms SDK itself is
written in JavaScript and can be added to any  JavaScript based Application.

{{< note title="The Forms SDK and Camunda Tasklist" class="info" >}}
<a href="{{< relref "webapps/tasklist/index.md" >}}">
Camunda Tasklist</a> uses the Form SDK for providing support for Embedded Forms. By default, the 
tasklist uses the Form SDKs AngularJS integration.
{{< /note >}}


# Features

The Forms SDK provides the following features:

* *Form handling*: attach to a form existing in the DOM or load a form from a URL.
* *Variable handling*: load and submit variables used in the form.
* *Script handling*: execute custom JavaScript in Forms
* *Angular JS Integration*: The Forms SDK optionally integrates with AngularJS to take advantage 
  of AngularJS form validation and other AngularJS goodies.

The following is a simple example of a form with two input fields binding to process variables
`CUSTOMER_ID` and `CUSTOMER_REVENUE`:

```html
<form>

  <label for="customerId">Customer Id:</label>

  <input type="text" id="customerId"
         cam-variable-name="CUSTOMER_ID"
         cam-variable-type="String">

  <label for="customerRevenue">Customer Revenue:</label>

  <input type="text" id="customerRevenue"
         cam-variable-name="CUSTOMER_REVENUE"
         cam-variable-type="Double">

</form>
```


# Anti Features

The Forms SDK is intended to be lean and small. By design it is not concerned with things like

* *Form Validation*: Instead, integrate with existing frameworks such as AngularJS.
* *Components / Widgets*: Instead, integrate nicely with existing component libraries like jQuery UI, Angular
  UI, ...
* *Form Generation*: Instead, allow users to leverage the complete power of HTML and JavaScript to
  implement complex forms.

