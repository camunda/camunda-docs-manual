---

title: "Lifecycle and Events"
weight: 30

menu:
  main:
    identifier: "embedded-forms-ref-lifecycle"
    parent: "embedded-forms-ref"

---

# Events

<ol>
  <li>
    The form is parsed, and variable names are collected from the markup. This means that directives
    like <code>cam-variable-name</code> are evaluated and the resulting variables are declared in the
    <code>variableManager</code>.<br/>
    <em>Events:</em>
    <ul>
      <li><code>form-loaded</code> is fired <strong>after</strong> the form has been parsed, and all form directives have been
    evaluated.</li>
    </ul>
  </li>
  <br/>
  <li>
    In the second phase, a request is made to the server to gather the values of the
    variables declared in the variable manager.<br/>
    <em>Events:</em>
    <ul>
      <li><code>variables-fetched</code> is fired <strong>after</strong> the request returns and the values of the variables have
     been merged into the variableManager.</li>
    </ul>
  </li>
  <br/>
  <li>
    If a saved state of the form exists, the variable values are replaced with the saved state.<br/>
    <em>Events:</em>
    <ul>
      <li><code>variables-restored</code> is fired <strong>after</strong> the saved values of the variables have been merged with
     the values in the variableManager.</li>
    </ul>
  </li>
  <br/>
  <li>
    Next, the variables are applied to the form controls. This means that HTML input fields and
    select boxes are populated with the variable values present in the variableManager.<br/>
    <em>Events:</em>
    <ul>
      <li><code>variables-applied</code> is fired <strong>after</strong> the values of the variables have been applied to the
     form controls.</li>
    </ul>
  </li>
  <br/>
  <li>
    The user interacts with the form. In this phase no events are fired.
  </li>
  <br/>
  <li>
    The user can save the form, which causes the current values of the variables to be stored in the
    localStorage. If the user comes back to the form later, the values are restored.<br/>
    <em>Events:</em>
    <ul>
      <li><code>store</code> is fired <strong>before</strong> the values of the variables are written to the localStorage. An
      event handler may prevent the values from being stored.</li>
      <li><code>variables-stored</code> is fired <strong>after</strong> the values are written to the localStorage.</li>
    </ul>
  </li>
  <br/>
  <li>
    Finally, the form is submitted.<br/>
    <em>Events:</em>
    <ul>
      <li><code>submit</code> is fired <strong>before</strong> the submit request is sent to the server. An event handler may
      prevent the form from being submitted by setting the property `submitPrevented` true.</li>
      <li><code>submit-success</code> is fired <strong>after</strong> the server successfuly treated the submission.</li>
      <li><code>submit-failed</code> is fired <strong>after</strong> the server failed at treating the submission
      or when a network error happened.</li>
    </ul>
  </li>
  <br/>

# Event Listeners

Event listeners can be registered from [custom JavaScript]({{< relref "reference/embedded-forms/javascript/_index.md" >}}):

```html
<form role="form" name="form">

  <script cam-script type="text/form-script">

    camForm.on('form-loaded', function() {
      // handle form loaded
    });

    camForm.on('variables-fetched', function() {
      // handle variables fetched
    });

    camForm.on('variables-restored', function() {
      // handle variables restored
    });

    camForm.on('variables-applied', function() {
      // handle variables applied
    });

    camForm.on('store', function(evt) {
      // handle store
      // may prevent the store from being executed
      evt.storePrevented = true;
    });

    camForm.on('variables-stored', function() {
      // handle variables stored
    });

    camForm.on('submit', function(evt) {
      // handle submit
      // may prevent the submit from being executed:
      evt.submitPrevented = true;
    });

    camForm.on('submit-success', function() {
      // handle submit-success
    });

    camForm.on('submit-error', function(evt, res) {
      // handle submit-error:
      var error = res[0];
    });

  </script>

</form>
```
