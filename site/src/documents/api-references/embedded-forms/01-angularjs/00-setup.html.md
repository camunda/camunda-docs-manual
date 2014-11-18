---

title: 'Setting up Support'
category: 'Support for AngularJS'

---

Embedded forms provide optional support for integrating with AngularJS. The angular JS integration
provides support for

* Angular compilation of Forms loaded from URLs,
* `ng-model` binding
* Using Angular directives (such as form validation) in the form

## Script Dependencies

When using camunda BPM embedded forms inside an AngularJS application,
`camunda-bpm-sdk-angular.js` must be loaded:

```html
<script src="angular.min.js"></script>
<script src="camunda-bpm-sdk-angular.js"></script>
```

## Bootstrapping

The embedded forms support provides an angular module named `cam.embedded.forms` which can be added
to the application's module dependencies:

```javascript
angular.bootstrap(window.document, ['cam.embedded.forms', ...]);
```
