---

title: 'The cam-script Directive'
weight: 10

menu:
  main:
    identifier: "embedded-forms-ref-javascript-cam-script"
    parent: "embedded-forms-ref-javascript"

---

It is possible to use custom JavaScript in embedded forms.

Custom JavaScript can be added to a form by using a `<script>` tag and adding the `cam-script`
directive:

```html
<form role="form">

  <script cam-script type="text/form-script">
  // custom script goes here
  </script>

</form>
```
