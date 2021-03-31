---

title: 'Getting a Distribution'
weight: 10

menu:
  main:
    identifier: "embedded-forms-ref-integration-download"
    parent: "embedded-forms-ref-integration"

---

# Manual Download

The Forms SDK library can be downloaded from
[Github](https://github.com/camunda/bower-camunda-bpm-sdk-js/releases).


# Bower

Alternatively, the Forms SDK can be installed using the Bower package manager:

```
bower install camunda-bpm-sdk-js --save
```


# Dependency Management

The Forms SDK depends on the following libraries:

* JQuery (or a compatible DOM manipulation Library).

The Forms SDK *optionally* depends on the following libraries:

* AngularJS (v1.2.16).


# Including the Library

Next, you need to add the JavaScript Library to the page.

```html
<script src="jquery-2.1.1.min.js" type="text/javascript"></script>
<script src="camunda-bpm-sdk.min.js" type="text/javascript"></script>
```

Or, with AngularJS Support:

```html
<script src="angular.min.js" type="text/javascript"></script>
<script src="camunda-bpm-sdk-angular.js" type="text/javascript"></script>
```
