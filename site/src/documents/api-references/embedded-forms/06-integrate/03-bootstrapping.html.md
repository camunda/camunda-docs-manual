---

title: 'Bootstrapping'
category: 'Integrating the Forms SDK'

---

## Creating a Client

The form SDK uses an instance of the `CamSDK.Client` to communicate with the process engine (over the REST API):

```javascript
var camClient = new CamSDK.Client({
  mock: false,
  apiUri: 'http://localhost:8080/engine-rest'
});
```

## Creating a Form

In order to create a Form, you need to create an instance of `CamSDK.Form`:

```javascript
new CamSDK.Form({
  // ...
});
```

### Providing a Task Id

In case the form is a task form (ie. the submission of the form should trigger the completing of a Task), you need to provide a `taskId`:

```javascript
new CamSDK.Form({
  client: camClient,

  // the task ID
  taskId: 'someTaskId',

  //...
});
```

### Providing a Process Definition Id

In case the form is a start form (ie. the submission of the form should trigger a new process instance to start), you need to provide a `processDefinitionId`:

```javascript
new CamSDK.Form({
  client: camClient,

  // the process definition id
  processDefinitionId: 'someProcessDefinitionId',

  //...
});
```

### Loading a Form from an URL

The Forms SDK can automatically load forms from an URL.
The URL from which the form should be loaded is referenced using the `formElement` property.

In that case you need to create a container element somewhere in the DOM:

```html
<div id="formContainer">
</div>
```
And reference it in the `containerElement` property when creating the `CamSDK.Form` instance:

```javascript
new CamSDK.Form({
  client: camClient,

  // URL to the form
  formUrl: '/url/to/form.html',

  // the task ID
  taskId: 'someTaskId',

  // the container to which the form should be appended. Can be a DOM element or a jQuery wrapper
  containerElement: $('#formContainer'),

  done: function(error, camFormInstance) {
    // ..
  }
});
```

### Using a Form existing in the DOM

It is also possible to initialize the Form SDK for a form already existing in the DOM.

Assuming that you have a HTML `<form ...>` element present in the DOM:

```html
<form id="myForm">
  <input ....>
</form>
```

You can create an instance of `CamSDK.Form` and attach it to the existing form like this:

```javascript
new CamSDK.Form({
  client: camClient,

  // the task ID
  taskId: 'someTaskId',

  // the form element. Can be a DOM element or a jQuery wrapper
  formElement: $('#myForm'),

  done: function(error, camFormInstance) {
    // ..
  }
});
```
