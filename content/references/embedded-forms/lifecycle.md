---

title: "Lifecycle and Events"
weight: 30

menu:
  main:
    identifier: "embedded-forms-ref-lifecycle"
    parent: "embedded-forms-ref"

---

# Events

1. The form is parsed, and variable names are collected from the markup. This means that directives
   like `cam-variable-name` are evaluated and the resulting variables are declared in the
   `variableManager`.

   _Events:_
   * `form-loaded` is fired __after__ the form has been parsed, and all form directives have been
     evaluated.

2. In the second phase, a request is made to the server to gather the values of the
   variables declared in the variable manager.

   _Events:_
   * `variables-fetched` is fired __after__ the request returns and the values of the variables have
     been merged into the variableManager.

3. If a saved state of the form exists, the variable values are replaced with the saved state.

   _Events:_
   * `variables-restored` is fired __after__ the saved values of the variables have been merged with
     the values in the variableManager

4. Next, the variables are applied to the form controls. This means that HTML input fields and
   select boxes are populated with the variable values present in the variableManager.

   _Events:_
   * `variables-applied` is fired __after__ the values of the variables have been applied to the
     form controls.

5. The user interacts with the form. In this phase no events are fired.

6. The user can save the form, which causes the current values of the variables to be stored in the
   localStorage. If the user comes back to the form later, the values are restored.

   _Events:_
   * `store` is fired __before__ the values of the variables are written to the localStorage. An
   event handler may prevent the values from being stored.
   * `variables-stored` is fired __after__ the values are written to the localStorage.

7. Finally, the form is submitted.

   _Events:_

   * `submit` is fired __before__  the submit request is sent to the server. An event handler may
     prevent the form from being submitted by setting the property `submitPrevented` true.

   * `submit-success` is fired __after__ the server successfuly treated the submission

   * `submit-failed` is fired __after__ the server failed at treating the submission
     or when a network error happened

# Event Listeners

Event listeners can be registered from [custom JavaScript][JavaScript]:

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

[JavaScript]: ref:#custom-javascript
