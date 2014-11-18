---

title: 'Registering event listeners'
category: 'Lifecycle and Events'

---

Event listeners can be registered from [custom javascript][javascript]:

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

[javascript]: ref:#custom-javascript
