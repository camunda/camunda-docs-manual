---

title: 'Date Inputs'
weight: 30

menu:
  main:
    identifier: "embedded-forms-ref-controls-date-inputs"
    parent: "embedded-forms-ref-controls"

---

Date input is supported using a `<input type="text">` control.


# Binding to a Process Variable

In order to bind the input field to a Java `Date` variable, the directive
`cam-variable-type="Date"` must be used.

Example:

```html
<input type="text"
       cam-variable-name="CONTRACT_START_DATE"
       cam-variable-type="Date" />
```


# Date Format

Currently only the ISO Date Format `yyyy-MM-dd'T'HH:mm:ss` is supported.
Example value: `2013-01-23T13:42:42`


# Using a Date Picker

The Form SDK itself does not provide any custom components of widgets. As such it also does not provide a date picker. However, you are able to integrate third party libraries providing such widgets.

{{< note >}}
Inside Camunda Tasklist, datepicker support is provided through Angular UI.
{{< /note >}}

You can use the [Angular UI datepicker](http://angular-ui.github.io/bootstrap/)
directive to offer a datepicker for the date input field. The complete markup of the input field
including the datepicker button is shown below.

```html
<p class="input-group">

  <input type="text"
       cam-variable-name="CONTRACT_START_DATE"
       cam-variable-type="Date"
       class="form-control"
       datepicker-popup="yyyy-MM-dd'T'HH:mm:ss"
       is-open="dateFieldOpened" />

  <span class="input-group-btn">
    <button type="button"
            class="btn btn-default"
            ng-click="open($event)">
      <i class="glyphicon glyphicon-calendar"></i>
    </button>
  </span>
</p>
```

In addition to the HTML markup, the following JavaScript must be included in the form file
(see [Custom JavaScript]({{< relref "reference/embedded-forms/javascript/index.md" >}})):

```html
<script cam-script type="text/form-script">
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.dateFieldOpened = true;
  };
</script>
```

The attributes of the datepicker component are explained below:

Additional attributes of the input element:
* `datepicker-popup="yyyy-MM-dd'T'HH:mm:ss"`: This attribute sets the format of the date which
is returned by the datepicker. It must be the ISO Date Format.
* `is-open="dateFieldOpened"`: This attribute contains the name of the variable, which
indicates the open status of the datepicker. It must be the same variable, which is set to
true in the `open` function in the JavaScript snippet. If a form contains multiple
datepickers, they must have different values for this attribute.

Attributes of the datepicker button:
* `ng-click="open($event)"`: This attribute contains the name of the function which is called
when the datepicker button is clicked. It must be the function name of the JavaScript snippet
which sets the `is-open` variable to true. If a form contains multiple date pickers, they
must have different function names, or the name of the `is-open` variable must be passed to
the function.
