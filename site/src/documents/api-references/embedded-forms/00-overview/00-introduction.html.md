---

title: 'Introduction'
category: 'Overview'

---

The Forms SDK greatly simplifies the implementation of task forms.

The main feature of the Forms SDK is handling of *process variables*. You can directly bind Html
form controls to process variables:

```html
<form>
  <input type="text"
         cam-variable-name="CUSTOMER_ID"
         cam-variable-type="String">
  <input type="text"
         cam-variable-name="CUSTOMER_REVENUE"
         cam-variable-type="Float">
</form>
```

The Forms SDK handles the fetching of the variable values from the process engine, type conversions
and so on.

The Forms SDK optionally integrates with AngularJS to take advantage of AngularJS form
validation and other AngularJS goodies.
