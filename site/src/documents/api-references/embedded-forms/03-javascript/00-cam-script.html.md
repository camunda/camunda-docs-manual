---

title: 'The cam-script Directive'
category: 'Custom Javascript'

---

It is possible to use custom javascript in embedded forms.

Custom javascript can be added to a from by using a `<script>` tag and adding the `cam-script`
directive:

```html
<form role="form">

  <script cam-script type="text/form-script">
  // custom script goes here
  </script>

</form>
```
