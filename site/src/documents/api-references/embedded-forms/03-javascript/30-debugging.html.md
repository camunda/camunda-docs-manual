---

title: 'Debugging Scripts'
category: 'Custom JavaScript'

---

If a form script is loaded using an XHR from a web server, it is executed using `eval()`. In order
to debug it, you need to use browser-specific debugger extensions.

## Debugging Form Scripts in Google Chrome

If you are using the Google Chrome debugger, you can add the `debugger;` directive to the source
code of the script:

```html
<form role="form">

  <script cam-script type="text/form-script">
    debugger;
  </script>

</form>
```
