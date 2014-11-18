---

title: 'Full Example'
category: 'Working with Serialized Java Objects'

---

Given the following Java Class `InvoiceData`:

```java
public class InvoiceData {

  protected String invoiceNumber;
  protected String creditor;
  protected String amount;
  protected int priority;

  public String getInvoiceNumber() { return invoiceNumber; }
  public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }
  public String getCreditor() { return creditor; }
  public void setCreditor(String creditor) { this.creditor = creditor; }
  public String getAmount() { return amount; }
  public void setAmount(String amount) { this.amount = amount; }
  public int getPriority() { return priority; }
  public void setPriority(int priority) { this.priority = priority; }

}
```

Assuming that an instance of the class is stored in the process variable `invoiceData`, we can
construct the following form for working on an instance of the class:

```html
<form role="form">

  <script cam-script type="text/form-script">
    camForm.on('form-loaded', function() {
      camForm.variableManager.fetchVariable('invoiceData');
    });
    camForm.on('variables-fetched', function() {
      $scope.invoiceData = camForm.variableManager.variableValue('invoiceData');
    });
  </script>

  <div class="form-group">
    <label for="invoiceNumber-field">Invoice Number</label>
    <input id="invoiceNumber-field"
           type="text"
           class="form-control"
           required
           ng-model="invoiceData.invoiceNumber">
  </div>
  <div class="form-group">
    <label for="amount-field">Amount</label>
    <input id="amount-field"
           type="text"
           class="form-control"
           required
           ng-model="invoiceData.amount">
  </div>
  <div class="form-group">
    <label for="creditor-field">Creditor</label>
    <input id="creditor-field"
           type="text"
           class="form-control"
           required
           ng-model="invoiceData.creditor">
  </div>
  <div class="form-group">
    <label for="priority-field">Priority</label>
    <input id="priority-field"
           type="number"
           class="form-control"
           required
           ng-model="invoiceData.priority">
  </div>

</form>
```
