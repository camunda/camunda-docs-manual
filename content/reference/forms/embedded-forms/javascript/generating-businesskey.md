---

title: 'Generating a Business Key'
weight: 50

menu:
  main:
    identifier: "embedded-forms-ref-javascript-generating-businesskey"
    parent: "embedded-forms-ref-javascript"

---

The following example shows how you can generate a business key using Javascript:

```html
<form role="form">
  <script cam-script type="text/form-script">

    camForm.on('submit', function() {
      camForm.businessKey = 'some-generated-value';
    });

  </script>

</form>
```

As you can see, you can set the `businessKey` variable on the `camForm` object. The value you set
will be submitted in the start process instance request.

Note that the business key can only be set when a process instance is started, not when completing a
task.
